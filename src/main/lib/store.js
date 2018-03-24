const path = require('path');
const fs = require('fs');

module.exports = class Store {
  constructor(configPath) {
    this._configFilePath = configPath;
    this._data = this._getConfig();
  }

  _getConfig() {
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

  _readConfig() {
    return fs.readFileSync(this._configFilePath, 'utf8');
  }

  _generateConfigFile() {
    const dirname = path.dirname(this._configFilePath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }
    if (!fs.existsSync(this._configFilePath)) {
      fs.writeFileSync(this._configFilePath, JSON.stringify({}));
    }
  }

  get(setting) {
    return setting ? this._data[setting] : this._data;
  }

  set(key, val) {
    if (typeof key === 'object') {
      this._data = Object.assign({}, this._data, key);
    } else if (typeof key === 'string') {
      this._data[key] = val;
    } else {
      return;
    }
    fs.writeFileSync(this._configFilePath, JSON.stringify(this._data));
  }
};
