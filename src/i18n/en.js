export default {
  scola: {
    validator: {
      fields: 'Niet alle velden zijn correct ingevuld.',
      field: {
        begin: 'Het veld "{field}" moet ',
        end: '.',
        required: 'een waarde hebben',
        strict: 'geen waarde hebben',
        date: 'een datum zijn',
        email: 'een e-mailadres zijn',
        integer: 'een getal zijn'
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
        integer: {
          min: ' groter dan of gelijk aan {min}',
          max: ' kleiner dan of gelijk aan {max}',
          range: ' tussen {range.min} en {range.max}'
        }
      }
    }
  }
};
