'use strict';

module.exports = {
  validate(entry) {
    const value = String(entry.value);

    if (!value.match(/^[0-9A-F]+$/i)) {
      entry.error = new Error('illegal_characters');
    }

    if (entry.length) {
      if (value.length < entry.length[0]) {
        entry.error = new Error('illegal_length_left');
      }

      if (value.length > entry.length[1]) {
        entry.error = new Error('illegal_length_right');
      }
    }

    if (!entry.error) {
      entry.value = value;
    }
  }
};
