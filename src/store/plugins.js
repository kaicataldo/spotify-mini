import electron from "electron";
const { ipcRenderer } = electron;

export function setState(store)  {
  ipcRenderer.on("setState", (event, state) => store.commit("setState", state));
}
