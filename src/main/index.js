const path = require('path');
const url = require('url');
const electron = require('electron');
const spotify = require('./lib/spotify');
const Store = require('./lib/store');

const { app, BrowserWindow, Tray, globalShortcut, ipcMain } = electron;

// Keep a global reference to win/tray to prevent garbage collection from ending the process.
let win;
let tray;
let store;

app.dock.hide();
app.on('ready', () => {
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

  win = new BrowserWindow({
    width: 320,
    height: 528,
    backgroundColor: '#181818',
    frame: false,
    resizable: false
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true
    })
  );
  win.on('closed', app.quit).on('blur', win.hide);
  win.setAlwaysOnTop(true);
  win.hide();

  tray = new Tray(path.join(__dirname, '../assets/icon.png'));
  tray.setToolTip('Spotify Mini\nA macOS menubar controller for Spotify!');
  tray.on('click', (_event, bounds) => toggleWindow(bounds));

  const configPath = path.join(
    app.getPath('appData'),
    'SpotifyMini/settings.json'
  );
  store = new Store(configPath);

  globalShortcut.register('Command+Control+P', toggleWindow);
});

ipcMain
  .on('getState', async event => {
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
