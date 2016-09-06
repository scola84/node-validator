import Check from '../check';

export default class EnumCheck extends Check {
  constructor() {
    super();
    this._values = null;
  }

  values(value) {
    this._values = value;
    return this;
  }

  check(field, value, errors) {
    if (!Array.isArray(value)) {
      return this._values.indexOf(value) !== -1 ?
        true : this._error(field, this._values.join(','), errors);
    }

    return value.every((item) => {
      return this._values.indexOf(item) !== -1;
    }) ? value : this._error(field, this._values.join(','), errors);
  }

  _error(field, reason, errors) {
    errors[field] = {
      enum: reason
    };

    return false;
  }
}
