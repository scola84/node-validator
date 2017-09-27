import get from 'lodash-es/get';
import set from 'lodash-es/set';

export default class Rule {
  constructor() {
    this._validator = null;
    this._field = null;
    this._required = false;
    this._cast = false;
    this._default = null;
    this._check = null;
  }

  validator(value = null) {
    if (value === null) {
      return this._validator;
    }

    this._validator = value;
    return this;
  }

  field(value = null) {
    if (value === null) {
      return this._field;
    }

    this._field = value;
    return this;
  }

  default (value = null) {
    if (value === null) {
      return this._default;
    }

    this._default = value;
    return this;
  }

  cast() {
    this._cast = true;
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

  custom() {
    this._check = this._validator.custom();
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
    const value = this._field === '*' ?
      object : get(object, this._field);

    if (this._empty(value) === true) {
      if (this._required === true) {
        errors[this._field] = {
          required: true
        };
      } else if (this._default !== null) {
        set(object, this._field,
          this._default === '\\N' ? null : this._default);
      }

      return;
    }

    const result = this._check
      .check(this._field, value, errors, options);

    if (result !== false && this._cast === true) {
      set(object, this._field, result);
    }
  }

  _empty(value) {
    return typeof value === 'undefined' ||
      value === null ||
      value === '';
  }
}
