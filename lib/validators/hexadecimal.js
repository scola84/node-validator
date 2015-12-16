'use strict';

module.exports = {
  validate(field, value) {
    value = String(value);

    if (!value.match(/^[0-9A-F]+$/i)) {
      return 'illegal_value';
    }

    if (field.length) {
      if (value.length < field.length[0]) {
        return 'illegal_length_left';
      }

      if (value.length > field.length[1]) {
        return 'illegal_length_right';
      }
    }

    return true;
  }
};
