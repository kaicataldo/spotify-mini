import * as childProcess from 'child_process';
import * as request from 'request-promise-native';
import { PlayerState } from '../../types/PlayerState';
import { UserSettings } from '../../types/UserSettings';
import commands from './appleScriptCommands';

const { exec } = childProcess;

const TOKEN_URI = 'https://accounts.spotify.com/api/token';
const SEARCH_URI = 'https://api.spotify.com/v1/search';

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

async function requestAccessToken({
  clientId,
  clientSecret
}: {
  clientId: string;
  clientSecret: string;
}) {
  const { access_token } = JSON.parse(
    await request({
      method: 'POST',
      uri: TOKEN_URI,
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
  return access_token;
}

async function requestSearchResults(params: string, accessToken: string) {
  return JSON.parse(
    await request({
      method: 'GET',
      uri: SEARCH_URI,
      qs: {
        q: params,
        type: 'album,artist,track'
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  );
}

async function search(params: string, credentials: UserSettings): Promise<{}> {
  let response;
  try {
    const accessToken = await requestAccessToken(credentials);
    const searchResults = await requestSearchResults(params, accessToken);
    response = { ...searchResults };
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
