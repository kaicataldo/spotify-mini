import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Settings.css';
import Button from '../Button/Button';
import BottomBar from '../BottomBar/BottomBar';
import backSvg from 'open-iconic/svg/chevron-left.svg';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.handleClientIdChange = this.handleClientIdChange.bind(this);
    this.handleClientSecretChange = this.handleClientSecretChange.bind(this);
  }

  handleClientIdChange(event) {
    const value = event.target.value;
    this.props.updateSettings({ clientId: value });
  }

  handleClientSecretChange(event) {
    const value = event.target.value;
    this.props.updateSettings({ clientSecret: value });
  }

  render() {
    const { clientId, clientSecret, showPlayerView, saveSettings } = this.props;

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
              onChange={this.handleClientIdChange}
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
              onChange={this.handleClientSecretChange}
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
}

Settings.propTypes = {
  clientId: PropTypes.string,
  clientSecret: PropTypes.string,
  showPlayerView: PropTypes.func,
  updateSettings: PropTypes.func,
  saveSettings: PropTypes.func
};
