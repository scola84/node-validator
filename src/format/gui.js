export default function formatGuiError(string, error, callback) {
  if (error instanceof Error) {
    return error.message;
  }

  const prefix = 'scola.validator.';

  let text = '';
  let type = null;
  let detail = null;

  Object.keys(error).forEach((field) => {
    text += string.format(prefix + 'field.begin', {
      field: callback ? callback(field) : field
    });

    type = Object.keys(error[field]).pop();
    text += string.format(prefix + 'field.' + type);

    if (typeof error[field][type] === 'string') {
      text += string.format(prefix + 'check.' +
        type + '.' + error[field][type]);
    }

    if (typeof error[field][type] === 'object') {
      detail = Object.keys(error[field][type]).pop();
      text += string.format(prefix + 'check.' +
        type + '.' + detail, error[field][type]);
    }

    text += string.format(prefix + 'field.end');
  });

  return text;
}
