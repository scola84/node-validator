import RangeCheck from './range';

export default class FloatCheck extends RangeCheck {
  constructor() {
    super();
    this._i18n = null;
  }

  i18n(i18n) {
    this._i18n = i18n;
    return this;
  }

  check(field, value, errors, options) {
    value = this._i18n ?
      this._i18n.number().parse(String(value), options.locale) : value;

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
