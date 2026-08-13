/// <reference types="vite/client" />
declare global { interface Window { tradeSight?: { listSources():Promise<CaptureSource[]>; selectSource(id:string):Promise<boolean>; openExternal(url:string):Promise<void> } } }
export type CaptureSource={id:string;title:string;thumbnail:string|null;icon:string|null;likelyRoblox:boolean};
