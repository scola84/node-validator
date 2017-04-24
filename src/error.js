import { ScolaError } from '@scola/error';

export default class ValidatorError extends ScolaError {
  constructor(errors) {
    super('');

    this.errors = errors;
    this.message = this._raw();
    this.stack = new Error(this.message).stack;

    this._parse();
  }

  toString(string = null, fieldPrefix = '', prefix = 'scola.error.') {
    if (string === null) {
      return 'Error: ' + this._raw();
    }

    return this._format(string, fieldPrefix, prefix);
  }

  _raw() {
    return '400 invalid_input ' +
      Object.keys(this.errors).map((field) => {
        return this._rawError(field);
      }).join('&');
  }

  _format(string, fieldPrefix, prefix) {
    return Object.keys(this.errors).map((field) => {
      return this._formatError(string, field, fieldPrefix, prefix);
    }).join(' ');
  }

  _rawError(field) {
    const reason = Object.keys(this.errors[field]).pop();
    const value = JSON.stringify(this.errors[field][reason]);

    return field + '=' + reason + ':' + value;
  }

  _formatError(string, field, fieldPrefix, prefix) {
    let text = '';
    const error = this.errors[field];

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
