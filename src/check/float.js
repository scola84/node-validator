import RangeCheck from './range';

export default class FloatCheck extends RangeCheck {
  check(value) {
    if (typeof value !== 'number') {
      return this._reason(false);
    }

    if (this._checkRange(value) !== true) {
      return this._reason(this._createRange());
    }

    return true;
  }

  _reason(reason) {
    return {
      float: reason
    };
  }
}
