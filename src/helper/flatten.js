import isPlainObject from 'lodash/isPlainObject';

export default function flatten(source, target, prefix) {
  prefix = prefix ? prefix + '.' : '';
  target = target || {};

  Object.keys(source).forEach((key) => {
    if (isPlainObject(source[key])) {
      flatten(source[key], target, prefix + key);
    } else {
      target[prefix + key] = source[key];
    }
  });

  return target;
}
