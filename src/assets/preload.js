// Create a wrapper around ipcRenderer so that we don't
// have to expose any of Node's other APIs.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  send: (type, opts) => ipcRenderer.send(type, opts),
  on: (type, cb) => ipcRenderer.on(type, cb),
});
