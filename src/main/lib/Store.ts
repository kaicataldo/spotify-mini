import * as path from 'path';
import * as fs from 'fs';
import * as electron from 'electron';

const { app } = electron;

export default class Store {
  _configFilePath: string;
  _data: {
    [index: string]: any;
  };

  constructor() {
    this._configFilePath = path.join(
      app.getPath('appData'),
      'SpotifyMini/config.json'
    );
    this._ensureConfigExists();
    this._data = this._readConfig();
  }

  private _readConfig(): {} {
    return JSON.parse(fs.readFileSync(this._configFilePath, 'utf8'));
  }

  private _ensureConfigExists(): void {
    const dirname = path.dirname(this._configFilePath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }
    if (!fs.existsSync(this._configFilePath)) {
      fs.writeFileSync(this._configFilePath, JSON.stringify({}));
    }
  }

  public get(setting?: string): any {
    return setting ? this._data[setting] : this._data;
  }

  public set(key: {} | string, val?: any): void {
    if (typeof key === 'object') {
      this._data = { ...this._data, ...key };
    } else if (typeof key === 'string') {
      this._data[key] = val;
    } else {
      return;
    }
    fs.writeFileSync(this._configFilePath, JSON.stringify(this._data));
  }
}
