import React from 'react';
import PropTypes from 'prop-types';
import playSvg from 'open-iconic/svg/media-play.svg';
import pauseSvg from 'open-iconic/svg/media-pause.svg';
import prevSvg from 'open-iconic/svg/media-step-backward.svg';
import nextSvg from 'open-iconic/svg/media-step-forward.svg';
import styles from './Controls.css';

export default function Controls({
  isPlaying,
  togglePlay,
  skipPrev,
  skipNext
}) {
  return (
    <div>
      <span
        className={styles.prevIcon}
        dangerouslySetInnerHTML={{ __html: prevSvg }}
        onClick={skipPrev}
      />
      <span
        className={`${styles.circleIcon} ${
          isPlaying ? styles.pauseIcon : styles.playIcon
        }`}
        dangerouslySetInnerHTML={{ __html: isPlaying ? pauseSvg : playSvg }}
        onClick={togglePlay}
      />
      <span
        className={styles.nextIcon}
        dangerouslySetInnerHTML={{ __html: nextSvg }}
        onClick={skipNext}
      />
    </div>
  );
}

Controls.propTypes = {
  isPlaying: PropTypes.bool,
  togglePlay: PropTypes.func,
  skipPrev: PropTypes.func,
  skipNext: PropTypes.func
};
