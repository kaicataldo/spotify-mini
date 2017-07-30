import electron from "electron";
const { ipcRenderer } = electron;

export function setState(store) {
  ipcRenderer.on("playerStateUpdated", (event, payload) => store.dispatch('setPlayerState', payload));
}
