import React from 'react';
import PropTypes from 'prop-types';
import NowPlaying from '../NowPlaying/NowPlaying';
import Controls from '../Controls/Controls';
import styles from './Player.css';
import cogSvg from 'open-iconic/svg/cog.svg';

export default function Player({
  playerState,
  showSettingsView,
  togglePlay,
  skipPrev,
  skipNext
}) {
  if (playerState.status === 'running') {
    return (
      <div>
        <h1 className={styles.title}>Spotify Mini</h1>
        <span
          className={styles.settingsIcon}
          dangerouslySetInnerHTML={{ __html: cogSvg }}
          onClick={showSettingsView}
        />
        <NowPlaying playerState={playerState} />
        <Controls
          isPlaying={playerState.player_state === 'playing'}
          togglePlay={togglePlay}
          skipPrev={skipPrev}
          skipNext={skipNext}
        />
      </div>
    );
  } else if (playerState.status === 'not_running') {
    return <h1>Spotify isn&apos;t running! Start Spotify and try again.</h1>;
  } else {
    return <h1>Something went wrong :(. Try restarting Spotify Mini.</h1>;
  }
}

Player.propTypes = {
  playerState: PropTypes.object,
  showSettingsView: PropTypes.func
};
