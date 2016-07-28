export default {
  scola: {
    validator: {
      fields: 'Niet alle velden zijn correct ingevuld.',
      field: {
        begin: ' Het veld "{field}" moet ',
        end: '.',
        required: 'een waarde hebben',
        strict: 'geen waarde hebben'
      },
      check: {
        date: {
          type: 'een datum zijn',
          format: ' in het formaat {format}',
          min: ' groter dan of gelijk aan {min}',
          max: ' kleiner dan of gelijk aan {max}',
          range: ' tussen {range.min} en {range.max}'
        },
        email: {
          type: ' een e-mailadres zijn',
          domain: ' (domein is ongeldig)',
          local: ' (naam is ongeldig)'
        },
        integer: {
          type: 'een geheel getal zijn',
          min: ' groter dan of gelijk aan {min}',
          max: ' kleiner dan of gelijk aan {max}',
          range: ' tussen {range.min} en {range.max}'
        }
      }
    }
  }
};
