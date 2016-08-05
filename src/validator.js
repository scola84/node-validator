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

  strict() {
    this._rules.push(new Strict().validator(this));
    return this;
  }

  field(field) {
    const rule = new Rule()
      .validator(this)
      .field(field);

    this._rules.push(rule);
    return rule;
  }

  rules() {
    return this._rules;
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

  validate(object, options = {}) {
    const errors = {};

    this._rules.forEach((rule) => {
      rule.check(object, errors, options);
    });

    return Object.keys(errors).length === 0 ?
      null : new ValidatorError(errors);
  }
}
