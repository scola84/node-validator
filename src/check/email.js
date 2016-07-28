import RangeCheck from './range';

export default class EmailCheck extends RangeCheck {
  constructor() {
    super();
    this._domains = null;
  }

  domains(domains) {
    this._domains = domains;
    return this;
  }

  check(value) {
    if (typeof value !== 'string') {
      return this._reason(false);
    }

    if (this._checkRange(value.length) !== true) {
      return this._reason(this._createRange());
    }

    const [local, domain] = value.split('@');

    if (!local) {
      return this._reason('local');
    }

    if (!this._domain(domain)) {
      return this._reason('domain');
    }

    if (this._domains && this._domains.indexOf(domain) === -1) {
      return this._reason(this._domains.join(','));
    }

    return true;
  }

  _reason(reason) {
    return {
      email: reason
    };
  }

  _domain(domain) {
    return domain ? domain.split('.').every((part) => {
      return part.match(/^[a-z0-9\-\(\)]+$/i) &&
        part[0] !== '-' &&
        part[part.length - 1] !== '-';
    }) : false;
  }
}
