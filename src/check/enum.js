import Check from '../check';

export default class EnumCheck extends Check {
  constructor() {
    super();
    this._values = null;
  }

  values(values) {
    this._values = values;
    return this;
  }

  check(value) {
    if (!Array.isArray(value)) {
      return this._values.indexOf(value) !== -1 ?
        true : this._reason(this._values.join(','));
    }

    return value.every((item) => {
      return this._values.indexOf(item) !== -1;
    }) ? true : this._reason(this._values.join(','));
  }

  _reason(reason) {
    return {
      enum: reason
    };
  }
}
