import { PlayerState } from './PlayerState';
import { SearchResults } from './SearchResults';
import { UserSettings } from './UserSettings';

export interface AppState {
  hasLoaded: boolean;
  player: PlayerState;
  searchResults: SearchResults;
  settings: UserSettings;
}
