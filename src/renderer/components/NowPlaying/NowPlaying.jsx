import React from 'react';
import PropTypes from 'prop-types';
import styles from './NowPlaying.css';

export default function NowPlaying({ playerState }) {
  return (
    <div className={styles.nowPlaying}>
      <img className={styles.albumArt} src={playerState.artwork_url} />
      <div className={styles.info}>
        <div className={styles.track}>{playerState.track_name}</div>
        <div className={styles.album}>{playerState.album_name}</div>
        <div className={styles.artist}>{playerState.artist_name}</div>
      </div>
    </div>
  );
}

NowPlaying.propTypes = {
  playerState: PropTypes.object
};
