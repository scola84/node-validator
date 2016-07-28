import RangeCheck from './range';

export default class StringCheck extends RangeCheck {
  check(value) {
    if (typeof value !== 'string') {
      return this._reason(false);
    }

    if (this._checkRange(value.length) !== true) {
      return this._reason(this._createRange());
    }

    return true;
  }

  _reason(reason) {
    return {
      string: reason
    };
  }
}
