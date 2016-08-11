export default class ValidatorError extends Error {
  constructor(errors, prefix = 'scola.error.') {
    super();

    this.errors = errors;
    this.prefix = prefix;
    this.message = this._raw();
  }

  toString(string, prefix, fieldPrefix) {
    if (typeof string === 'undefined') {
      return 'Error: ' + this._raw();
    }

    return this._format(string, prefix, fieldPrefix);
  }

  _raw() {
    return Object.keys(this.errors).map((field) => {
      return this._rawError(field);
    }).join('&');
  }

  _format(string, prefix, fieldPrefix) {
    return Object.keys(this.errors).map((field) => {
      return this._formatError(string, field, prefix, fieldPrefix);
    }).join(' ');
  }

  _rawError(field) {
    const reason = Object.keys(this.errors[field]).pop();
    const value = JSON.stringify(this.errors[field][reason]);

    return field + '=' + reason + ':' + value;
  }

  _formatError(string, field, prefix, fieldPrefix) {
    prefix = prefix || this.prefix;

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
