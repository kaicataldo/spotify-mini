const path = require("path");
const url = require("url");
const electron = require("electron");
const spotify = require("./lib/spotify");

const { app, BrowserWindow, ipcMain } = electron;
// Keep a global reference to mainWindow to prevent garbage collection from ending the process.
let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.on("closed", () => {
    // Clean up global variable to end process.
    mainWindow = null;
  });

  ipcMain.on('command', async (event, command) => {
    const response = await spotify[command]();

    if (command === 'togglePlay') {
      const state = await spotify.playerState();
      event.sender.send('player state', state);
    }

    if (response.length) {
      event.sender.send('command response', response);
    }
  });
});
