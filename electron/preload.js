const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("tradeSight",Object.freeze({listSources:()=>ipcRenderer.invoke("capture:listSources",{thumbnails:true}),selectSource:id=>ipcRenderer.invoke("capture:select",id),openExternal:url=>ipcRenderer.invoke("external:open",url)}));
