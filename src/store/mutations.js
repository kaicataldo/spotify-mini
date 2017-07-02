export function setState(state, newState) {
  state.app = newState;
  if (!state.hasLoaded) {
    state.hasLoaded = true;
  }
}
