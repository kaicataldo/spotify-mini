import { Store } from 'vuex';
import { AppState, PlayerState } from './state';
import { UserSettings } from '../../types/UserSettings';
import * as electron from 'electron';
const { ipcRenderer } = electron;

export default {
  setState(store: Store<AppState>) {
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
};
