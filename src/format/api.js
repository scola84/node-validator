export default function formatApiError(error) {
  if (error instanceof Error) {
    return error.message;
  }

  let reason = null;
  let value = null;
  let text = '';

  Object.keys(error).forEach((field) => {
    reason = Object.keys(error[field]).pop();
    value = JSON.stringify(error[field][reason]);
    text += field + '=' + reason + ':' + value + ';';
  });

  return text;
}
