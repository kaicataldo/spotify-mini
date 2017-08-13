import electron from 'electron';
const { ipcRenderer } = electron;

export default {
  setState(store) {
    ipcRenderer.on('playerStateUpdated', (_event, payload) =>
      store.dispatch('setPlayerState', payload)
    );
  }
};
