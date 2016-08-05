export default {
  scola: {
    error: {
      field: {
        begin: 'The field "{field}" should ',
        end: '.',
        required: 'have a value',
        strict: 'not have a value',
        date: 'be a date',
        email: 'be an e-mail address',
        float: 'be a decimal',
        integer: 'be an integer',
        string: 'a string'
      },
      check: {
        date: {
          format: ' formatted as {format}',
          min: ' greater than or equal to {min}',
          max: ' less than or equal to {max}',
          range: ' between {range.min} and {range.max}'
        },
        email: {
          domain: ' (domain is invalid)',
          local: ' (name is invalid)'
        },
        float: {
          min: ' greater than or equal to {min}',
          max: ' less than or equal to {max}',
          range: ' between {range.min} and {range.max}'
        },
        integer: {
          min: ' greater than or equal to {min}',
          max: ' less than or equal to {max}',
          range: ' between {range.min} and {range.max}'
        },
        string: {
          min: ' longer than or equal to {min} characters',
          max: ' shorter than or equal to {max} characters',
          range: ' between {range.min} and {range.max} characters'
        }
      }
    }
  }
};
