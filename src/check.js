export default class Check {
  constructor() {
    this._validator = null;
  }

  validator(validator) {
    if (typeof validator === 'undefined') {
      return this._validator;
    }

    this._validator = validator;
    return this;
  }

  field(field) {
    return this._validator.field(field);
  }

  check() {
    throw new Error('Not implemented');
  }
}
