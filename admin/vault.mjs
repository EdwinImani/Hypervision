import {defaults,validateData} from './core.mjs';
import {bootstrap} from './bootstrap.mjs';
const STORE='hypervision-studio-v1',ITERATIONS=600000,enc=new TextEncoder(),dec=new TextDecoder();
const b64=bytes=>{let s='';for(const b of new Uint8Array(bytes))s+=String.fromCharCode(b);return btoa(s);};
const bytes=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
let key=null,salt=null,revision=0;
async function derive(password,s){const material=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveKey']);return crypto.subtle.deriveKey({name:'PBKDF2',salt:bytes(s),iterations:ITERATIONS,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);}
function validateEnvelope(e){if(e?.format!=='hypervision-vault-v1'||e.iterations!==ITERATIONS||typeof e.salt!=='string'||typeof e.iv!=='string'||typeof e.ciphertext!=='string'||!Number.isSafeInteger(e.revision)||e.revision<0||bytes(e.salt).length!==16||bytes(e.iv).length!==12||e.ciphertext.length>20000000)throw new Error('Fichier de sauvegarde invalide.');return e;}
async function decrypt(e,k){return JSON.parse(dec.decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(e.iv),additionalData:enc.encode('hypervision-vault-v1')},k,bytes(e.ciphertext))));}
async function encrypt(data,k,s,rev){const iv=crypto.getRandomValues(new Uint8Array(12));return {format:'hypervision-vault-v1',iterations:ITERATIONS,salt:s,iv:b64(iv),revision:rev,ciphertext:b64(await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:enc.encode('hypervision-vault-v1')},k,enc.encode(JSON.stringify(data))))};}
export const exists=()=>!!localStorage.getItem(STORE);
export function lock(){key=null;salt=null;revision=0;}
export async function unlock(username,password){
  if(username!=='admin')throw new Error('Identifiant ou mot de passe incorrect.');
  const raw=localStorage.getItem(STORE),envelope=validateEnvelope(raw?JSON.parse(raw):bootstrap);
  let k,data;try{k=await derive(password,envelope.salt);data=await decrypt(envelope,k);}catch{throw new Error('Mot de passe incorrect ou coffre illisible.');}
  if(raw){validateData(data);key=k;salt=envelope.salt;revision=envelope.revision;return data;}
  if(data.magic!=='hypervision-local-vault-v1')throw new Error('Initialisation impossible.');
  key=await derive(password,salt=b64(crypto.getRandomValues(new Uint8Array(16))));revision=0;data=defaults();await save(data);return data;
}
export async function save(data){
  if(!key)throw new Error('L’espace est verrouillé.');validateData(data);
  const action=async()=>{const raw=localStorage.getItem(STORE),current=raw?JSON.parse(raw).revision:0;if(current!==revision)throw new Error('Le coffre a changé dans un autre onglet. Reconnectez-vous avant de continuer.');
    const next=revision+1,copy=structuredClone(data);copy.revision=next;const e=await encrypt(copy,key,salt,next);
    const latest=localStorage.getItem(STORE);if((latest?JSON.parse(latest).revision:0)!==revision)throw new Error('Modification concurrente détectée. Reconnectez-vous.');
    localStorage.setItem(STORE,JSON.stringify(e));revision=next;data.revision=next;};
  if(navigator.locks)await navigator.locks.request(STORE,action);else await action();
}
export function backup(){const raw=localStorage.getItem(STORE);if(!raw)throw new Error('Aucun coffre à exporter.');return raw;}
export async function inspectBackup(text,password){if(text.length>20000000)throw new Error('Fichier trop volumineux.');const e=validateEnvelope(JSON.parse(text));const k=await derive(password,e.salt);let data;try{data=validateData(await decrypt(e,k));}catch{throw new Error('Mot de passe incorrect ou sauvegarde invalide.');}return {envelope:e,data,key:k};}
export function restore(checked){localStorage.setItem(STORE,JSON.stringify(checked.envelope));key=checked.key;salt=checked.envelope.salt;revision=checked.envelope.revision;return checked.data;}
export async function changePassword(data,oldPassword,newPassword){const current=validateEnvelope(JSON.parse(backup()));try{await decrypt(current,await derive(oldPassword,current.salt));}catch{throw new Error('Le mot de passe actuel est incorrect.');}const nextSalt=b64(crypto.getRandomValues(new Uint8Array(16))),nextKey=await derive(newPassword,nextSalt);const oldKey=key,oldSalt=salt;key=nextKey;salt=nextSalt;try{await save(data);}catch(e){key=oldKey;salt=oldSalt;throw e;}}
export const storageKey=STORE;
