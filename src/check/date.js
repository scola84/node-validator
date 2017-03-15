import RangeCheck from './range';

export default class DateCheck extends RangeCheck {
  constructor() {
    super();
    this._date = null;
    this._format = null;
  }

  date(value = null) {
    if (value === null) {
      return this._date;
    }

    this._date = value;
    return this;
  }

  format(value = null) {
    if (value === null) {
      return this._format;
    }

    this._format = value;
    return this;
  }

  check(field, value, errors, options) {
    if (isNaN(value)) {
      if (!this._date) {
        return this._error(field, false, errors);
      }

      value = this._date.parse(String(value), this._format,
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
        format: this._date
          .moment(options.locale, options.timezone)
          .localeData()
          .longDateFormat(this._format)
      }
    };

    return false;
  }

  _createRange(options = {}) {
    const min = this._min ? this._date.format(this._min,
      this._format, options.locale, options.timezone) : null;
    const max = this._max ? this._date.format(this._max,
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
