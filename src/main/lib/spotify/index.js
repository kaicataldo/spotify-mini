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

async function getState() {
  const { playerState } = commands;
  const serializedState = await execAppleScript(playerState);
  return JSON.parse(serializedState);
}

async function execCommand(cmd) {
  let response;
  try {
    if (cmd !== "getState") {
      await execAppleScript(commands[cmd]);
    }
    response = await getState();
  } catch ({ message }) {
    response = { status: "error", message };
    console.error(`Error: ${message}`);
  }
  return response;
}

module.exports = {
  getState,
  execCommand
};
