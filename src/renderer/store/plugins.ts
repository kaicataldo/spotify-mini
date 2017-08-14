import { Store } from 'vuex';
import { AppState, PlayerState } from './state';
import * as electron from 'electron';
const { ipcRenderer } = electron;

export default {
  setState(store: Store<AppState>) {
    ipcRenderer.on(
      'playerStateUpdated',
      (_event: Electron.Event, payload: PlayerState) =>
        store.dispatch('setPlayerState', payload)
    );
  }
};
