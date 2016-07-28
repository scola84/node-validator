export default {
  validator: {
    field_begin: ' Het veld "{field}" moet ',
    field_end: '.',
    fields: 'Niet alle velden zijn correct ingevuld.',
    required: 'een waarde hebben',
    strict: 'geen waarde hebben',
    check: {
      date: {
        type: 'een datum zijn',
        format: ' in het formaat {format}',
        min: ' groter dan of gelijk aan {min}',
        max: ' kleiner dan of gelijk aan {max}',
        minmax: ' tussen {minmax.min} en {minmax.max}'
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
        minmax: ' tussen {minmax.min} en {minmax.max}'
      }
    }
  }
};
