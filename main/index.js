const path = require("path");
const url = require("url");
const electron = require("electron");

const { app, BrowserWindow } = electron;
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
    mainWindow = null;
  });
});
