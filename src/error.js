import data from './i18n/data';

export default class ValidatorError extends Error {
  constructor(errors) {
    super();
    this._errors = errors;
  }

  get message() {
    return this._raw();
  }

  toObject() {
    return this._errors;
  }

  toString(i18n, callback) {
    if (typeof i18n === 'undefined') {
      return this._raw();
    }

    return this._format(i18n, callback);
  }

  _raw() {
    let reason = null;
    let value = null;

    return Object.keys(this._errors).map((field) => {
      reason = Object.keys(this._errors[field]).pop();
      value = JSON.stringify(this._errors[field][reason]);
      return field + '=' + reason + ':' + value;
    }).join('&');
  }

  _format(i18n, callback) {
    const prefix = 'scola.validator.';
    const string = i18n.string();

    if (!string.get(prefix.slice(0, -1), 'en')) {
      string.data(data);
    }

    let error = null;
    let type = null;
    let detail = null;

    return Object.keys(this._errors).map((field) => {
      let text = '';
      error = this._errors[field];

      text += string.format(prefix + 'field.begin', {
        field: callback ? callback(field) : field
      });

      type = Object.keys(error).pop();
      text += string.format(prefix + 'field.' + type);

      if (typeof error[type] === 'string') {
        text += string.format(prefix + 'check.' +
          type + '.' + error[type]);
      }

      if (typeof error[type] === 'object') {
        detail = Object.keys(error[type]).pop();
        text += string.format(prefix + 'check.' +
          type + '.' + detail, error[type]);
      }

      text += string.format(prefix + 'field.end');

      return text;
    }).join(' ');
  }
}
