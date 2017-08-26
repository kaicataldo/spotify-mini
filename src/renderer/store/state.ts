import { PlayerState } from '../../types/PlayerState';
import { UserSettings } from '../../types/UserSettings';

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

export interface AppState {
  hasLoaded: boolean;
  player: PlayerState;
  searchResults: Array<any>;
  settings: UserSettings;
}

export { PlayerState } from '../../types/PlayerState';

export default {
  hasLoaded: false,
  player: player,
  searchResults: [],
  settings: {
    clientId: '',
    clientSecret: ''
  }
};
