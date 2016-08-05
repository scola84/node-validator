import RangeCheck from './range';

export default class IntegerCheck extends RangeCheck {
  check(field, value, errors) {
    value = Number(value);

    if (!Number.isInteger(value)) {
      return this._error(field, false, errors);
    }

    if (this._checkRange(value) !== true) {
      return this._error(name, this._createRange(), errors);
    }

    return value;
  }

  _error(field, reason, errors) {
    errors[field] = {
      integer: reason
    };

    return false;
  }
}
