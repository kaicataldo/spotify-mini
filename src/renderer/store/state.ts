import { PlayerState } from '../../types/PlayerState';
import { SearchResults } from '../../types/SearchResults';

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

export default {
  hasLoaded: false,
  player,
  searchResults,
  settings: {
    clientId: '',
    clientSecret: ''
  }
};
