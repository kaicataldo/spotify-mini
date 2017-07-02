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

  ipcMain.on("command", async (event, command) => {
    let response;
    try {
      response = await spotify[command]();
    } catch ({ message }) {
      response = { status: 'error', message };
    }
    event.sender.send("command response", response);
  });
});
