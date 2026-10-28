/**
 * Middleware Centralizado de Logging para Express
 * 
 * Registra en consola el método HTTP, la URL solicitada, el código de estado
 * de la respuesta y el tiempo de procesamiento en milisegundos.
 * 
 * Regla de diseño: Escucha el evento 'finish' del stream de respuesta sin
 * interferir ni alterar el cuerpo (payload) XML de la petición o respuesta SOAP.
 */

const logger = (req, res, next) => {
  const start = process.hrtime();
  const timestamp = new Date().toISOString();

  // Escuchar cuando la respuesta ha terminado de enviarse
  res.on('finish', () => {
    const diff = process.hrtime(start);
    // Convertir a milisegundos con 2 decimales
    const durationMs = ((diff[0] * 1e9 + diff[1]) / 1e6).toFixed(2);
    const method = req.method;
    const url = req.originalUrl || req.url;
    const statusCode = res.statusCode;

    // Formatear mensaje con código de estado y métricas
    console.log(
      `[${timestamp}] [SOAP-LOGGER] ${method.padEnd(4)} ${url} -> Status: ${statusCode} | Duración: ${durationMs}ms`
    );
  });

  next();
};

export default logger;
