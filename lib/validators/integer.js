'use strict';

module.exports = {
  validate(field, value) {
    value = Number(value);

    if (!Number.isInteger(value)) {
      return 'illegal_value';
    }

    if (field.range) {
      if (value < field.range[0]) {
        return 'illegal_size_left';
      }

      if (value > field.range[1]) {
        return 'illegal_size_right';
      }
    }

    return true;
  }
};
