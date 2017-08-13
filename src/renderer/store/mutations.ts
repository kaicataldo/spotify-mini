export default {
  setPlayerState(state, payload) {
    state.player = payload;
  },

  setLoaded(state) {
    state.hasLoaded = true;
  }
};
