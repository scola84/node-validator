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

  check(value, options = {}) {
    value = this._i18n.number().parse(value, options.locale);

    if (Number.isNaN(value)) {
      return this._reason(false);
    }

    if (this._checkRange(value) !== true) {
      return this._reason(this._createRange());
    }

    return true;
  }

  _reason(reason) {
    return {
      float: reason
    };
  }
}
