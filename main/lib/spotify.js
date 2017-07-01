const { exec } = require('child_process');

function execute(command) {
  return new Promise((resolve, reject) => {
    exec(`osascript -e 'tell application "Spotify" to ${command}'`, (err, stdout) => {
      if (err) {
        reject(err);
      }
      resolve(stdout);
    });
  });
}

module.exports = {
  play() {
    return execute("play");
  },
  pause() {
    return execute("pause");
  },
  togglePlay() {
    return execute("playpause");
  },
  prev() {
    return execute("previous track");
  },
  next() {
    return execute("next track");
  },
  playerState() {
    return execute("player state");
  }
};