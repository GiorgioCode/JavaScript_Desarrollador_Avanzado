// Comenzando a trabajar con AJAX
// AJAX (Asynchronous JavaScript and XML) permite actualizar partes de una página sin recargarla completamente.
// AJAX usa solicitudes asincrónicas para comunicarse con el servidor y obtener o enviar datos.

// 1. Introducción a AJAX
// AJAX utiliza JavaScript para crear solicitudes al servidor y modificar el DOM basándose en las respuestas recibidas.
// No requiere recargar la página, lo cual mejora la experiencia del usuario en aplicaciones web.

// 2. Introducción a la API Web XMLHttpRequest
// XMLHttpRequest (XHR) es una API que permite hacer solicitudes HTTP para interactuar con el servidor.
// Aunque se usa comúnmente para obtener datos JSON, también puede recibir otros tipos de datos.

let xhr = new XMLHttpRequest(); // Creamos una instancia de XMLHttpRequest

// 3. Configurando un objeto XHR
// Podemos configurar un objeto XHR para realizar solicitudes GET o POST al servidor.
// `open` define el método (GET, POST) y la URL de la solicitud.
// `send` inicia la solicitud.

xhr.open("GET", "https://api.ejemplo.com/datos"); // Configura el tipo de solicitud y URL
xhr.send(); // Envía la solicitud al servidor

// 4. Creando un servidor para XHR
// Para recibir solicitudes XHR, un servidor necesita un endpoint para recibir y responder.
// Se puede configurar un servidor con Node.js para recibir solicitudes AJAX.
// Ejemplo (en Node.js):
// const express = require("express");
// const app = express();
// app.get("/datos", (req, res) => res.json({ mensaje: "Hola desde el servidor!" }));
// app.listen(3000);

// 5. Analizando las propiedades de un objeto XHR
// El objeto XHR tiene propiedades útiles para analizar el estado de la solicitud:
// `readyState`: indica el estado de la solicitud (0 a 4)
// `status`: código HTTP de respuesta (200, 404, 500, etc.)
// `responseText`: el cuerpo de la respuesta en formato de texto

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        // 4 es "completado"
        console.log(xhr.responseText); // Muestra la respuesta si la solicitud fue exitosa
    }
};

// 6. Operaciones con XHR
// Además de GET, podemos usar POST, PUT y DELETE para CRUD (Crear, Leer, Actualizar, Eliminar) con un servidor

xhr.open("POST", "https://api.ejemplo.com/guardar");
xhr.setRequestHeader("Content-Type", "application/json"); // Configura el tipo de contenido
xhr.send(JSON.stringify({ nombre: "Estudiante", edad: 25 })); // Envía datos en formato JSON

// 7. Registrando cambios en un pedido XHR
// Usamos `onreadystatechange` para manejar diferentes etapas de la solicitud (de 0 a 4 en `readyState`)

xhr.onreadystatechange = function () {
    switch (xhr.readyState) {
        case 0:
            console.log("Petición no inicializada");
            break;
        case 1:
            console.log("Conexión establecida");
            break;
        case 2:
            console.log("Solicitud recibida");
            break;
        case 3:
            console.log("Procesando respuesta");
            break;
        case 4:
            console.log("Finalizado y respuesta recibida");
            break;
    }
};

// 8. Validando la respuesta de un servidor
// Podemos verificar si la solicitud fue exitosa al revisar el código `status` y `readyState`

xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        console.log("Respuesta exitosa:", xhr.responseText);
    } else {
        console.error("Error en la solicitud:", xhr.statusText);
    }
};

// 9. Resolviendo un pedido con demora
// Las solicitudes a menudo tienen demoras debido a la red o al procesamiento del servidor.
// Podemos usar `setTimeout` para simular una demora en el servidor.

setTimeout(() => {
    console.log("Simulación de respuesta lenta del servidor");
    xhr.onreadystatechange();
}, 3000); // Simula una respuesta lenta de 3 segundos

// 10. Resolviendo un pedido exitoso
// Si la solicitud tiene éxito, mostramos los datos recibidos. Esto se maneja mejor en `onload`.

xhr.onload = function () {
    if (xhr.status === 200) {
        const datos = JSON.parse(xhr.responseText); // Parseamos JSON si la respuesta es JSON
        console.log("Datos recibidos:", datos); // Imprime los datos
    } else {
        console.error("Error en la solicitud:", xhr.status);
    }
};

// 11. Aplicaciones de XHR y el DOM
// Los datos recibidos de XHR se pueden usar para actualizar el DOM y mostrar contenido dinámico.

xhr.onload = function () {
    if (xhr.status === 200) {
        const datos = JSON.parse(xhr.responseText);
        document.getElementById("contenido").textContent = datos.mensaje; // Actualiza el DOM
    }
};

// 12. Manejo de archivos
// Con XHR podemos subir o descargar archivos entre el cliente y el servidor

const archivoInput = document.querySelector("#archivoInput");
archivoInput.addEventListener("change", function () {
    const archivo = archivoInput.files[0];
    if (archivo) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/subirArchivo");
        xhr.setRequestHeader("Content-Type", archivo.type); // Define el tipo de archivo
        xhr.send(archivo); // Envia el archivo al servidor

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("Archivo subido con éxito");
            } else {
                console.error("Error al subir archivo");
            }
        };
    }
});

// Resumen de flujo de una solicitud XHR
// 1. Crear un objeto XMLHttpRequest
// 2. Configurar la solicitud con `open` (método y URL)
// 3. Opcional: establecer encabezados con `setRequestHeader`
// 4. Escuchar cambios de estado (`onreadystatechange`) y `onload`
// 5. Manejar la respuesta (y posibles errores) en `onload`
// 6. Usar los datos recibidos para actualizar el DOM o realizar acciones adicionales

// Ejemplo final: Solicitar datos y manipular DOM
function solicitarDatos() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.ejemplo.com/datos");
    xhr.onload = function () {
        if (xhr.status === 200) {
            const datos = JSON.parse(xhr.responseText);
            actualizarDOM(datos);
        }
    };
    xhr.send();
}

function actualizarDOM(datos) {
    const contenedor = document.getElementById("contenedorDatos");
    datos.forEach((item) => {
        const div = document.createElement("div");
        div.textContent = item.nombre;
        contenedor.appendChild(div); // Añade cada elemento de datos al DOM
    });
}

// Resumen de lecciones aprendidas
// - AJAX permite realizar solicitudes asincrónicas al servidor sin recargar la página
// - XMLHttpRequest es el objeto principal para manejar solicitudes en AJAX
// - Configuración y uso de XHR, incluidas propiedades como readyState, status, y métodos como open, send
// - Validación de respuesta y manejo de errores con onload
// - Aplicaciones de AJAX en la manipulación del DOM y carga de datos
// - Ejemplo de manejo de archivos con XHR para subir archivos al servidor
