import * as electron from 'electron';
import { Store } from 'vuex';
import { UserSettings, AppState, PlayerState } from '../../types';

const { ipcRenderer } = electron;

export default [
  function syncFromMain(store: Store<AppState>): void {
    ipcRenderer.on(
      'playerStateUpdated',
      (_event: Electron.Event, payload: PlayerState) =>
        store.dispatch('setPlayerState', payload)
    );

    ipcRenderer.on(
      'searchResultsUpdated',
      (_event: Electron.Event, payload: Array<any>) =>
        store.commit('setSearchResults', payload)
    );

    ipcRenderer.on(
      'settingsUpdated',
      (_event: Electron.Event, payload: UserSettings) =>
        store.commit('setSettings', payload)
    );
  }
];
