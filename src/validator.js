import ArrayCheck from './check/array';
import DateCheck from './check/date';
import EnumCheck from './check/enum';
import EmailCheck from './check/email';
import FloatCheck from './check/float';
import IntegerCheck from './check/integer';
import RegExpCheck from './check/regexp';
import StringCheck from './check/string';
import ValidatorError from './error';
import Rule from './rule';
import Strict from './strict';

export default class Validator {
  constructor() {
    this._rules = [];
  }

  rules() {
    return this._rules;
  }

  field(value) {
    const rule = new Rule()
      .validator(this)
      .field(value);

    this._rules.push(rule);
    return rule;
  }

  strict() {
    const rule = new Strict()
      .validator(this);

    this._rules.push(rule);
    return this;
  }

  array() {
    return new ArrayCheck().validator(this);
  }

  date() {
    return new DateCheck().validator(this);
  }

  email() {
    return new EmailCheck().validator(this);
  }

  enum() {
    return new EnumCheck().validator(this);
  }

  float() {
    return new FloatCheck().validator(this);
  }

  integer() {
    return new IntegerCheck().validator(this);
  }

  regexp() {
    return new RegExpCheck().validator(this);
  }

  string() {
    return new StringCheck().validator(this);
  }

  validate(object, options = {}, callback = () => {}) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    const errors = {};

    this._rules.forEach((rule) => {
      rule.check(object, errors, options);
    });

    const error = Object.keys(errors).length === 0 ?
      null : new ValidatorError(errors);

    callback(error);
  }
}
