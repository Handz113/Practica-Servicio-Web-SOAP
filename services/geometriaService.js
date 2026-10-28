/**
 * Servicio de Geometría SOAP
 * Implementación de la lógica matemática descrita en wsdl/geometria.wsdl
 */

const geometriaService = {
  GeometriaService: {
    GeometriaPort: {
      /**
       * Calcula el área de un rectángulo
       * Fórmula: base * altura
       * @param {Object} args - { base: number, altura: number }
       * @returns {Object} - { area: number }
       */
      AreaRectangulo: function (args) {
        const rawBase = args.base ?? args['tns:base'];
        const rawAltura = args.altura ?? args['tns:altura'];

        const base = parseFloat(rawBase);
        const altura = parseFloat(rawAltura);

        if (isNaN(base) || isNaN(altura)) {
          throw {
            Fault: {
              faultcode: 'soap:Client',
              faultstring: 'Los parámetros "base" y "altura" son requeridos y deben ser números válidos.',
              detail: { error: `Base recibida: ${rawBase}, Altura recibida: ${rawAltura}` }
            }
          };
        }

        if (base < 0 || altura < 0) {
          throw {
            Fault: {
              faultcode: 'soap:Client',
              faultstring: 'Los valores de "base" y "altura" no pueden ser negativos.',
              detail: { error: `Base: ${base}, Altura: ${altura}` }
            }
          };
        }

        const area = base * altura;

        return {
          area: parseFloat(area.toFixed(4))
        };
      },

      /**
       * Calcula el perímetro de un rectángulo
       * Fórmula: 2 * (base + altura)
       * @param {Object} args - { base: number, altura: number }
       * @returns {Object} - { perimetro: number }
       */
      PerimetroRectangulo: function (args) {
        const rawBase = args.base ?? args['tns:base'];
        const rawAltura = args.altura ?? args['tns:altura'];

        const base = parseFloat(rawBase);
        const altura = parseFloat(rawAltura);

        if (isNaN(base) || isNaN(altura)) {
          throw {
            Fault: {
              faultcode: 'soap:Client',
              faultstring: 'Los parámetros "base" y "altura" son requeridos y deben ser números válidos.',
              detail: { error: `Base recibida: ${rawBase}, Altura recibida: ${rawAltura}` }
            }
          };
        }

        if (base < 0 || altura < 0) {
          throw {
            Fault: {
              faultcode: 'soap:Client',
              faultstring: 'Los valores de "base" y "altura" no pueden ser negativos.',
              detail: { error: `Base: ${base}, Altura: ${altura}` }
            }
          };
        }

        const perimetro = 2 * (base + altura);

        return {
          perimetro: parseFloat(perimetro.toFixed(4))
        };
      }
    }
  }
};

export default geometriaService;
