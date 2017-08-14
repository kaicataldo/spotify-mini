export interface PlayerState {
  status: 'running' | 'not_running' | 'error' | '';
  player_state?: 'stopped' | 'playing' | 'paused' | '';
  track_name?: string;
  track_id?: string;
  artist_name?: string;
  album_name?: string;
  artwork_url?: string;
  track_url?: string;
  message?: string;
}
