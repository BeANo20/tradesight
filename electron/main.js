const { app, BrowserWindow, desktopCapturer, ipcMain, session, shell } = require("electron");
const path = require("node:path");
const { z } = require("zod");
const { sourceRequest, externalUrl } = require("./validation");
let windowRef = null;
let pendingSourceId = null;
function createWindow() {
  windowRef = new BrowserWindow({ width:1480, height:920, minWidth:1100, minHeight:720, webPreferences:{contextIsolation:true,nodeIntegration:false,sandbox:true,preload:path.join(__dirname,"preload.js")} });
  const devUrl=process.env.VITE_DEV_SERVER_URL;
  if(devUrl) windowRef.loadURL(devUrl); else windowRef.loadFile(path.join(__dirname,"../dist/index.html"));
  windowRef.webContents.setWindowOpenHandler(({url})=>{if(externalUrl.safeParse(url).success)shell.openExternal(url);return{action:"deny"};});
  windowRef.webContents.on("will-navigate",event=>event.preventDefault());
}
app.whenReady().then(()=>{session.defaultSession.setPermissionRequestHandler((_wc,permission,callback)=>callback(permission==="display-capture"));session.defaultSession.setDisplayMediaRequestHandler(async(_request,callback)=>{try{const source=await desktopCapturer.getSources({types:["window"],thumbnailSize:{width:1,height:1}}).then(sources=>sources.find(source=>source.id===pendingSourceId));callback(source?{video:source}:{});}catch{callback({});}});ipcMain.handle("capture:listSources",async(_event,input)=>{sourceRequest.parse(input);const sources=await desktopCapturer.getSources({types:["window"],thumbnailSize:{width:320,height:180},fetchWindowIcons:true});return sources.map(s=>({id:s.id,title:s.name.slice(0,160),thumbnail:s.thumbnail.isEmpty()?null:s.thumbnail.toDataURL(),icon:s.appIcon?.isEmpty()?null:s.appIcon?.toDataURL(),likelyRoblox:/roblox|robloxplayer/i.test(s.name)}));});ipcMain.handle("capture:select",(_event,id)=>{pendingSourceId=z.string().parse(id);return true;});ipcMain.handle("external:open",(_event,url)=>shell.openExternal(externalUrl.parse(url)));createWindow();app.on("activate",()=>{if(BrowserWindow.getAllWindows().length===0)createWindow();});});
app.on("window-all-closed",()=>{if(process.platform!=="darwin")app.quit();});
