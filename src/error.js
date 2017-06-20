import { ScolaError } from '@scola/error';

export default class ValidatorError extends ScolaError {
  constructor(errors) {
    super('');

    this.errors = errors;
    this.message = this._raw();
    this.stack = new Error(this.message).stack;

    this._prefix.field = '';

    this._parse();
  }

  toString(string = null) {
    if (string === null) {
      return 'Error: ' + this._raw();
    }

    return this._format(string);
  }

  _raw() {
    return '400 invalid_input ' +
      Object.keys(this.errors).map((field) => {
        return this._rawError(field);
      }).join('&');
  }

  _format(string) {
    return Object.keys(this.errors).map((field) => {
      return this._formatError(string, field);
    }).join(' ');
  }

  _rawError(field) {
    const reason = Object.keys(this.errors[field]).pop();
    const value = JSON.stringify(this.errors[field][reason]);

    return field + '=' + reason + ':' + value;
  }

  _formatError(string, field) {
    let text = '';
    const error = this.errors[field];

    text += string.format(this._prefix.string + 'field.begin', {
      field: string.format(this._prefix.field + field)
    });

    const type = Object.keys(error).pop();
    text += string.format(this._prefix.string + 'field.' + type);

    if (typeof error[type] === 'string') {
      text += string.format(this._prefix.string + 'check.' +
        type + '.' + error[type]);
    }

    if (typeof error[type] === 'object') {
      const detail = Object.keys(error[type]).pop();
      text += string.format(this._prefix.string + 'check.' +
        type + '.' + detail, error[type]);
    }

    text += string.format(this._prefix.string + 'field.end');

    return text;
  }
}
