import RangeCheck from './range';

export default class IntegerCheck extends RangeCheck {
  check(value) {
    value = Number(value);

    if (!Number.isInteger(value)) {
      return this._reason(false);
    }

    if (this._checkRange(value) !== true) {
      return this._reason(this._createRange());
    }

    return true;
  }

  _reason(reason) {
    return {
      integer: reason
    };
  }
}
