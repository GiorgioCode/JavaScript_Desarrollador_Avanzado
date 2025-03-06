# GUIA de JavaScript Avanzado: AJAX con XMLHttpRequest

## Conceptos Fundamentales

El modelo de comunicación cliente-servidor tradicional vs. AJAX
Ventajas de las comunicaciones asíncronas
El objeto XMLHttpRequest: propósito y características
Formatos de datos comunes: XML, JSON, texto plano

### Creación y Configuración Básica de XHR

```JavaScript
// Crear una instancia de XMLHttpRequest
let xhr = new XMLHttpRequest();

// Configurar la petición
// Parámetros: método HTTP, URL, asíncrono (true/false)
xhr.open('GET', 'https://api.ejemplo.com/datos', true);

// Establecer encabezados (opcional)
xhr.setRequestHeader('Content-Type', 'application/json');

// Enviar la petición
xhr.send();
```

Ejercicio Práctico 1 (30 minutos)

Crear una página HTML simple con un botón
Implementar una petición XHR básica para obtener datos de texto
Mostrar los datos en la página

## Solución del Ejercicio Práctico 1: Petición XHR Básica

html/css

```HTML

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicio AJAX con XHR</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        h1 {
            color: #333;
            text-align: center;
        }

        .container {
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
        }

        #cargarDatos {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }

        #cargarDatos:hover {
            background-color: #45a049;
        }

        #resultado {
            margin-top: 20px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: #f9f9f9;
            min-height: 100px;
            display: none;
        }

        #cargando {
            display: none;
            text-align: center;
            margin-top: 20px;
            color: #666;
        }

        #error {
            display: none;
            color: red;
            margin-top: 20px;
            padding: 10px;
            background-color: #ffeeee;
            border: 1px solid #ffcccc;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>Ejercicio AJAX con XMLHttpRequest</h1>

    <div class="container">
        <button id="cargarDatos">Cargar Datos</button>

        <div id="cargando">Cargando datos...</div>

        <div id="error"></div>

        <div id="resultado"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>

```

JavaScript

```JavaScript

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM que vamos a manipular
    const botonCargar = document.getElementById('cargarDatos');
    const divResultado = document.getElementById('resultado');
    const divCargando = document.getElementById('cargando');
    const divError = document.getElementById('error');

    // Añadir un evento click al botón
    botonCargar.addEventListener('click', cargarDatosDesdeServidor);

    /**
     * Función que realiza la petición AJAX para obtener datos de texto
     */
    function cargarDatosDesdeServidor() {
        // Mostrar indicador de carga
        divCargando.style.display = 'block';

        // Ocultar contenido previo y mensajes de error
        divResultado.style.display = 'none';
        divError.style.display = 'none';

        // Crear una nueva instancia de XMLHttpRequest
        let xhr = new XMLHttpRequest();

        // Configurar la petición
        // Usamos una API pública que devuelve texto aleatorio
        xhr.open('GET', 'https://baconipsum.com/api/?type=all-meat&paras=2&format=text', true);

        // Configurar el manejador para cambios de estado
        xhr.onreadystatechange = function() {
            // Verificar si la petición se ha completado
            if (xhr.readyState === 4) {
                // Ocultar indicador de carga
                divCargando.style.display = 'none';

                // Verificar si la respuesta fue exitosa (código 200)
                if (xhr.status === 200) {
                    // Mostrar los datos en el div de resultado
                    divResultado.textContent = xhr.responseText;
                    divResultado.style.display = 'block';
                } else {
                    // Mostrar mensaje de error
                    divError.textContent = `Error al cargar los datos: ${xhr.status} ${xhr.statusText}`;
                    divError.style.display = 'block';
                }
            }
        };

        // Configurar manejador para errores de red
        xhr.onerror = function() {
            divCargando.style.display = 'none';
            divError.textContent = 'Error de red. Comprueba tu conexión a internet.';
            divError.style.display = 'block';
        };

        // Enviar la petición
        xhr.send();
    }
});
```

---

## MANEJO DE RESPUESTAS Y EVENTOS

### Estados y Eventos de XHR

```JavaScript
// Crear el objeto XHR
let xhr = new XMLHttpRequest();

// Configurar el evento principal para manejar cambios de estado
xhr.onreadystatechange = function() {
    // Verificar si la petición se ha completado (readyState 4)
    if (xhr.readyState === 4) {
        // Verificar si la respuesta fue exitosa (código 200)
        if (xhr.status === 200) {
            // Procesar la respuesta exitosa
            console.log('Datos recibidos:', xhr.responseText);
        } else {
            // Manejar errores
            console.error('Error en la petición:', xhr.status);
        }
    }
};

// Valores de readyState:
// 0: No inicializado
// 1: Conexión establecida
// 2: Petición recibida
// 3: Procesando petición
// 4: Petición finalizada y respuesta lista

// Abrir y enviar la petición
xhr.open('GET', 'https://api.ejemplo.com/datos', true);
xhr.send();

```

### Métodos Alternativos de Manejo de Eventos

```JavaScript
// Usando los eventos específicos en lugar de onreadystatechange
let xhr = new XMLHttpRequest();

// Evento load: se dispara cuando la petición se completa correctamente
xhr.onload = function() {
    // Este evento solo se dispara cuando readyState es 4 y status es 200
    console.log('Datos recibidos:', xhr.responseText);
};

// Evento error: se dispara cuando hay un error en la petición
xhr.onerror = function() {
    console.error('Error en la petición');
};

// Evento timeout: se dispara cuando la petición excede el tiempo límite
xhr.ontimeout = function() {
    console.error('La petición ha excedido el tiempo límite');
};

// Configurar timeout (en milisegundos)
xhr.timeout = 5000;

// Evento progress: se dispara periódicamente durante la descarga
xhr.onprogress = function(event) {
    // Si el evento contiene información sobre el tamaño total
    if (event.lengthComputable) {
        // Calcular y mostrar el porcentaje de progreso
        let porcentaje = (event.loaded / event.total) * 100;
        console.log(`Progreso: ${porcentaje.toFixed(2)}%`);
    }
};

xhr.open('GET', 'https://api.ejemplo.com/datos', true);
xhr.send();

```

### Procesamiento de Diferentes Tipos de Respuesta

```JavaScript
let xhr = new XMLHttpRequest();

xhr.onload = function() {
    if (xhr.status === 200) {
        // Para respuestas JSON
        let datosJSON = JSON.parse(xhr.responseText);
        console.log('Datos JSON:', datosJSON);

        // Para respuestas XML
        let datosXML = xhr.responseXML;
        console.log('Datos XML:', datosXML);

        // Para respuestas binarias (por ejemplo, imágenes)
        // Primero hay que configurar responseType antes de send()
        // xhr.responseType = 'arraybuffer';
        // let datosBinarios = xhr.response;
    }
};

xhr.open('GET', 'https://api.ejemplo.com/datos', true);
xhr.send();

```

Ejercicio Práctico 2

Crear una aplicación que muestre una barra de progreso durante la carga de datos
Implementar manejo de errores
Procesar y mostrar datos JSON en una tabla HTML

## Solución del Ejercicio Práctico 2: Barra de Progreso y Tabla de Datos

html/css

```HTML

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AJAX con Barra de Progreso</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }

        h1 {
            color: #333;
            text-align: center;
        }

        .container {
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
        }

        #cargarDatos {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-bottom: 20px;
        }

        #cargarDatos:hover {
            background-color: #45a049;
        }

        .progress-container {
            width: 100%;
            background-color: #f3f3f3;
            height: 25px;
            border-radius: 4px;
            margin-bottom: 20px;
            display: none;
        }

        .progress-bar {
            height: 100%;
            background-color: #4CAF50;
            border-radius: 4px;
            width: 0%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            transition: width 0.3s;
        }

        #dataTable {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        #dataTable th, #dataTable td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        #dataTable th {
            background-color: #4CAF50;
            color: white;
        }

        #dataTable tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        #tableContainer {
            display: none;
        }

        #error {
            display: none;
            color: white;
            background-color: #f44336;
            padding: 15px;
            border-radius: 4px;
            margin-top: 20px;
        }

        .info {
            background-color: #f9f9f9;
            padding: 10px;
            border-left: 4px solid #4CAF50;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <h1>Carga de Datos con Barra de Progreso</h1>

    <div class="container">
        <div class="info">
            Este ejemplo carga datos de usuarios desde la API JSONPlaceholder y muestra el progreso durante la carga.
            Los datos se procesarán y se mostrarán en una tabla HTML.
        </div>

        <button id="cargarDatos">Cargar Datos de Usuarios</button>

        <div id="progress-container" class="progress-container">
            <div id="progress-bar" class="progress-bar">0%</div>
        </div>

        <div id="error"></div>

        <div id="tableContainer">
            <h2>Datos de Usuarios</h2>
            <table id="dataTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Sitio Web</th>
                        <th>Empresa</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <!-- Los datos se insertarán aquí -->
                </tbody>
            </table>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>

```

```JavaScript

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const botonCargar = document.getElementById('cargarDatos');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const tableContainer = document.getElementById('tableContainer');
    const tableBody = document.getElementById('tableBody');
    const errorElement = document.getElementById('error');

    // Añadir evento click al botón
    botonCargar.addEventListener('click', cargarDatos);

    /**
     * Función principal para cargar los datos
     */
    function cargarDatos() {
        // Reiniciar estado
        resetUI();

        // Mostrar la barra de progreso
        progressContainer.style.display = 'block';

        // URL de la API que devuelve datos JSON (usuarios)
        const url = 'https://jsonplaceholder.typicode.com/users';

        // Crear una nueva instancia de XMLHttpRequest
        let xhr = new XMLHttpRequest();

        // Abrir la conexión
        xhr.open('GET', url, true);

        // Configurar el tipo de respuesta como JSON
        xhr.responseType = 'json';

        // Manejar el evento de progreso
        xhr.onprogress = function(event) {
            if (event.lengthComputable) {
                // Calcular el porcentaje de progreso
                const porcentaje = Math.round((event.loaded / event.total) * 100);

                // Actualizar la barra de progreso
                progressBar.style.width = porcentaje + '%';
                progressBar.textContent = porcentaje + '%';
            }
        };

        // Manejar la respuesta cuando se complete
        xhr.onload = function() {
            // Ocultar la barra de progreso
            progressContainer.style.display = 'none';

            // Verificar si la petición fue exitosa
            if (xhr.status === 200) {
                // Procesar los datos JSON y mostrarlos en la tabla
                const datos = xhr.response;
                mostrarDatosEnTabla(datos);
            } else {
                // Mostrar mensaje de error con el código de estado
                mostrarError(`Error ${xhr.status}: ${xhr.statusText}`);
            }
        };

        // Manejar errores de red
        xhr.onerror = function() {
            progressContainer.style.display = 'none';
            mostrarError('Error de red. Por favor, revisa tu conexión e inténtalo nuevamente.');
        };

        // Manejar timeout
        xhr.ontimeout = function() {
            progressContainer.style.display = 'none';
            mostrarError('La solicitud ha excedido el tiempo límite. Por favor, inténtalo nuevamente.');
        };

        // Establecer un timeout de 10 segundos
        xhr.timeout = 10000;

        // Enviar la petición
        xhr.send();
    }

    /**
     * Función para procesar y mostrar los datos en la tabla
     * @param {Array} datos - Array de objetos con datos de usuarios
     */
    function mostrarDatosEnTabla(datos) {
        // Limpiar el contenido actual de la tabla
        tableBody.innerHTML = '';

        // Verificar si se recibieron datos
        if (!datos || datos.length === 0) {
            mostrarError('No se encontraron datos para mostrar.');
            return;
        }

        // Iterar sobre cada objeto de datos y crear filas en la tabla
        datos.forEach(usuario => {
            // Crear una nueva fila
            const fila = document.createElement('tr');

            // Añadir celdas con los datos del usuario
            fila.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.name}</td>
                <td>${usuario.username}</td>
                <td>${usuario.email}</td>
                <td>${usuario.phone}</td>
                <td>${usuario.website}</td>
                <td>${usuario.company.name}</td>
            `;

            // Añadir la fila al cuerpo de la tabla
            tableBody.appendChild(fila);
        });

        // Mostrar la tabla
        tableContainer.style.display = 'block';
    }

    /**
     * Función para mostrar mensajes de error
     * @param {string} mensaje - Mensaje de error a mostrar
     */
    function mostrarError(mensaje) {
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
    }

    /**
     * Función para reiniciar la interfaz de usuario
     */
    function resetUI() {
        // Ocultar elementos
        errorElement.style.display = 'none';
        tableContainer.style.display = 'none';

        // Reiniciar la barra de progreso
        progressBar.style.width = '0%';
        progressBar.textContent = '0%';
    }
});

```

---

## APLICACIONES PRÁCTICAS Y CASOS DE USO

### Peticiones POST con XHR

```JavaScript
// Crear y configurar el objeto XHR para petición POST
let xhr = new XMLHttpRequest();
xhr.open('POST', 'https://api.ejemplo.com/enviar', true);

// Establecer el encabezado Content-Type para JSON
xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

// Manejar la respuesta
xhr.onload = function() {
    if (xhr.status === 200 || xhr.status === 201) {
        // Procesar respuesta exitosa
        console.log('Respuesta del servidor:', xhr.responseText);
    } else {
        // Manejar error
        console.error('Error al enviar datos:', xhr.status);
    }
};

// Crear el objeto de datos a enviar
let datos = {
    nombre: "Juan Pérez",
    email: "juan@ejemplo.com",
    mensaje: "Hola, este es un mensaje de prueba"
};

// Convertir el objeto a JSON y enviar
xhr.send(JSON.stringify(datos));

```

### Implementación de un Sistema de Autenticación

```JavaScript

/**
 * Función para iniciar sesión usando XMLHttpRequest
 * @param {string} usuario - Nombre de usuario
 * @param {string} contraseña - Contraseña del usuario
 * @param {function} callback - Función a ejecutar tras la respuesta
 */
function iniciarSesion(usuario, contraseña, callback) {
    // Crear el objeto XHR
    let xhr = new XMLHttpRequest();

    // Configurar la petición
    xhr.open('POST', 'https://api.ejemplo.com/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    // Manejar la respuesta
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Login exitoso, parsear respuesta
            let respuesta = JSON.parse(xhr.responseText);

            // Guardar token en almacenamiento local
            localStorage.setItem('authToken', respuesta.token);

            // Ejecutar callback con éxito
            callback(null, respuesta);
        } else {
            // Error en el login
            callback(new Error('Error en la autenticación: ' + xhr.status), null);
        }
    };

    // Manejar errores de red
    xhr.onerror = function() {
        callback(new Error('Error de red'), null);
    };

    // Enviar credenciales
    let credenciales = {
        username: usuario,
        password: contraseña
    };

    xhr.send(JSON.stringify(credenciales));
}

// Uso de la función
document.getElementById('formLogin').addEventListener('submit', function(e) {
    e.preventDefault();

    let usuario = document.getElementById('usuario').value;
    let contraseña = document.getElementById('contraseña').value;

    iniciarSesion(usuario, contraseña, function(error, datos) {
        if (error) {
            // Mostrar mensaje de error
            document.getElementById('mensajeError').textContent = error.message;
        } else {
            // Redirigir a página principal o actualizar UI
            window.location.href = 'dashboard.html';
        }
    });
});

```

### Creación de una Utilidad AJAX Reutilizable

```JavaScript

/**
 * Función para realizar peticiones AJAX con XMLHttpRequest
 * @param {Object} opciones - Configuración de la petición
 * @param {string} opciones.método - Método HTTP (GET, POST, etc.)
 * @param {string} opciones.url - URL del recurso
 * @param {Object} [opciones.datos] - Datos a enviar (para POST, PUT, etc.)
 * @param {Object} [opciones.encabezados] - Encabezados HTTP
 * @param {number} [opciones.timeout] - Tiempo límite en milisegundos
 * @param {function} [opciones.onProgreso] - Función para manejar el progreso
 * @param {function} opciones.onÉxito - Función para manejar respuesta exitosa
 * @param {function} opciones.onError - Función para manejar errores
 */
function peticionAjax(opciones) {
    // Crear objeto XHR
    let xhr = new XMLHttpRequest();

    // Configurar tiempo límite si se especificó
    if (opciones.timeout) {
        xhr.timeout = opciones.timeout;
    }

    // Eventos
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Determinar tipo de respuesta
            let respuesta;
            try {
                // Intentar parsear como JSON
                respuesta = JSON.parse(xhr.responseText);
            } catch (e) {
                // Si no es JSON, usar texto plano
                respuesta = xhr.responseText;
            }
            opciones.onÉxito(respuesta, xhr.status);
        } else {
            opciones.onError(xhr.statusText, xhr.status);
        }
    };

    xhr.onerror = function() {
        opciones.onError('Error de red', 0);
    };

    xhr.ontimeout = function() {
        opciones.onError('Tiempo de espera agotado', 0);
    };

    // Manejar progreso si se especificó función
    if (opciones.onProgreso) {
        xhr.onprogress = opciones.onProgreso;
    }

    // Abrir conexión
    xhr.open(opciones.método, opciones.url, true);

    // Establecer encabezados si se proporcionaron
    if (opciones.encabezados) {
        for (let encabezado in opciones.encabezados) {
            xhr.setRequestHeader(encabezado, opciones.encabezados[encabezado]);
        }
    }

    // Preparar datos para envío
    let datosProcesados = null;
    if (opciones.datos) {
        // Si los datos ya son string, usarlos directamente
        if (typeof opciones.datos === 'string') {
            datosProcesados = opciones.datos;
        }
        // Si no, convertir a JSON
        else {
            datosProcesados = JSON.stringify(opciones.datos);
            // Establecer Content-Type si no se especificó
            if (!opciones.encabezados || !opciones.encabezados['Content-Type']) {
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            }
        }
    }

    // Enviar petición
    xhr.send(datosProcesados);
}

// Ejemplo de uso
peticionAjax({
    método: 'GET',
    url: 'https://api.ejemplo.com/datos',
    timeout: 5000,
    onProgreso: function(event) {
        if (event.lengthComputable) {
            let porcentaje = (event.loaded / event.total) * 100;
            console.log(`Cargando: ${porcentaje.toFixed(1)}%`);
        }
    },
    onÉxito: function(datos, status) {
        console.log('Datos recibidos:', datos);
    },
    onError: function(mensaje, código) {
        console.error(`Error ${código}: ${mensaje}`);
    }
});

```
