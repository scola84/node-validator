import { flatten } from '@scola/deep';
import Rule from './rule';

export default class Strict extends Rule {
  check(object, options, errors) {
    const copy = flatten(object);
    const rules = this._validator.rules();

    rules.forEach((rule) => {
      delete copy[rule.field()];
    });

    Object.keys(copy).forEach((field) => {
      errors[field] = {
        strict: false
      };
    });
  }
}
