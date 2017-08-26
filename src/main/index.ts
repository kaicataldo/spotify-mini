import * as path from 'path';
import * as url from 'url';
import * as electron from 'electron';
import spotify from './lib/spotify';
import Store from './lib/Store';

const { app, BrowserWindow, Tray, globalShortcut, ipcMain } = electron;

// Keep a global reference to win/tray to prevent garbage collection from ending the process.
let win: Electron.BrowserWindow;
let tray: Electron.Tray;
let store: Store;

async function showWindow(): Promise<void> {
  win.webContents.send('settingsUpdated', store.get());
  win.webContents.send('playerStateUpdated', await spotify.getState());
  win.show();
}

function toggleWindow(
  { x: trayX, y: trayY, width: trayWidth } = tray.getBounds()
): void {
  if (win.isVisible()) {
    win.hide();
  } else {
    const trayWidthOffset = trayWidth / 2;
    const [winWidth] = win.getSize();
    const winWidthOffset = winWidth / 2;

    // x must be an integer
    const winX = Math.round(trayX + trayWidthOffset - winWidthOffset);
    win.setPosition(winX, trayY);
    showWindow();
  }
}

app.on('ready', async () => {
  store = new Store();
  win = new BrowserWindow({
    width: 320,
    height: 600,
    backgroundColor: '#181818',
    frame: false
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true
    })
  );
  win
    .on('closed', () => {
      app.quit();
    })
    .on('blur', () => win.hide())
    .on('focus', showWindow);
  win.setAlwaysOnTop(true);
  win.hide();

  tray = new Tray(path.join(__dirname, '../assets/icon.png'));
  tray.setToolTip('Spotify Mini\nA macOS menubar controller for Spotify!');
  tray.on('click', (_event, bounds) => toggleWindow(bounds));

  globalShortcut.register('Command+Control+P', () => toggleWindow());
});

app.dock.hide();

ipcMain.on('getState', async (event: Electron.Event) => {
  event.sender.send('settingsUpdated', store.get());
  event.sender.send(
    'playerStateUpdated',
    await spotify.execCommand('getState')
  );
});

ipcMain.on('command', async (event: Electron.Event, command: string) => {
  event.sender.send('playerStateUpdated', await spotify.execCommand(command));
});

ipcMain.on('search', async (event: Electron.Event, params: string) =>
  event.sender.send(
    'searchResultsUpdated',
    await spotify.search(params, store.get())
  )
);

ipcMain.on(
  'updateSettings',
  (
    event: Electron.Event,
    settings: { clientId: string; clientSecret: string }
  ) => {
    store.set(settings);
    event.sender.send('settingsUpdated', store.get());
  }
);
