const path = require('path');
const url = require('url');
const { BrowserWindow, globalShortcut } = require('electron');

function createWindow(app) {
  const win = new BrowserWindow({
    width: 320,
    height: 544,
    backgroundColor: '#181818',
    frame: false,
    // For ease of development using devtools
    resizable: process.env.NODE_ENV === 'development' ? true : false,
    webPreferences: {
      preload: path.join(__dirname, '../assets/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
    },
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );
  win.on('closed', app.quit).on('blur', win.hide);
  win.setAlwaysOnTop(true);
  win.hide();
  // Disable navigation.
  win.webContents.on('will-navigate', (event) => event.preventDefault());
  // Disallow unexpected window creation.
  win.webContents.on('new-window', (event) => event.preventDefault());
  globalShortcut.register('Command+Control+P', toggleWindow);

  return win;
}

module.exports = { createWindow };
