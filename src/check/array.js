import Check from '../check';

export default class ArrayCheck extends Check {
  constructor() {
    super();
    this._with = null;
  }

  with(...check) {
    if (check.length === 0) {
      return this._with;
    }

    this._with = check;
    return this;
  }

  check(field, value, errors, options = {}) {
    if (!Array.isArray(value)) {
      return this._error(field, false, errors);
    }

    if (!this._with) {
      return true;
    }

    return value.every((entry, index) => {
      return this._with.some((check) => {
        value[index] = check.check(field, entry, errors, options);
        return typeof errors[field] === 'undefined';
      });
    }) ? value : false;
  }

  _error(field, reason, errors) {
    errors[field] = {
      array: reason
    };

    return false;
  }
}
