import RangeCheck from './range';

export default class EmailCheck extends RangeCheck {
  constructor() {
    super();
    
    this._regex = /^[a-z0-9\-\(\)]+$/i;
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

    if (local.length === 0) {
      return this._error(field, 'local', errors);
    }

    if (domain.length === 0 ||
      this._valid(domain) === false) {

      return this._error(field, 'domain', errors);
    }

    if (Array.isArray(this._domains) === true &&
      this._domains.indexOf(domain) === -1) {

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

  _valid(domain) {
    return domain.split('.').every((part) => {
      return this._regex.test(part) === true &&
        part[0] !== '-' &&
        part[part.length - 1] !== '-';
    });
  }
}
