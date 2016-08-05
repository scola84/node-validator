import Check from '../check';

export default class RegExpCheck extends Check {
  constructor() {
    super();
    this._match = null;
  }

  match(match) {
    this._match = match;
    return this;
  }

  check(field, value, errors) {
    value = String(value);

    return value.match(this._match) ?
      value : this._error(field, this._match.source, errors);
  }

  _error(field, reason, errors) {
    errors[field] = {
      regexp: reason
    };

    return false;
  }
}
