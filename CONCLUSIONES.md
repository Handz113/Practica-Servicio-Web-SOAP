# Conclusiones y Respuestas de la Práctica

Este documento contiene las 6 preguntas de reflexión teórica y técnica sobre la implementación de servicios web SOAP, contratos WSDL, enrutamiento con Express Router y middlewares.

---

### 1. ¿Qué es el protocolo SOAP y en qué se diferencia fundamentalmente del estilo arquitectónico REST en el intercambio de datos?

*SOAP es un protocolo, utiliza archivos WSDL para definir exactamente operaciones y parámetros, a diferencia de REST que es un estilo arquitectónico que se basa en el uso de métodos HTTP para la comunicación entre cliente y servidor.*

---

### 2. ¿Cuál es la función del contrato WSDL en un servicio SOAP y qué papel desempeña cada una de sus secciones principales (`types`, `message`, `portType`, `binding` y `service`)?

*El contrato WSDL es un archivo XML que define las operaciones que ofrece un servicio SOAP, los parámetros que acepta y los tipos de datos que maneja. Cada sección principal tiene un papel fundamental en la comunicación entre cliente y servidor.*

---

### 3. ¿Por qué es fundamental la validación estricta de esquemas XML (XSD) y tipos de datos en la comunicación entre cliente y servidor en arquitecturas basadas en contratos?

*Es fundamental por que permite asegurar que el cliente y el servidor entienden la misma estructura de datos, evitando errores en la comunicación.*

---

### 4. ¿Cómo contribuye el uso de `express.Router` a la modularidad, escalabilidad y mantenimiento del código frente a concentrar todos los endpoints en un único archivo `app.js`?

*El uso de express.Router contribuye significativamente a la modularidad, escalabilidad y mantenimiento del código. Al dividir los endpoints en módulos independientes, se facilita la organización del proyecto y se reduce la complejidad del archivo principal.*

---

### 5. ¿Cuál es el propósito de un middleware centralizado como `logger.js` y por qué es crítico que no consuma ni altere el flujo (stream) del payload XML en peticiones SOAP?

*El propósito de un middleware centralizado es registrar información relevante sobre las peticiones que llegan al servidor, como el método HTTP, la URL solicitada, el código de estado de la respuesta y el tiempo de procesamiento en milisegundos.*

---

### 6. ¿Cuáles son las ventajas y desventajas de implementar servicios web SOAP en el entorno de Node.js frente a plataformas empresariales tradicionales como Java (JAX-WS) o .NET (WCF)?

**Ventajas:** *Facilidad de uso, entorno liviano y rápido para implementar servicios SOAP.*

---

### 6. ¿Cuáles son las ventajas y desventajas de implementar servicios web SOAP en el entorno de Node.js frente a plataformas empresariales tradicionales como Java (JAX-WS) o .NET (WCF)?

**Desventajas:** *Falta de madurez en comparación con Java o .NET.* 
