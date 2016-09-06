import get from 'lodash-es/get';
import set from 'lodash-es/set';

export default class Rule {
  constructor() {
    this._validator = null;
    this._field = null;
    this._required = false;
    this._check = null;
  }

  validator(value) {
    if (typeof value === 'undefined') {
      return this._validator;
    }

    this._validator = value;
    return this;
  }

  field(value) {
    if (typeof value === 'undefined') {
      return this._field;
    }

    this._field = value;
    return this;
  }

  required() {
    this._required = true;
    return this;
  }

  array() {
    this._check = this._validator.array();
    return this._check;
  }

  date() {
    this._check = this._validator.date();
    return this._check;
  }

  email() {
    this._check = this._validator.email();
    return this._check;
  }

  enum() {
    this._check = this._validator.enum();
    return this._check;
  }

  float() {
    this._check = this._validator.float();
    return this._check;
  }

  integer() {
    this._check = this._validator.integer();
    return this._check;
  }

  regexp() {
    this._check = this._validator.regexp();
    return this._check;
  }

  string() {
    this._check = this._validator.string();
    return this._check;
  }

  check(object, errors, options) {
    const value = get(object, this._field);

    if (this._empty(value)) {
      if (this._required) {
        errors[this._field] = {
          required: true
        };
      }

      return;
    }

    const result = this._check.check(this._field, value, errors, options);

    if (result !== false && options.cast === true) {
      set(object, this._field, result);
    }
  }

  _empty(value) {
    return value === null || typeof value === 'undefined' || value === '';
  }
}
