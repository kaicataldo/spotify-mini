export function setPlayerState(state, payload) {
  state.player = payload;
}

export function setLoaded(state) {
  state.hasLoaded = true;
}
