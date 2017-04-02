import Check from '../check';

export default class CustomCheck extends Check {
  constructor() {
    super();
    this._fn = null;
  }

  fn(value = null) {
    if (value === null) {
      return this._fn;
    }

    this._fn = value;
    return this;
  }

  check(field, value, errors) {
    return this._fn(field, value, errors);
  }
}
