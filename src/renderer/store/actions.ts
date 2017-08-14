import { Commit } from 'vuex';
import { AppState, PlayerState } from './state';
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

  setPlayerState(
    { state, commit }: { state: AppState; commit: Commit },
    payload: PlayerState
  ) {
    if (!state.hasLoaded) {
      commit('setLoaded');
    }
    commit('setPlayerState', payload);
  }
};
