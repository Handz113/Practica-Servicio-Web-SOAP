# Práctica: Servicios Web SOAP con Node.js y Express

Este proyecto implementa una arquitectura modular de servicios web bajo el protocolo **SOAP 1.1** utilizando **Node.js**, el framework **Express** y la librería especializada **soap** (`node-soap`). Todo el intercambio de datos se realiza de forma estricta mediante **XML**, garantizando el cumplimiento de contratos formales **WSDL**.

---

## 📁 Estructura del Proyecto

```text
Practica-Servicio-Web-SOAP/
│
├── .gitignore                    # Exclusiones de Git (node_modules, logs, etc.)
├── package.json                  # Dependencias y configuración de ES Modules
├── app.js                        # Punto de entrada principal y orquestación
├── README.md                     # Documentación técnica y guía de ejecución
├── CONCLUSIONES.md               # Preguntas clave para análisis y conclusiones
│
├── wsdl/                         # Contratos de interfaz formal en XML
│   ├── conversiones.wsdl         # WSDL para el servicio de conversiones
│   └── geometria.wsdl            # WSDL para el servicio de geometría
│
├── services/                     # Lógica de negocio matemática
│   ├── conversionesService.js    # Métodos: CelsiusAFahrenheit, KilometrosAMillas
│   └── geometriaService.js       # Métodos: AreaRectangulo, PerimetroRectangulo
│
├── middlewares/                  # Interceptores de ciclo de vida HTTP
│   └── logger.js                 # Registro en consola sin alteración del stream XML
│
├── routes/                       # Enrutamiento modular
│   └── soapRoutes.js             # Registro de servicios SOAP con Express Router
│
└── samples/                      # Sobres SOAP (Envelopes) XML de prueba
    ├── celsiusAFahrenheit_request.xml
    ├── kilometrosAMillas_request.xml
    ├── areaRectangulo_request.xml
    └── perimetroRectangulo_request.xml
```

---

## ⚙️ Requisitos Previos

- **Node.js**: Versión 18.x o superior (soporte nativo para ES Modules).
- **NPM**: Versión 9.x o superior.
- **Cliente SOAP / HTTP**: Postman, Insomnia, SoapUI o `curl`.

---

## 🚀 Instalación y Ejecución

### 1. Clonar o acceder al directorio del proyecto:
```bash
cd "c:\Users\Juanm\OneDrive\Documents\Universidad\Semestre 7\Servicios_Web\Practica-Servicio-Web-SOAP"
```

### 2. Instalar dependencias:
```bash
npm install
```

### 3. Iniciar el servidor:

- **Modo Producción / Estándar:**
  ```bash
  npm start
  ```

- **Modo Desarrollo (con reinicio automático al guardar cambios):**
  ```bash
  npm run dev
  ```

El servidor estará escuchando en `http://localhost:3000`.

---

## 🌐 Endpoints y Contratos WSDL

| Servicio | Endpoint SOAP (POST) | Contrato WSDL (GET) | Operaciones Disponibles |
| :--- | :--- | :--- | :--- |
| **Conversiones** | `http://localhost:3000/soap/conversiones` | `http://localhost:3000/soap/conversiones?wsdl` | `CelsiusAFahrenheit`<br>`KilometrosAMillas` |
| **Geometría** | `http://localhost:3000/soap/geometria` | `http://localhost:3000/soap/geometria?wsdl` | `AreaRectangulo`<br>`PerimetroRectangulo` |

---

## 🧪 Instrucciones de Prueba

Para probar los servicios mediante **Postman** o **cURL**, configure siempre las siguientes cabeceras HTTP:

- **Método HTTP:** `POST`
- **Headers:**
  - `Content-Type: text/xml; charset=utf-8`
  - `SOAPAction: "<NombreOperacion>"` (opcional en SOAP 1.1 / document-literal, recomendado)

---

### Caso 1: CelsiusAFahrenheit (Entrada: 25 °C)

- **URL:** `http://localhost:3000/soap/conversiones`
- **Header:** `Content-Type: text/xml; charset=utf-8`
- **Header:** `SOAPAction: "CelsiusAFahrenheit"`
- **Sobre XML de Petición:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:tns="http://example.com/soap/conversiones">
  <soapenv:Header/>
  <soapenv:Body>
    <tns:CelsiusAFahrenheitRequest>
      <tns:celsius>25</tns:celsius>
    </tns:CelsiusAFahrenheitRequest>
  </soapenv:Body>
</soapenv:Envelope>
```

- **Respuesta XML Esperada:** `77 °F`
```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="http://example.com/soap/conversiones">
  <soap:Body>
    <tns:CelsiusAFahrenheitResponse>
      <tns:fahrenheit>77</tns:fahrenheit>
    </tns:CelsiusAFahrenheitResponse>
  </soap:Body>
</soap:Envelope>
```

- **Comando cURL:**
```bash
curl -X POST http://localhost:3000/soap/conversiones \
  -H "Content-Type: text/xml; charset=utf-8" \
  -H "SOAPAction: CelsiusAFahrenheit" \
  -d @samples/celsiusAFahrenheit_request.xml
```

---

### Caso 2: KilometrosAMillas (Entrada: 10 km)

- **URL:** `http://localhost:3000/soap/conversiones`
- **Header:** `Content-Type: text/xml; charset=utf-8`
- **Header:** `SOAPAction: "KilometrosAMillas"`
- **Sobre XML de Petición:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:tns="http://example.com/soap/conversiones">
  <soapenv:Header/>
  <soapenv:Body>
    <tns:KilometrosAMillasRequest>
      <tns:kilometros>10</tns:kilometros>
    </tns:KilometrosAMillasRequest>
  </soapenv:Body>
</soapenv:Envelope>
```

- **Respuesta XML Esperada:** `6.2137 millas`
```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="http://example.com/soap/conversiones">
  <soap:Body>
    <tns:KilometrosAMillasResponse>
      <tns:millas>6.2137</tns:millas>
    </tns:KilometrosAMillasResponse>
  </soap:Body>
</soap:Envelope>
```

- **Comando cURL:**
```bash
curl -X POST http://localhost:3000/soap/conversiones \
  -H "Content-Type: text/xml; charset=utf-8" \
  -H "SOAPAction: KilometrosAMillas" \
  -d @samples/kilometrosAMillas_request.xml
```

---

### Caso 3: AreaRectangulo (Entrada: Base = 8, Altura = 5)

- **URL:** `http://localhost:3000/soap/geometria`
- **Header:** `Content-Type: text/xml; charset=utf-8`
- **Header:** `SOAPAction: "AreaRectangulo"`
- **Sobre XML de Petición:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:tns="http://example.com/soap/geometria">
  <soapenv:Header/>
  <soapenv:Body>
    <tns:AreaRectanguloRequest>
      <tns:base>8</tns:base>
      <tns:altura>5</tns:altura>
    </tns:AreaRectanguloRequest>
  </soapenv:Body>
</soapenv:Envelope>
```

- **Respuesta XML Esperada:** `Área = 40`
```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="http://example.com/soap/geometria">
  <soap:Body>
    <tns:AreaRectanguloResponse>
      <tns:area>40</tns:area>
    </tns:AreaRectanguloResponse>
  </soap:Body>
</soap:Envelope>
```

- **Comando cURL:**
```bash
curl -X POST http://localhost:3000/soap/geometria \
  -H "Content-Type: text/xml; charset=utf-8" \
  -H "SOAPAction: AreaRectangulo" \
  -d @samples/areaRectangulo_request.xml
```

---

### Caso 4: PerimetroRectangulo (Entrada: Base = 8, Altura = 5)

- **URL:** `http://localhost:3000/soap/geometria`
- **Header:** `Content-Type: text/xml; charset=utf-8`
- **Header:** `SOAPAction: "PerimetroRectangulo"`
- **Sobre XML de Petición:**
```xml
<?xml version="1.0" encoding="utf-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:tns="http://example.com/soap/geometria">
  <soapenv:Header/>
  <soapenv:Body>
    <tns:PerimetroRectanguloRequest>
      <tns:base>8</tns:base>
      <tns:altura>5</tns:altura>
    </tns:PerimetroRectanguloRequest>
  </soapenv:Body>
</soapenv:Envelope>
```

- **Respuesta XML Esperada:** `Perímetro = 26`
```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="http://example.com/soap/geometria">
  <soap:Body>
    <tns:PerimetroRectanguloResponse>
      <tns:perimetro>26</tns:perimetro>
    </tns:PerimetroRectanguloResponse>
  </soap:Body>
</soap:Envelope>
```

- **Comando cURL:**
```bash
curl -X POST http://localhost:3000/soap/geometria \
  -H "Content-Type: text/xml; charset=utf-8" \
  -H "SOAPAction: PerimetroRectangulo" \
  -d @samples/perimetroRectangulo_request.xml
```

---

## 🛡️ Manejo de Errores SOAP (Faults)

Si se envían valores no numéricos o parámetros incompletos, el servidor responderá con un sobre SOAP estándar `soap:Fault`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <soap:Fault>
      <faultcode>soap:Client</faultcode>
      <faultstring>El valor de "celsius" es requerido y debe ser un número válido.</faultstring>
      <detail>
        <error>Valor recibido: NaN</error>
      </detail>
    </soap:Fault>
  </soap:Body>
</soap:Envelope>
```