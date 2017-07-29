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
    if (isNaN(value) === true) {
      if (this._date === null) {
        return this._error(field, false, errors);
      }

      value = this._date.parse(String(value), this._format,
        options.locale, options.timezone);

      value = value.isValid() ? value.toDate() : null;
    }

    if (value === null) {
      return this._error(field, null, errors, options);
    }

    if (this._checkRange(value) === false) {
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
    const min = this._min === null ? null :
      this._date.format(this._min, this._format,
        options.locale, options.timezone);

    const max = this._max === null ? null :
      this._date.format(this._max, this._format,
        options.locale, options.timezone);

    if (min !== null && max !== null) {
      return {
        range: {
          min,
          max
        }
      };
    }

    if (min !== null) {
      return {
        min
      };
    }

    if (max !== null) {
      return {
        max
      };
    }

    return null;
  }
}
