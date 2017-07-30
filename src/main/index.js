const path = require("path");
const url = require("url");
const electron = require("electron");
const { app, BrowserWindow, Tray, globalShortcut, ipcMain } = electron;
const spotify = require("./lib/spotify");

// Keep a global reference to win/tray to prevent garbage collection from ending the process.
let win;
let tray;

app.on("ready", async () => {
  async function showWindow() {
    win.webContents.send("setState", await spotify.getState());
    win.show();
  }

  function toggleWindow(
    { x: trayX, y: trayY, width: trayWidth } = tray.getBounds()
  ) {
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

  win = new BrowserWindow({
    width: 320,
    height: 600,
    backgroundColor: "#181818",
    frame: false
  });
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
  win.setAlwaysOnTop(true);
  win.hide();

  tray = new Tray(path.join(__dirname, "../assets/icon.png"));
  tray.setToolTip("Spotify Mini\nA macOS menubar controller for Spotify!");
  tray.on("click", (event, bounds) => toggleWindow(bounds));

  globalShortcut.register("Command+Control+P", () => toggleWindow());
});

app.dock.hide();

ipcMain.on("command", async (event, command) =>
  event.sender.send("playerStateUpdated", await spotify.execCommand(command))
);
