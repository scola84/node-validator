import RangeCheck from './range';

export default class EmailCheck extends RangeCheck {
  constructor() {
    super();
    this._domains = null;
  }

  domains(value = null) {
    if (value === null) {
      return this._domains;
    }

    this._domains = value;
    return this;
  }

  check(field, value, errors) {
    if (typeof value !== 'string') {
      return this._error(field, false, errors);
    }

    if (this._checkRange(value.length) !== true) {
      return this._error(field, this._createRange(), errors);
    }

    const [local, domain] = value.split('@');

    if (!local) {
      return this._error(field, 'local', errors);
    }

    if (!this._domain(domain)) {
      return this._error(field, 'domain', errors);
    }

    if (this._domains && this._domains.indexOf(domain) === -1) {
      return this._error(field, this._domains.join(','), errors);
    }

    return value;
  }

  _error(field, reason, errors) {
    errors[field] = {
      email: reason
    };

    return false;
  }

  _domain(domain) {
    return domain ? domain.split('.').every((part) => {
      return part.match(/^[a-z0-9\-\(\)]+$/i) &&
        part[0] !== '-' &&
        part[part.length - 1] !== '-';
    }) : false;
  }
}
