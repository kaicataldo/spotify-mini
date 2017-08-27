import { PlayerState, SearchResults } from '../../types';

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

const searchResults: SearchResults | null = null;

export default {
  hasLoaded: false,
  player,
  searchResults,
  settings: {
    clientId: '',
    clientSecret: ''
  }
};
