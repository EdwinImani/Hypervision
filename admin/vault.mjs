import {defaults,validateData} from './core.mjs?v=20260930-expenses';
import {bootstrap} from './bootstrap.mjs';
import {readStored,writeStored} from './storage.mjs?v=20260930-expenses';
import {base64 as b64,bytesFromBase64 as bytes} from './expenses.mjs?v=20260930-expenses';
const STORE='hypervision-studio-v1',ITERATIONS=600000,FORMAT='hypervision-vault-v2',MAX_BACKUP=110*1024*1024,enc=new TextEncoder(),dec=new TextDecoder();
let key=null,salt=null,revision=0,token=null,epoch=0;
async function derive(password,s){const material=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveKey']);return crypto.subtle.deriveKey({name:'PBKDF2',salt:bytes(s),iterations:ITERATIONS,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);}
function validateEnvelope(e){if(!['hypervision-vault-v1',FORMAT].includes(e?.format)||e.iterations!==ITERATIONS||typeof e.salt!=='string'||typeof e.iv!=='string'||typeof e.ciphertext!=='string'||!Number.isSafeInteger(e.revision)||e.revision<0||bytes(e.salt).length!==16||bytes(e.iv).length!==12||e.ciphertext.length>MAX_BACKUP)throw new Error('Fichier de sauvegarde invalide.');return e;}
async function decrypt(e,k){return JSON.parse(dec.decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(e.iv),additionalData:enc.encode(e.format)},k,bytes(e.ciphertext))));}
async function encrypt(data,k,s,rev){const iv=crypto.getRandomValues(new Uint8Array(12));return {format:FORMAT,iterations:ITERATIONS,salt:s,iv:b64(iv),revision:rev,ciphertext:b64(new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:enc.encode(FORMAT)},k,enc.encode(JSON.stringify(data)))))};}
function signal(e){try{localStorage.setItem(STORE,JSON.stringify({format:'hypervision-vault-v2-indexeddb',revision:e.revision,iv:e.iv}));}catch{/* IndexedDB remains authoritative if Web Storage is unavailable. */}}
function legacy(){const raw=localStorage.getItem(STORE);if(!raw)return null;const e=JSON.parse(raw);if(e.format==='hypervision-vault-v2-indexeddb')throw new Error('Le coffre local est absent. Restaurez votre dernière sauvegarde.');return validateEnvelope(e);}
export async function exists(){return !!(await readStored()||localStorage.getItem(STORE));}
export function lock(){epoch++;key=null;salt=null;revision=0;token=null;}
export async function unlock(username,password){
 if(username!=='admin')throw new Error('Identifiant ou mot de passe incorrect.');
 lock();const generation=epoch,stored=await readStored(),old=stored?null:legacy(),envelope=validateEnvelope({...stored||old||bootstrap}),oldRaw=localStorage.getItem(STORE);
 let k,data;try{k=await derive(password,envelope.salt);data=await decrypt(envelope,k);}catch{throw new Error('Mot de passe incorrect ou coffre illisible.');}
 if(generation!==epoch)throw new Error('Ouverture annulée. Réessayez.');
 if(stored||old){validateData(data);if(data.revision!==envelope.revision)throw new Error('Révision du coffre invalide.');}else{if(data.magic!=='hypervision-local-vault-v1')throw new Error('Initialisation impossible.');data=defaults();envelope.salt=b64(crypto.getRandomValues(new Uint8Array(16)));k=await derive(password,envelope.salt);}
 key=k;salt=envelope.salt;revision=stored?envelope.revision:0;token=stored?.iv??null;
 if(!stored){if(localStorage.getItem(STORE)!==oldRaw){lock();throw new Error('Le coffre a changé. Reconnectez-vous.');}try{await save(data,{legacyRaw:oldRaw});}catch(e){lock();throw e;}}
 return data;
}
export async function save(data,migration=null){
 if(!key)throw new Error('L’espace est verrouillé.');validateData(data);const generation=epoch,expected=token,k=key,s=salt,next=revision+1,copy=structuredClone(data);copy.revision=next;
 if(!Number.isSafeInteger(next))throw new Error('Révision du coffre invalide.');
 const e=await encrypt(copy,k,s,next);if(JSON.stringify(e).length>MAX_BACKUP)throw new Error('Coffre trop volumineux pour une sauvegarde complète (110 Mo).');if(generation!==epoch||!key)throw new Error('Enregistrement annulé : espace verrouillé.');
 if(migration&&localStorage.getItem(STORE)!==migration.legacyRaw)throw new Error('Le coffre a changé pendant la migration. Reconnectez-vous.');
 await writeStored(expected,e);if(generation!==epoch)throw new Error('Espace verrouillé pendant l’enregistrement. Reconnectez-vous.');token=e.iv;revision=next;data.revision=next;signal(e);
}
export async function backup(){const e=await readStored();if(!e)throw new Error('Aucun coffre à exporter.');return JSON.stringify(e);}
export async function inspectBackup(text,password){if(text.length>MAX_BACKUP)throw new Error('Sauvegarde trop volumineuse (110 Mo maximum).');const expected=await readStored(),e=validateEnvelope(JSON.parse(text)),k=await derive(password,e.salt);let data;try{data=validateData(await decrypt(e,k));if(data.revision!==e.revision)throw new Error('Révision invalide.');}catch{throw new Error('Mot de passe incorrect ou sauvegarde invalide.');}return {envelope:e,data,key:k,expectedIV:expected?.iv??null};}
export async function restore(checked){const e=await encrypt(checked.data,checked.key,checked.envelope.salt,checked.data.revision);await writeStored(checked.expectedIV,e);lock();key=checked.key;salt=e.salt;revision=e.revision;token=e.iv;signal(e);return checked.data;}
export async function changePassword(data,oldPassword,newPassword){const current=validateEnvelope(JSON.parse(await backup()));if(current.iv!==token)throw new Error('Le coffre a changé. Reconnectez-vous.');try{await decrypt(current,await derive(oldPassword,current.salt));}catch{throw new Error('Le mot de passe actuel est incorrect.');}const generation=epoch,nextSalt=b64(crypto.getRandomValues(new Uint8Array(16))),nextKey=await derive(newPassword,nextSalt);if(generation!==epoch)throw new Error('L’espace est verrouillé.');const oldKey=key,oldSalt=salt;key=nextKey;salt=nextSalt;try{await save(data);}catch(e){if(generation===epoch){key=oldKey;salt=oldSalt;}throw e;}}
export const storageKey=STORE;
