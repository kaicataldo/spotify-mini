import * as electron from 'electron';

const { ipcRenderer } = electron;

export default {
  prev() {
    ipcRenderer.send('command', 'prev');
  },

  next() {
    ipcRenderer.send('command', 'next');
  },

  togglePlay() {
    ipcRenderer.send('command', 'togglePlay');
  },

  getPlayerState() {
    ipcRenderer.send('command', 'getState');
  },

  setPlayerState({ state, commit }, payload) {
    if (!state.hasLoaded) {
      commit('setLoaded');
    }
    commit('setPlayerState', payload);
  }
};
