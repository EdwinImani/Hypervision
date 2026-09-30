import {readStored,readDiskConfig,writeDiskConfig} from './storage.mjs?v=20260930-mac';

const permission={mode:'readwrite'};
const stamp=file=>({size:file.size,modified:file.lastModified});
const sameStamp=(a,b)=>a?.size===b.size&&a?.modified===b.modified;
const message=error=>error?.name==='NotFoundError'?'Le fichier a été déplacé ou supprimé. Choisissez un nouveau fichier.':error?.name==='NotAllowedError'?'Chrome doit autoriser à nouveau l’accès au fichier.':error?.message||'Impossible de mettre à jour le fichier sur le Mac.';

// The vault is committed to IndexedDB first. A disk failure must never roll back
// that transaction or make a successful browser save appear to have failed.
export function createDiskBackup({readConfig=readDiskConfig,writeConfig=writeDiskConfig,readEnvelope=readStored,
 supported=()=>typeof globalThis.showSaveFilePicker==='function'&&!!globalThis.navigator?.locks,
 chooseFile=()=>globalThis.showSaveFilePicker({id:'hypervision-backup',startIn:'documents',suggestedName:'Hypervision-coffre.json',types:[{description:'Coffre chiffré Hypervision Studio',accept:{'application/json':['.json']}}]}),
 exclusive=fn=>globalThis.navigator.locks.request('hypervision-disk-backup',fn),onChange=()=>{}}={}){
 let config=null,state={kind:'off',name:'',lastSaved:null};
 function publish(kind,error=''){state={kind,error,name:config?.handle?.name||'',lastSaved:config?.lastSaved||null};onChange({...state});return state;}
 async function perform(){
  config=await readConfig();if(!config)return publish('off');
  if(await config.handle.queryPermission(permission)!=='granted')return publish('permission');
  const envelope=await readEnvelope();if(!envelope)throw new Error('Aucun coffre enregistré à copier.');
  const before=stamp(await config.handle.getFile());
  if(config.stamp&&!sameStamp(config.stamp,before))throw new Error('Le fichier a changé en dehors de cet espace. Il est conservé : choisissez un nouveau fichier ou restaurez cette copie.');
  if(config.iv===envelope.iv&&config.stamp)return publish('ready');
  publish('saving');
  let stream;
  try{stream=await config.handle.createWritable();await stream.write(JSON.stringify(envelope));await stream.close();}
  catch(error){try{await stream?.abort();}catch{}throw error;}
  // Only report success after close() has committed the actual disk file.
  config={...config,iv:envelope.iv,lastSaved:new Date().toISOString(),stamp:stamp(await config.handle.getFile())};
  await writeConfig(config);
  const latest=await readEnvelope();return publish(latest?.iv===envelope.iv?'ready':'pending');
 }
 async function sync(){
  if(!supported())return publish('unsupported');
  try{return await exclusive(perform);}catch(error){return publish('error',message(error));}
 }
 async function choose(){
  if(!supported())return publish('unsupported');
  // Must run directly in a click gesture, before any asynchronous storage work.
  let handle;try{handle=await chooseFile();}catch(error){if(error.name==='AbortError')return state;throw error;}
  try{return await exclusive(async()=>{
   const next={handle,id:crypto.randomUUID(),iv:null,lastSaved:null,stamp:stamp(await handle.getFile())};
   await writeConfig(next);config=next;return perform();
  });}catch(error){return publish('error',message(error));}
 }
 async function resume(){
  // config is hydrated at login. Request permission before awaiting a lock/IDB.
  if(!config)return sync();
  try{if(await config.handle.requestPermission(permission)!=='granted')return publish('permission');}
  catch(error){return publish('error',message(error));}
  return sync();
 }
 async function disconnect(){
  await exclusive(async()=>{await writeConfig(null);config=null;publish('off');});
  // The existing file remains untouched and can still be restored.
 }
 return {sync,choose,resume,disconnect,status:()=>({...state})};
}

export const diskBackup=createDiskBackup({onChange:()=>globalThis.dispatchEvent?.(new Event('hypervision-disk-status'))});
