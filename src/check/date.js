import RangeCheck from './range';

export default class DateCheck extends RangeCheck {
  constructor() {
    super();

    this._i18n = null;
    this._format = null;
  }

  i18n(i18n) {
    this._i18n = i18n;
    return this;
  }

  format(format) {
    this._format = format;
    return this;
  }

  check(value, options = {}) {
    if (typeof value !== 'string') {
      return this._reason('type');
    }

    value = this._i18n.date().parse(value, this._format,
      options.locale, options.timezone);

    if (!value) {
      return this._reason(null, options);
    }

    if (this._checkRange(value) !== true) {
      return this._reason(this._createRange(options));
    }

    return true;
  }

  _reason(reason, options = {}) {
    return {
      date: reason || {
        format: this._i18n
          .date()
          .moment(options.locale, options.timezone)
          .localeData()
          .longDateFormat(this._format)
      }
    };
  }

  _createRange(options = {}) {
    const min = this._min ? this._i18n.date().format(this._min,
      this._format, options.locale, options.timezone) : null;
    const max = this._max ? this._i18n.date().format(this._max,
      this._format, options.locale, options.timezone) : null;

    if (min && max) {
      return {
        minmax: {
          min,
          max
        }
      };
    }

    if (min) {
      return {
        min
      };
    }

    if (max) {
      return {
        max
      };
    }

    return null;
  }
}
