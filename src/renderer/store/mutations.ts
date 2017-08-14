import { AppState, PlayerState } from './state';

export default {
  setPlayerState(state: AppState, payload: PlayerState) {
    state.player = payload;
  },

  setLoaded(state: AppState) {
    state.hasLoaded = true;
  }
};
