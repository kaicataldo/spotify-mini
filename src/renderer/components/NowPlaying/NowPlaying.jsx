import React from 'react';
import PropTypes from 'prop-types';
import styles from './NowPlaying.css';

export default function NowPlaying({ playerState }) {
  return (
    <div>
      <img className={styles.albumArtwork} src={playerState.artwork_url} />
      <p>Artist: {playerState.artist_name}</p>
      <p>Album: {playerState.album_name}</p>
      <p>Track: {playerState.track_name}</p>
    </div>
  );
}

NowPlaying.propTypes = {
  playerState: PropTypes.object
};
