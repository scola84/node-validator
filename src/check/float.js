import RangeCheck from './range';

export default class FloatCheck extends RangeCheck {
  check(field, value, errors, options) {
    value = options.i18n ?
      options.i18n.number().parse(String(value), options.locale) : value;

    if (isNaN(value)) {
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
