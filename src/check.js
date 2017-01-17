export default class Check {
  constructor() {
    this._validator = null;
  }

  validator(value = null) {
    if (value === null) {
      return this._validator;
    }

    this._validator = value;
    return this;
  }

  field(value) {
    return this._validator.field(value);
  }

  check() {
    throw new Error('Not implemented');
  }
}
