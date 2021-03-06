import Rule from './rule';
import flatten from './helper/flatten';

export default class Strict extends Rule {
  check(object, errors) {
    const copy = flatten(object);
    const rules = this._validator.rules();

    rules.forEach((rule) => {
      delete copy[rule.field()];
    });

    Object.keys(copy).forEach((field) => {
      errors[field] = {
        strict: true
      };
    });
  }
}
