import RangeCheck from './range';

export default class FloatCheck extends RangeCheck {
  constructor() {
    super();
    this._number = null;
  }

  number(value = null) {
    if (value === null) {
      return this._number;
    }

    this._number = value;
    return this;
  }

  check(field, value, errors, options) {
    value = this._number !== null ?
      this._number.parse(String(value), options.locale) : value;

    if (isNaN(value) === true) {
      return this._error(field, false, errors);
    }

    if (this._checkRange(value) !== true) {
      return this._error(field, this._createRange(), errors);
    }

    return Number(value);
  }

  _error(field, reason, errors) {
    errors[field] = {
      float: reason
    };

    return false;
  }
}
