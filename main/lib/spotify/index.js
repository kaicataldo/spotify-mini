const { exec } = require("child_process");
const commands = require("./commands");

function execAppleScript(cmd) {
  return new Promise((resolve, reject) => {
    exec(`osascript -e '${cmd}'`, (err, stdout) => {
      if (err) {
        reject(err);
      }
      resolve(stdout);
    });
  });
}

async function getPlayerState() {
  const { playerState } = commands;
  const serializedState = await execAppleScript(playerState);
  return JSON.parse(serializedState);
}

async function execCommand(cmd) {
  await execAppleScript(commands[cmd]);
  // Wait for command to be executed before getting new state.
  const state = await getPlayerState();
  return state;
}

module.exports = {
  prev() {
    return execCommand("prev");
  },
  togglePlay() {
    return execCommand("togglePlay");
  },
  next() {
    return execCommand("next");
  },
  getState() {
    return getPlayerState();
  }
};
