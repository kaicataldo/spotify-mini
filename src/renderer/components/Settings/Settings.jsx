import React from 'react';
import PropTypes from 'prop-types';
import styles from './Settings.css';
import Button from '../Button/Button';
import BottomBar from '../BottomBar/BottomBar';
import backSvg from 'open-iconic/svg/chevron-left.svg';

export default function Settings({
  clientId,
  clientSecret,
  showPlayerView,
  saveSettings,
  updateSettings,
}) {
  function handleClientIdChange(event) {
    const value = event.target.value;
    updateSettings({ clientId: value });
  }

  function handleClientSecretChange(event) {
    const value = event.target.value;
    updateSettings({ clientSecret: value });
  }

  return (
    <div>
      <div className={styles.settings}>
        <h1 className={styles.title}>Settings</h1>
        <h2 className={styles.header}>Spotify</h2>
        <div className={styles.inputRow}>
          <label className={styles.inputLabel} htmlFor="clientId">
            Client ID
          </label>
          <input
            className={styles.textInput}
            id="clientId"
            type="text"
            placeholder="Spotify Client ID"
            value={clientId}
            onChange={handleClientIdChange}
          />
        </div>
        <div className={styles.inputRow}>
          <label className={styles.inputLabel} htmlFor="clientSecret">
            Client Secret
          </label>
          <input
            className={styles.textInput}
            id="clientSecret"
            type="text"
            placeholder="Spotify Client Secret"
            value={clientSecret}
            onChange={handleClientSecretChange}
          />
        </div>
      </div>
      <BottomBar>
        <span
          className={styles.backIcon}
          dangerouslySetInnerHTML={{ __html: backSvg }}
          onClick={showPlayerView}
        />
        <Button text="Save" onClick={saveSettings} />
      </BottomBar>
    </div>
  );
}

Settings.propTypes = {
  clientId: PropTypes.string,
  clientSecret: PropTypes.string,
  showPlayerView: PropTypes.func,
  updateSettings: PropTypes.func,
  saveSettings: PropTypes.func,
};
