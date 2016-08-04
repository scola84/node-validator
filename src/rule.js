import get from 'lodash-es/get';

export default class Rule {
  constructor() {
    this._validator = null;
    this._field = null;
    this._required = false;
    this._check = null;
  }

  validator(validator) {
    if (typeof validator === 'undefined') {
      return this._validator;
    }

    this._validator = validator;
    return this;
  }

  field(field) {
    if (typeof field === 'undefined') {
      return this._field;
    }

    this._field = field;
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

  check(object, options, errors) {
    const value = get(object, this._field);

    if (this._empty(value)) {
      if (this._required) {
        errors[this._field] = {
          required: true
        };
      }

      return;
    }

    const result = this._check.check(value, options);

    if (result !== true) {
      errors[this._field] = result;
    }
  }

  _empty(value) {
    return value === null || typeof value === 'undefined' || value === '';
  }
}
