import { PlayerState, SearchResults, UserSettings } from '.';

export interface AppState {
  hasLoaded: boolean;
  player: PlayerState;
  searchResults: SearchResults | null;
  settings: UserSettings;
}
