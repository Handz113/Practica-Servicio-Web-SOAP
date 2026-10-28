import express from 'express';
import logger from './middlewares/logger.js';
import soapRoutes from './routes/soapRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * 1. MIDDLEWARES GLOBALES
 * Se monta el logger centralizado ANTES de cualquier ruta.
 * Nota: No se utiliza express.json() ni body-parser para no consumir el stream
 * de las peticiones SOAP (el parser de la librería 'soap' requiere el stream XML crudo).
 */
app.use(logger);

/**
 * 2. RUTAS DE LA APLICACIÓN
 * Montaje del Router de servicios SOAP bajo el prefijo '/soap'
 */
app.use('/soap', soapRoutes);

/**
 * Ruta raíz de bienvenida
 */
app.get('/', (req, res) => {
  res.redirect('/soap');
});

/**
 * 3. MANEJO DE RUTAS NO ENCONTRADAS (404)
 * Responde estrictamente con un SOAP Fault en formato XML en lugar de JSON o HTML genérico.
 */
app.use((req, res) => {
  res.status(404).type('text/xml; charset=utf-8').send(`<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <soap:Fault>
      <faultcode>soap:Client</faultcode>
      <faultstring>Recurso no encontrado: ${req.originalUrl}</faultstring>
      <detail>Verifique que el endpoint solicitado pertenezca a un servicio SOAP registrado.</detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>`);
});

/**
 * 4. ARRANQUE DEL SERVIDOR
 */
const server = app.listen(PORT, () => {
  console.log('================================================================');
  console.log(` Servidor SOAP Express activo en http://localhost:${PORT}`);
  console.log('================================================================');
  console.log(` [Servicio 1] Conversiones: http://localhost:${PORT}/soap/conversiones`);
  console.log(`              WSDL:         http://localhost:${PORT}/soap/conversiones?wsdl`);
  console.log(` [Servicio 2] Geometría:    http://localhost:${PORT}/soap/geometria`);
  console.log(`              WSDL:         http://localhost:${PORT}/soap/geometria?wsdl`);
  console.log('================================================================');
});

export default app;
