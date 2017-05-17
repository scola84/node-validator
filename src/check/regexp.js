import Check from '../check';

export default class RegExpCheck extends Check {
  constructor() {
    super();
    this._match = null;
  }

  match(value = null) {
    if (value === null) {
      return this._match;
    }

    this._match = value;
    return this;
  }

  check(field, value, errors) {
    value = String(value);

    return this._match.test(value) === true ?
      value : this._error(field, false, errors);
  }

  _error(field, reason, errors) {
    errors[field] = {
      regexp: reason
    };

    return false;
  }
}
