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

  check(value) {
    return String(value).match(this._match) ?
      true : this._reason(this._match.source);
  }

  _reason(reason) {
    return {
      regexp: reason
    };
  }
}
