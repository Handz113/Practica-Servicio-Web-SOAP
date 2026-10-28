/**
 * Servicio de Conversiones SOAP
 * Implementación de la lógica de negocio descrita en wsdl/conversiones.wsdl
 */

const conversionesService = {
  ConversionesService: {
    ConversionesPort: {
      /**
       * Convierte grados Celsius a Fahrenheit
       * Fórmula: (Celsius * 9/5) + 32
       * @param {Object} args - { celsius: number }
       * @returns {Object} - { fahrenheit: number }
       */
      CelsiusAFahrenheit: function (args) {
        const rawCelsius = args.celsius ?? args['tns:celsius'];
        const celsius = parseFloat(rawCelsius);

        if (isNaN(celsius)) {
          throw {
            Fault: {
              faultcode: 'soap:Client',
              faultstring: 'El valor de "celsius" es requerido y debe ser un número válido.',
              detail: { error: `Valor recibido: ${rawCelsius}` }
            }
          };
        }

        const fahrenheit = (celsius * 9) / 5 + 32;

        return {
          fahrenheit: parseFloat(fahrenheit.toFixed(4))
        };
      },

      /**
       * Convierte kilómetros a millas
       * Factor de conversión: 1 km = 0.621371 millas
       * @param {Object} args - { kilometros: number }
       * @returns {Object} - { millas: number }
       */
      KilometrosAMillas: function (args) {
        const rawKilometros = args.kilometros ?? args['tns:kilometros'];
        const kilometros = parseFloat(rawKilometros);

        if (isNaN(kilometros)) {
          throw {
            Fault: {
              faultcode: 'soap:Client',
              faultstring: 'El valor de "kilometros" es requerido y debe ser un número válido.',
              detail: { error: `Valor recibido: ${rawKilometros}` }
            }
          };
        }

        const FACTOR_KM_A_MILLAS = 0.621371;
        const millas = kilometros * FACTOR_KM_A_MILLAS;

        return {
          millas: parseFloat(millas.toFixed(4))
        };
      }
    }
  }
};

export default conversionesService;
