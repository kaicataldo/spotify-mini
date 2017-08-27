import * as electron from 'electron';
import { Commit, ActionContext } from 'vuex';
import { AppState, PlayerState } from '../../types';

const { ipcRenderer } = electron;

export default {
  search(_context: ActionContext<AppState, AppState>, params: string): void {
    ipcRenderer.send('search', params);
  },

  updateSettings({ state }: { state: AppState }): void {
    ipcRenderer.send('updateSettings', state.settings);
  },

  prev(): void {
    ipcRenderer.send('command', 'prev');
  },

  next(): void {
    ipcRenderer.send('command', 'next');
  },

  togglePlay(): void {
    ipcRenderer.send('command', 'togglePlay');
  },

  getPlayerState(): void {
    ipcRenderer.send('getState');
  },

  setPlayerState(
    { state, commit }: { state: AppState; commit: Commit },
    payload: PlayerState
  ): void {
    if (!state.hasLoaded) {
      commit('setLoaded');
    }
    commit('setPlayerState', payload);
  }
};
