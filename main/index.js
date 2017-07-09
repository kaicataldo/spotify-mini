const path = require("path");
const url = require("url");
const electron = require("electron");
const spotify = require("./lib/spotify");

const { app, BrowserWindow, Tray, ipcMain } = electron;
// Keep a global reference to mainWindow/tray to prevent garbage collection from ending the process.
let mainWindow;
let tray;

app.dock.hide();

app.on("ready", () => {
  tray = new Tray(path.join(__dirname, '../assets/icon.png'));
  tray.setToolTip('Spotify Mini\nA macOS menubar controller for Spotify!');

  mainWindow = new BrowserWindow({ width: 400, height: 600, frame: false });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
    tray = null;
  });
});

ipcMain.on("command", async (event, command) => {
  let response;
  try {
    response = await spotify[command]();
  } catch ({ message }) {
    response = { status: "error", message };
    console.error(response);
  }
  event.sender.send("setState", response);
});
