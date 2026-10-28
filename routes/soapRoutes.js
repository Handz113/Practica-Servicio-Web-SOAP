import { Router } from 'express';
import soap from 'soap';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar la lógica de los servicios SOAP
import conversionesService from '../services/conversionesService.js';
import geometriaService from '../services/geometriaService.js';

// Resolver rutas de archivos en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Rutas absolutas a los contratos WSDL
const conversionesWsdlPath = path.join(__dirname, '../wsdl/conversiones.wsdl');
const geometriaWsdlPath = path.join(__dirname, '../wsdl/geometria.wsdl');

// Lectura de los contratos WSDL en memoria (formato UTF-8)
const conversionesWsdl = fs.readFileSync(conversionesWsdlPath, 'utf8');
const geometriaWsdl = fs.readFileSync(geometriaWsdlPath, 'utf8');

/**
 * Registro de Servicios SOAP utilizando la librería 'soap' sobre el Router de Express
 * 
 * Endpoints resultantes al montarse en '/soap':
 * - POST /soap/conversiones -> Ejecuta operaciones SOAP
 * - GET  /soap/conversiones?wsdl -> Devuelve contrato WSDL
 * - POST /soap/geometria    -> Ejecuta operaciones SOAP
 * - GET  /soap/geometria?wsdl    -> Devuelve contrato WSDL
 */

soap.listen(router, '/conversiones', conversionesService, conversionesWsdl, () => {
  console.log('✓ Servicio SOAP [Conversiones] registrado exitosamente en /soap/conversiones');
});

soap.listen(router, '/geometria', geometriaService, geometriaWsdl, () => {
  console.log('✓ Servicio SOAP [Geometría] registrado exitosamente en /soap/geometria');
});

// Ruta índice del router SOAP con información y enlaces a los WSDL
router.get('/', (req, res) => {
  res.type('text/html').send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Catálogo de Servicios SOAP</title>
      <style>
        body { font-family: system-ui, -apple-system, sans-serif; max-width: 700px; margin: 40px auto; line-height: 1.6; color: #333; }
        h1 { color: #1e3a8a; }
        ul { background: #f8fafc; padding: 20px 40px; border-radius: 8px; border: 1px solid #e2e8f0; }
        li { margin-bottom: 12px; }
        a { color: #2563eb; text-decoration: none; font-weight: 600; }
        a:hover { text-decoration: underline; }
        code { background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
      </style>
    </head>
    <body>
      <h1>Servicios Web SOAP Disponibles</h1>
      <p>Este router gestiona dos servicios web SOAP con intercambio exclusivo en XML:</p>
      <ul>
        <li>
          <strong>Servicio de Conversiones:</strong> <code>/soap/conversiones</code><br>
          Operaciones: <em>CelsiusAFahrenheit</em>, <em>KilometrosAMillas</em><br>
          Contrato: <a href="/soap/conversiones?wsdl">Ver WSDL (/soap/conversiones?wsdl)</a>
        </li>
        <li>
          <strong>Servicio de Geometría:</strong> <code>/soap/geometria</code><br>
          Operaciones: <em>AreaRectangulo</em>, <em>PerimetroRectangulo</em><br>
          Contrato: <a href="/soap/geometria?wsdl">Ver WSDL (/soap/geometria?wsdl)</a>
        </li>
      </ul>
    </body>
    </html>
  `);
});

export default router;
