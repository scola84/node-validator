import Check from '../check';

export default class EnumCheck extends Check {
  constructor() {
    super();
    this._values = null;
  }

  values(value = null) {
    if (value === null) {
      return this._values;
    }

    this._values = value;
    return this;
  }

  check(field, value, errors) {
    if (Array.isArray(value) === false) {
      return this._values.indexOf(value) !== -1 ?
        true : this._error(field, this._values.join(','), errors);
    }

    const valid = value.every((item) => {
      return this._values.indexOf(item) !== -1;
    });

    return valid === true ?
      value : this._error(field, this._values.join(','), errors);
  }

  _error(field, reason, errors) {
    errors[field] = {
      enum: reason
    };

    return false;
  }
}
