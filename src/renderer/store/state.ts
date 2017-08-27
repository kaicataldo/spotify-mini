import { PlayerState } from '../../types/PlayerState';
import { UserSettings } from '../../types/UserSettings';

export interface SearchResults {
  album: {};
  artist: {};
  track: {};
}

export interface AppState {
  hasLoaded: boolean;
  player: PlayerState;
  searchResults: SearchResults;
  settings: UserSettings;
}

const player: PlayerState = {
  player_state: '',
  track_name: '',
  track_id: '',
  artist_name: '',
  album_name: '',
  artwork_url: '',
  track_url: '',
  status: '',
  message: ''
};

const searchResults: SearchResults = {
  album: {},
  artist: {},
  track: {}
};

export { PlayerState } from '../../types/PlayerState';

export default {
  hasLoaded: false,
  player,
  searchResults,
  settings: {
    clientId: '',
    clientSecret: ''
  }
};
