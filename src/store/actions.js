import electron from "electron";
const { ipcRenderer } = electron;

export function prev({ commit }) {
  ipcRenderer.on("prev", (event, state) => commit("setState", state));
  ipcRenderer.send("command", "prev");
}
export function next({ commit }) {
  ipcRenderer.on("next", (event, state) => commit("setState", state));
  ipcRenderer.send("command", "next");
}
export function togglePlay({ commit }) {
  ipcRenderer.on("togglePlay", (event, state) => commit("setState", state));
  ipcRenderer.send("command", "togglePlay");
}
export function getState({ commit }) {
  ipcRenderer.on("getState", (event, state) => commit("setState", state));
  ipcRenderer.send("command", "getState");
}
