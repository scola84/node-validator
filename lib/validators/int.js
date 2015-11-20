'use strict';

module.exports = {
  validate(entry) {
    const value = Number(entry.value);

    if (!Number.isInteger(value)) {
      entry.error = new Error('illegal_value');
    }

    if (entry.range) {
      if (value < entry.range[0]) {
        entry.error = new Error('illegal_size_left');
      }

      if (value > entry.range[1]) {
        entry.error = new Error('illegal_size_right');
      }
    }

    if (!entry.error) {
      entry.value = value;
    }
  }
};
