class PropsManager {
  _props = {};

  getProp(prop) {
    return this._props[prop];
  }

  setProp(prop, value) {
    this._props[prop] = value;
  }

  getAllProps() {
    return this._props;
  }
}

export default PropsManager;
