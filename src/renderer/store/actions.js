import electron from "electron";
const { ipcRenderer } = electron;

export function prev() {
  ipcRenderer.send("command", "prev");
}

export function next() {
  ipcRenderer.send("command", "next");
}

export function togglePlay() {
  ipcRenderer.send("command", "togglePlay");
}

export function getPlayerState() {
  ipcRenderer.send("command", "getState");
}

export function setPlayerState({ state, commit }, payload) {
  if (!state.hasLoaded) {
    commit("setLoaded");
  }
  commit("setPlayerState", payload);
}
