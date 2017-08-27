import { Commit, ActionContext } from 'vuex';
import * as electron from 'electron';

import { AppState } from '../../types/AppState';
import { PlayerState } from '../../types/PlayerState';

const { ipcRenderer } = electron;

export default {
  search(_context: ActionContext<AppState, AppState>, params: string) {
    ipcRenderer.send('search', params);
  },

  updateSettings({ state }: { state: AppState }) {
    ipcRenderer.send('updateSettings', state.settings);
  },

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
    ipcRenderer.send('getState');
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
