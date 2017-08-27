import {
  AppState,
  PlayerState,
  SearchResults,
  UserSettings
} from '../../types';

export default {
  setPlayerState(state: AppState, payload: PlayerState): void {
    state.player = payload;
  },

  setClientId(state: AppState, payload: string): void {
    state.settings.clientId = payload;
  },

  setClientSecret(state: AppState, payload: string): void {
    state.settings.clientSecret = payload;
  },

  setLoaded(state: AppState): void {
    state.hasLoaded = true;
  },

  setSearchResults(state: AppState, payload: SearchResults): void {
    state.searchResults = payload;
  },

  clearSearchResults(state: AppState): void {
    state.searchResults = null;
  },

  setSettings(state: AppState, payload: UserSettings): void {
    state.settings = payload;
  }
};
