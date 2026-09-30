import test from 'node:test';
import assert from 'node:assert/strict';
import {createDiskBackup} from '../admin/disk-backup.mjs';

// A transactional file fake: writes do not replace the existing file until close.
function fixture(){
 let config=null,envelope={format:'hypervision-vault-v2',iv:'one',ciphertext:'encrypted-receipts'},content='',modified=1,permission='granted',failure='',writes=0,aborts=0,tail=Promise.resolve();
 const states=[];
 const handle={name:'test-coffre.json',queryPermission:async()=>permission,requestPermission:async()=>permission,
  getFile:async()=>({size:new TextEncoder().encode(content).length,lastModified:modified}),
  createWritable:async()=>{writes++;if(failure==='open')throw new DOMException('Denied','NotAllowedError');let pending='';return {
   write:async text=>{if(failure==='write')throw new Error('Disk full');pending=text;},
   close:async()=>{if(failure==='close')throw new Error('Close failed');content=pending;modified++;},
   abort:async()=>{aborts++;},
  };}};
 const deps={readConfig:async()=>config,writeConfig:async c=>{config=c;},readEnvelope:async()=>envelope,supported:()=>true,
  chooseFile:async()=>handle,exclusive:fn=>{const result=tail.then(fn);tail=result.catch(()=>{});return result;},onChange:s=>states.push(s)};
 const disk=createDiskBackup(deps);
 return {disk,deps,states,handle,get config(){return config;},get content(){return content;},get writes(){return writes;},get aborts(){return aborts;},set permission(x){permission=x;},set failure(x){failure=x;},set envelope(x){envelope=x;},externalChange(){content='external backup';modified++;}};
}
test('first copy, automatic update, and restored handle contain the whole encrypted envelope',async()=>{
 const f=fixture();assert.equal((await f.disk.sync()).kind,'off');await f.disk.choose();assert.equal(f.disk.status().kind,'ready');assert.equal(JSON.parse(f.content).ciphertext,'encrypted-receipts');assert.equal(f.writes,1);
 await f.disk.sync();assert.equal(f.writes,1); // Same vault: no unnecessary rewrite.
 f.envelope={format:'hypervision-vault-v2',iv:'two',ciphertext:'new encrypted data'};
 const reopened=createDiskBackup(f.deps);await reopened.sync();assert.equal(JSON.parse(f.content).iv,'two');assert.equal(reopened.status().kind,'ready');assert.ok(reopened.status().lastSaved);
});
test('permission loss and rejected writes preserve the last successful file and can retry',async()=>{
 const f=fixture();await f.disk.choose();const before=f.content,last=f.disk.status().lastSaved;
 f.envelope={iv:'two',ciphertext:'encrypted'};f.permission='prompt';assert.equal((await f.disk.sync()).kind,'permission');assert.equal(f.content,before);assert.equal(f.writes,1);
 f.permission='denied';assert.equal((await f.disk.resume()).kind,'permission');
 f.permission='granted';for(const stage of ['open','write','close']){f.failure=stage;assert.equal((await f.disk.sync()).kind,'error');assert.equal(f.content,before);assert.equal(f.disk.status().lastSaved,last);}
 assert.equal(f.aborts,2);f.failure='';await f.disk.resume();assert.equal(f.disk.status().kind,'ready');assert.equal(JSON.parse(f.content).iv,'two');
});
test('external changes block automatic overwrite; disconnect leaves existing file intact',async()=>{
 const f=fixture();await f.disk.choose();f.externalChange();f.envelope={iv:'two'};await f.disk.sync();assert.equal(f.disk.status().kind,'error');assert.match(f.disk.status().error,/en dehors/);assert.equal(f.content,'external backup');
 await f.disk.disconnect();assert.equal(f.config,null);await f.disk.sync();assert.equal(f.disk.status().kind,'off');assert.equal(f.content,'external backup');
});
test('cancelled picker keeps the existing destination and unsupported browsers do not touch files',async()=>{
 const f=fixture();await f.disk.choose();const config=f.config;
 const cancelled=createDiskBackup({...f.deps,chooseFile:async()=>{throw new DOMException('Cancel','AbortError');}});await cancelled.sync();await cancelled.choose();assert.equal(f.config,config);assert.equal(cancelled.status().kind,'ready');
 const unsupported=createDiskBackup({...f.deps,supported:()=>false});await unsupported.choose();await unsupported.sync();assert.equal(unsupported.status().kind,'unsupported');assert.equal(f.writes,1);
});
test('queued tabs reread the latest envelope and cannot overwrite it with a stale snapshot',async()=>{
 const f=fixture();await f.disk.choose();f.envelope={iv:'two'};const second=createDiskBackup(f.deps);const pending=f.disk.sync();f.envelope={iv:'three'};await Promise.all([pending,second.sync()]);assert.equal(JSON.parse(f.content).iv,'three');assert.equal(second.status().kind,'ready');
});
test('status is never ready before the file close succeeds',async()=>{
 const f=fixture();f.failure='close';await f.disk.choose();assert.ok(f.states.some(s=>s.kind==='saving'));assert.ok(!f.states.some(s=>s.kind==='ready'));assert.equal(f.content,'');assert.equal(f.config.iv,null);
});
