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

  toString(i18n, fieldPrefix) {
    if (typeof i18n === 'undefined') {
      return this._raw();
    }

    return this._format(i18n, fieldPrefix);
  }

  _raw() {
    return Object.keys(this._errors).map((field) => {
      this._rawError(field);
    }).join('&');
  }

  _format(i18n, fieldPrefix) {
    const prefix = 'scola.validator.';
    const string = i18n.string();

    if (!string.get(prefix.slice(0, -1), 'en')) {
      string.data(data);
    }

    return Object.keys(this._errors).map((field) => {
      return this._formatError(string, field, prefix, fieldPrefix);
    }).join(' ');
  }

  _rawError(field) {
    const reason = Object.keys(this._errors[field]).pop();
    const value = JSON.stringify(this._errors[field][reason]);

    return field + '=' + reason + ':' + value;
  }

  _formatError(string, field, prefix, fieldPrefix) {
    let text = '';
    const error = this._errors[field];

    text += string.format(prefix + 'field.begin', {
      field: string.format(fieldPrefix + field)
    });

    const type = Object.keys(error).pop();
    text += string.format(prefix + 'field.' + type);

    if (typeof error[type] === 'string') {
      text += string.format(prefix + 'check.' +
        type + '.' + error[type]);
    }

    if (typeof error[type] === 'object') {
      const detail = Object.keys(error[type]).pop();
      text += string.format(prefix + 'check.' +
        type + '.' + detail, error[type]);
    }

    text += string.format(prefix + 'field.end');

    return text;
  }
}
