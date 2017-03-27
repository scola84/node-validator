import isPlainObject from 'lodash-es/isPlainObject';

export default function flatten(source, target = {}, prefix = '') {
  Object.keys(source).forEach((key) => {
    if (isPlainObject(source[key]) === true) {
      flatten(source[key], target, prefix + key + '.');
    } else {
      target[prefix + key] = source[key];
    }
  });

  return target;
}
