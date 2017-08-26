import * as childProcess from 'child_process';
import * as request from 'request-promise-native';
import { PlayerState } from '../../types/PlayerState';
import { UserSettings } from '../../types/UserSettings';
import commands from './appleScriptCommands';

const { exec } = childProcess;

function execAppleScript(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`osascript -e '${cmd}'`, (err, stdout) => {
      if (err) {
        reject(err);
      }
      resolve(stdout);
    });
  });
}

async function getState(): Promise<PlayerState> {
  const { playerState } = commands;
  const serializedState = await execAppleScript(playerState);
  return JSON.parse(serializedState);
}

async function execCommand(cmd: string): Promise<PlayerState> {
  let response: PlayerState;
  try {
    if (cmd !== 'getState') {
      await execAppleScript(commands[cmd]);
    }
    response = await getState();
  } catch ({ message }) {
    response = { status: 'error', message };
    console.error(`Error: ${message}`);
  }
  return response;
}

async function search(params: string, credentials: UserSettings): Promise<{}> {
  const { clientId, clientSecret } = credentials;
  let response;

  try {
    const { access_token } = JSON.parse(
      await request({
        method: 'POST',
        uri: 'https://accounts.spotify.com/api/token',
        form: {
          grant_type: 'client_credentials'
        },
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString('base64')}`
        }
      })
    );
    const searchResults = await request({
      method: 'GET',
      uri: 'https://api.spotify.com/v1/search',
      qs: {
        q: params,
        type: 'album,artist,track'
      },
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    response = { search_results: JSON.parse(searchResults) };
  } catch ({ message }) {
    response = { status: 'error', message };
    console.error(`Error: ${message}`);
  }
  return response;
}

export default {
  getState,
  execCommand,
  search
};
