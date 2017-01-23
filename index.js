import strings from './src/i18n/strings';

export { default as Validator } from './src/validator';

export function load(app) {
  app.i18n().strings(strings);
}
