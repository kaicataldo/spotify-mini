const path = require('path');
const url = require('url');
const {
  app,
  BrowserWindow,
  Tray,
  globalShortcut,
  ipcMain,
  session,
} = require('electron');
const spotify = require('./spotify');
const Store = require('./store');

// Keep a global reference to prevent garbage collection from ending the process.
let win;
let tray;
let store;
let shouldPositionWin = true;

async function showWindow() {
  win.webContents.send('settingsUpdated', store.get());
  win.webContents.send('playerStateUpdated', await spotify.getState());
  win.show();
}

function toggleWindow(
  { x: trayX, y: trayY, width: trayWidth } = tray.getBounds()
) {
  if (win.isVisible()) {
    win.hide();
  } else {
    if (shouldPositionWin) {
      const trayWidthOffset = trayWidth / 2;
      const [winWidth] = win.getSize();
      const winWidthOffset = winWidth / 2;

      // x must be an integer
      const winX = Math.round(trayX + trayWidthOffset - winWidthOffset);
      win.setPosition(winX, trayY);
    }

    showWindow();
    shouldPositionWin = false;
  }
}

function createWindow() {
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
  return win;
}

function createTray() {
  const tray = new Tray(path.join(__dirname, '../assets/icon.png'));
  tray.setToolTip('Spotify Mini\nA macOS menubar controller for Spotify!');
  tray.on('click', (_event, bounds) => toggleWindow(bounds));
  return tray;
}

app.dock.hide();
app.on('ready', () => {
  if (!process.env.NODE_ENV === 'development') {
    // Webpack uses eval() in development but we don't want to allow this in production.
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': ["default-src 'self'"],
        },
      });
    });

    // Deny additional Chrome permissions requests.
    session.defaultSession.setPermissionRequestHandler(
      (_webContents, _permission, callback) => {
        callback(false);
      }
    );
  }

  win = createWindow();
  tray = createTray();
  const configPath = path.join(
    app.getPath('appData'),
    'SpotifyMini/settings.json'
  );
  store = new Store(configPath);

  globalShortcut.register('Command+Control+P', toggleWindow);
});

// TODO: Validate/escape any user-set data.
ipcMain
  .on('getState', async (event) => {
    event.sender.send('settingsUpdated', store.get());
    event.sender.send(
      'playerStateUpdated',
      await spotify.execCommand('getState')
    );
  })
  .on('command', async (event, command) =>
    event.sender.send('playerStateUpdated', await spotify.execCommand(command))
  )
  .on('search', async (event, params) =>
    event.sender.send(
      'searchResultsUpdated',
      await spotify.search(params, store.get())
    )
  )
  .on('updateSettings', (event, settings) => {
    store.set(settings);
    event.sender.send('settingsUpdated', store.get());
  });
