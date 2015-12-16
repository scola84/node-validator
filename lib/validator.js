'use strict';

const validators = require('./validators');

class Validator {
  validate(fields, values) {
    const result = {};

    Object.keys(fields).forEach((name) => {
      const field = fields[name];
      const value = values[name];

      if (!field.type) {
        result[name] = this.validate(field, value);
        result.valid = result.valid === false ? false : result[name].valid;
      } else if (!validators[field.type]) {
        result[name] = 'no_validator';
        result.valid = false;
      } else {
        result[name] = validators[field.type].validate(field, value);
        result.valid = result.valid === false ? false : result[name] === true;
      }
    });

    return result;
  }
}

module.exports = Validator;
