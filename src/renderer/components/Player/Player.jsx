import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar/SearchBar';
import NowPlaying from '../NowPlaying/NowPlaying';
import BottomBar from '../BottomBar/BottomBar';
import Controls from '../Controls/Controls';
import styles from './Player.css';
import cogSvg from 'open-iconic/svg/cog.svg';

export default function Player({
  playerState,
  showSettingsView,
  searchResults,
  togglePlay,
  skipPrev,
  skipNext,
  search
}) {
  if (playerState.status === 'running') {
    return (
      <div>
        <div className={styles.player}>
          <SearchBar search={search} searchResults={searchResults} />
          <NowPlaying playerState={playerState} />
        </div>
        <BottomBar>
          <Controls
            isPlaying={playerState.player_state === 'playing'}
            togglePlay={togglePlay}
            skipPrev={skipPrev}
            skipNext={skipNext}
          />
          <span
            className={styles.settingsIcon}
            dangerouslySetInnerHTML={{ __html: cogSvg }}
            onClick={showSettingsView}
          />
        </BottomBar>
      </div>
    );
  } else if (playerState.status === 'not_running') {
    // TODO: Make error messages below an overlay
    return (
      <div className={styles.player}>
        <h1>Spotify isn&apos;t running! Start Spotify and try again.</h1>
      </div>
    );
  } else {
    return (
      <div className={styles.player}>
        <h1>Something went wrong :(. Try restarting Spotify Mini.</h1>
      </div>
    );
  }
}

Player.propTypes = {
  playerState: PropTypes.object,
  showSettingsView: PropTypes.func,
  searchResults: PropTypes.object,
  togglePlay: PropTypes.func,
  skipPrev: PropTypes.func,
  skipNext: PropTypes.func,
  search: PropTypes.func
};
