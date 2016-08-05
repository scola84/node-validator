import RangeCheck from './range';

export default class StringCheck extends RangeCheck {
  check(field, value, errors) {
    if (typeof value !== 'string') {
      return this._error(field, false, errors);
    }

    if (this._checkRange(value.length) !== true) {
      return this._error(field, this._createRange(), errors);
    }

    return String(value);
  }

  _error(field, reason, errors) {
    errors[field] = {
      string: reason
    };

    return false;
  }
}
