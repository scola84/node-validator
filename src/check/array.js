import Check from '../check';

export default class ArrayCheck extends Check {
  constructor() {
    super();
    this._with = null;
  }

  with(check) {
    this._with = check;
    return this;
  }

  check(value, options = {}) {
    if (!Array.isArray(value)) {
      return this._reason('type');
    }

    if (!this._with) {
      return true;
    }

    let result = null;

    return value.every((entry) => {
      result = this._with.check(entry, options);
      return result === true;
    }) ? true : this._reason(result);
  }

  _reason(reason) {
    return {
      array: reason
    };
  }
}
