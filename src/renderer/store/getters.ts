import { AppState } from '../../types';

export default {
  isPlaying(state: AppState): boolean {
    return state.player.player_state === 'playing';
  }
};
