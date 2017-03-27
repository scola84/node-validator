import Check from '../check';

export default class RangeCheck extends Check {
  constructor() {
    super();

    this._min = null;
    this._max = null;
  }

  min(value = null) {
    if (value === null) {
      return this._min;
    }

    this._min = value;
    return this;
  }

  max(value = null) {
    if (value === null) {
      return this._max;
    }

    this._max = value;
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
    if (this._min !== null && this._max !== null) {
      return {
        range: {
          min: this._min,
          max: this._max
        }
      };
    }

    if (this._min !== null) {
      return {
        min: this._min
      };
    }

    if (this._max !== null) {
      return {
        max: this._max
      };
    }

    return null;
  }
}
