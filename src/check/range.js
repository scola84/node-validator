import Check from '../check';

export default class RangeCheck extends Check {
  constructor() {
    super();

    this._min = null;
    this._max = null;
  }

  min(min) {
    this._min = min;
    return this;
  }

  max(max) {
    this._max = max;
    return this;
  }

  _checkRange(value) {
    if (this._min !== null && value < this._min) {
      return false;
    }

    if (this._max !== null && value > this._max) {
      return false;
    }

    return true;
  }

  _createRange() {
    if (this._min && this._max) {
      return {
        minmax: {
          min: this._min,
          max: this._max
        }
      };
    }

    if (this._min) {
      return {
        min: this._min
      };
    }

    if (this._max) {
      return {
        max: this._max
      };
    }

    return null;
  }
}
