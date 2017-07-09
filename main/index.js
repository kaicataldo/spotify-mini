const path = require("path");
const url = require("url");
const electron = require("electron");
const { app, BrowserWindow, Tray, ipcMain } = electron;
const spotify = require("./lib/spotify");

// Keep a global reference to win/tray to prevent garbage collection from ending the process.
let win;
let tray;

async function execCommand(command) {
  let response;
  try {
    response = await spotify[command]();
  } catch ({ message }) {
    response = { status: "error", message };
    console.error(`Error: ${message}`);
  }
  return response;
}

app.on("ready", async () => {
  async function showWindow() {
    win.webContents.send("setState", await execCommand("getState"));
    win.show();
  }

  win = new BrowserWindow({ width: 400, height: 600, frame: false });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  win
    .on("closed", () => {
      win = null;
      tray = null;
    })
    .on("blur", () => win.hide())
    .on("focus", showWindow);

  win.hide();
  win.webContents.send("setState", await execCommand("getState"));

  tray = new Tray(path.join(__dirname, "../assets/icon.png"));
  tray.setToolTip("Spotify Mini\nA macOS menubar controller for Spotify!");
  tray.on("click", () => (win.isVisible() ? win.hide() : showWindow()));
});

app.dock.hide();

ipcMain.on("command", async (event, command) =>
  event.sender.send("setState", await execCommand(command))
);
