import RangeCheck from './range';

export default class DateCheck extends RangeCheck {
  constructor() {
    super();
    this._format = null;
  }

  format(format) {
    this._format = format;
    return this;
  }

  check(field, value, errors, options) {
    if (isNaN(value)) {
      if (!options.i18n) {
        return this._error(field, false, errors);
      }

      value = options.i18n.date().parse(String(value), this._format,
        options.locale, options.timezone);
    }

    if (value === null) {
      return this._error(field, null, errors, options);
    }

    if (this._checkRange(value) !== true) {
      return this._error(field, this._createRange(options), errors);
    }

    return Number(value);
  }

  _error(field, reason, errors, options = {}) {
    errors[field] = {
      date: reason !== null ? reason : {
        format: options.i18n
          .date()
          .moment(options.locale, options.timezone)
          .localeData()
          .longDateFormat(this._format)
      }
    };

    return false;
  }

  _createRange(options = {}) {
    const min = this._min ? options.i18n.date().format(this._min,
      this._format, options.locale, options.timezone) : null;
    const max = this._max ? options.i18n.date().format(this._max,
      this._format, options.locale, options.timezone) : null;

    if (min && max) {
      return {
        range: {
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
