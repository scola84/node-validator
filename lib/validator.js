'use strict';

const validators = require('./validators');

class Validator {
  validate(object) {
    Object.keys(object).forEach((key) => {
      if (!object[key].type) {
        this.validate(object[key]);
      } else if (validators[object[key].type]) {
        validators[object[key].type].validate(object[key]);
      } else {
        object[key].error = new Error('no_validator');
      }

      if (object[key].error) {
        object.error = new Error('invalid_entry');
      }
    });

    return object;
  }
}

module.exports = Validator;
