import React, { useEffect, useState } from 'react';
import Player from '../Player/Player';
import Settings from '../Settings/Settings';
import styles from './App.css';

export default function App() {
  const [player, setPlayer] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [settings, setSettings] = useState(null);
  const [isSettingsShown, setIsSettingsShown] = useState(false);

  function showPlayerView() {
    setIsSettingsShown(false);
  }

  function showSettingsView() {
    setIsSettingsShown(true);
  }

  function saveSettings() {
    window.api.send('updateSettings', { ...settings });
  }

  function updateSettings(opts) {
    // TODO: Validate settings shape/escape input.
    setSettings({ ...settings, ...opts });
  }

  function togglePlay() {
    window.api.send('command', 'togglePlay');
  }

  function skipPrev() {
    window.api.send('command', 'prev');
  }

  function skipNext() {
    window.api.send('command', 'next');
  }

  function search(params) {
    if (typeof params !== 'string' || !params.length) {
      return setSearchResults(null);
    }

    // TODO: Validate/escape search input.
    window.api.send('search', params);
  }

  useEffect(() => {
    window.api.on('playerStateUpdated', (_event, playerState) => {
      setPlayer(playerState);
    });

    window.api.on('searchResultsUpdated', (_event, searchResults) =>
      setSearchResults(searchResults)
    );

    window.api.on('settingsUpdated', (_event, settings) =>
      setSettings(settings)
    );

    window.api.send('getState');
  }, []);

  if (!player) {
    return null;
  }

  return (
    <div className={styles.app}>
      {isSettingsShown ? (
        <Settings
          clientId={settings.clientId}
          clientSecret={settings.clientSecret}
          showPlayerView={showPlayerView}
          updateSettings={updateSettings}
          saveSettings={saveSettings}
        />
      ) : (
        <Player
          playerState={player}
          showSettingsView={showSettingsView}
          searchResults={searchResults}
          togglePlay={togglePlay}
          skipPrev={skipPrev}
          skipNext={skipNext}
          search={search}
        />
      )}
    </div>
  );
}
