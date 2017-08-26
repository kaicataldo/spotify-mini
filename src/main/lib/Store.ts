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
      'SpotifyMini/settings.json'
    );
    this._data = this._getConfig();
  }

  private _getConfig(): {} {
    let data;
    try {
      data = JSON.parse(this._readConfig());
    } catch (e) {
      // In the case of the config file being corrupted/not valid JSON, regenerate it
      if (fs.existsSync(this._configFilePath)) {
        fs.unlinkSync(this._configFilePath);
      }
      this._generateConfigFile();
      data = JSON.parse(this._readConfig());
    }
    return data;
  }

  private _readConfig(): string {
    return fs.readFileSync(this._configFilePath, 'utf8');
  }

  private _generateConfigFile(): void {
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
