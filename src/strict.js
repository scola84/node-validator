import Rule from './rule';

export default class Strict extends Rule {
  check(object, options, errors) {
    const fields = Object.keys(object);
    const rules = this._validator.rules();

    rules.forEach((rule) => {
      fields.splice(fields.indexOf(rule.field()), 1);
    });

    fields.forEach((field) => {
      errors[field] = {
        strict: false
      };
    });

    return fields.length === 0;
  }
}
