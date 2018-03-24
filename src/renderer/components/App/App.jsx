import React, { Component } from 'react';
import electron from 'electron';
import Player from '../Player/Player';
import Settings from '../Settings/Settings';
import styles from './App.css';

const { ipcRenderer } = electron;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: null,
      searchResults: null,
      settings: null,
      isSettingsShown: false
    };

    this.showPlayerView = this.showPlayerView.bind(this);
    this.showSettingsView = this.showSettingsView.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.skipNext = this.skipNext.bind(this);
    this.skipPrev = this.skipPrev.bind(this);
  }

  componentWillMount() {
    ipcRenderer.on('playerStateUpdated', (event, playerState) => {
      this.setState({ player: playerState });
    });

    ipcRenderer.on('searchResultsUpdated', (event, searchResults) =>
      this.setState({ searchResults })
    );

    ipcRenderer.on('settingsUpdated', (event, settings) =>
      this.setState({ settings })
    );

    ipcRenderer.send('getState');
  }

  showPlayerView() {
    this.setState({ isSettingsShown: false });
  }

  showSettingsView() {
    this.setState({ isSettingsShown: true });
  }

  saveSettings() {
    ipcRenderer.send('updateSettings', this.state.settings);
  }

  updateSettings(opts) {
    this.setState(prevState => ({ settings: Object.assign(prevState, opts) }));
  }

  togglePlay() {
    ipcRenderer.send('command', 'togglePlay');
  }

  skipPrev() {
    ipcRenderer.send('command', 'prev');
  }

  skipNext() {
    ipcRenderer.send('command', 'next');
  }

  render() {
    const {
      isSettingsShown,
      player: playerState,
      settings: settingsState
    } = this.state;

    if (!playerState) {
      return null;
    }

    return (
      <div className={styles.app}>
        {isSettingsShown ? (
          <Settings
            clientId={settingsState.clientId}
            clientSecret={settingsState.clientSecret}
            showPlayerView={this.showPlayerView}
            updateSettings={this.updateSettings}
            saveSettings={this.saveSettings}
          />
        ) : (
          <Player
            playerState={playerState}
            showSettingsView={this.showSettingsView}
            togglePlay={this.togglePlay}
            skipPrev={this.skipPrev}
            skipNext={this.skipNext}
          />
        )}
      </div>
    );
  }
}
