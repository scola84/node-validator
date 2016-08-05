export default {
  scola: {
    error: {
      field: {
        begin: 'Het veld "{field}" moet ',
        end: '.',
        required: 'een waarde hebben',
        strict: 'geen waarde hebben',
        date: 'een datum zijn',
        email: 'een e-mailadres zijn',
        float: 'een decimaal getal zijn',
        integer: 'een geheel getal zijn',
        string: 'een tekenreeks zijn'
      },
      check: {
        date: {
          format: ' in het formaat {format}',
          min: ' groter dan of gelijk aan {min}',
          max: ' kleiner dan of gelijk aan {max}',
          range: ' tussen {range.min} en {range.max}'
        },
        email: {
          domain: ' (domein is ongeldig)',
          local: ' (naam is ongeldig)'
        },
        float: {
          min: ' groter dan of gelijk aan {min}',
          max: ' kleiner dan of gelijk aan {max}',
          range: ' tussen {range.min} en {range.max}'
        },
        integer: {
          min: ' groter dan of gelijk aan {min}',
          max: ' kleiner dan of gelijk aan {max}',
          range: ' tussen {range.min} en {range.max}'
        },
        string: {
          min: ' langer dan of gelijk aan {min} tekens',
          max: ' korter dan of gelijk aan {max} tekens',
          range: ' tussen {range.min} en {range.max} tekens'
        }
      }
    }
  }
};
