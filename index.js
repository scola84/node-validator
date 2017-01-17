import strings from './src/i18n/strings';

export { default as Validator } from './src/validator';

export function load(i18n) {
  i18n.strings(strings);
}
