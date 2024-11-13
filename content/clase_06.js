// Eventos importantes para la navegación
// Existen eventos específicos que nos ayudan a manejar la navegación y actualizar el contenido en aplicaciones SPA o navegaciones complejas.

window.addEventListener("popstate", (event) => {
    console.log("Navegación hacia atrás o adelante detectada.");
    // Aquí podríamos actualizar el contenido dinámico de la página según el estado del historial.
});

// Eventos
// Ejemplo de un laboratorio adicional donde los estudiantes pueden implementar eventos específicos para actualizar el DOM
document.getElementById("navegar").addEventListener("click", () => {
    console.log("Evento de navegación personalizado activado");
    // Cambios dinámicos en el DOM o la URL para simular la navegación en una SPA
});

// Elementos avanzados: Introducción a datos binarios en JavaScript
// JavaScript permite manejar datos binarios a través de objetos como ArrayBuffer y Blob.
// Un ArrayBuffer es un buffer que contiene datos binarios puros.

let buffer = new ArrayBuffer(16); // Crea un buffer de 16 bytes
let view = new Uint8Array(buffer); // Visualiza el buffer como una vista de 8 bits sin signo

// Admitiendo información binaria en una aplicación
// Para admitir datos binarios (como imágenes o archivos), podemos usar `Blob` o `FileReader` para leerlos.

const fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const binaryData = event.target.result; // Accede a los datos binarios
        console.log("Datos binarios recibidos:", binaryData);
    };

    reader.readAsArrayBuffer(file); // Lee el archivo como ArrayBuffer
});

// Decodificando archivos
// La API de FileReader permite decodificar datos binarios y convertirlos a diferentes formatos.

const imageInput = document.getElementById("imageInput");
imageInput.addEventListener("change", (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        document.getElementById("imageDisplay").src = event.target.result; // Muestra la imagen en el DOM
    };

    reader.readAsDataURL(imageFile); // Decodifica como DataURL
});

// Introducción a eventos de progreso
// Los eventos de progreso son útiles para seguir el estado de carga o descarga de datos.
// El evento `progress` se dispara a medida que avanza la operación de carga/descarga.

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/data");
xhr.onprogress = function (event) {
    if (event.lengthComputable) {
        const porcentaje = (event.loaded / event.total) * 100;
        console.log(`Progreso: ${porcentaje.toFixed(2)}%`);
    }
};
xhr.send();

// Progreso y el DOM
// Podemos usar el progreso de carga para actualizar elementos del DOM, como una barra de progreso.

const progressBar = document.getElementById("progressBar");
xhr.onprogress = function (event) {
    if (event.lengthComputable) {
        const porcentaje = (event.loaded / event.total) * 100;
        progressBar.style.width = `${porcentaje}%`;
    }
};

// Introducción a la Web API de Drag y Drop
// La API de Drag and Drop permite que los usuarios arrastren y suelten elementos en una página.
// `ondragstart`, `ondrop`, y `ondragover` son los principales eventos que facilitan esta interacción.

const dropArea = document.getElementById("dropArea");
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); // Evita que el navegador abra el archivo
    dropArea.classList.add("highlight"); // Añade una clase visual para indicar el área de drop
});

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    console.log("Archivo soltado:", files[0]);
});

// Integración de un formulario y Drag and Drop
// Combinamos formularios y arrastrar/soltar para subir archivos.

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    const formData = new FormData(); // Crea un objeto FormData
    formData.append("file", event.dataTransfer.files[0]); // Añade el archivo al formulario
    console.log("Formulario con archivo listo para enviar:", formData);
});

// Implementación de Drag and Drop con Formularios
// Creamos un formulario que permite arrastrar y soltar archivos que serán enviados usando FormData.

const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formulario);
    console.log("Datos del formulario listos para enviar:", formData);
});

// Introducción a la Web API FormData por formulario
// La API FormData permite construir fácilmente un conjunto de pares clave/valor para enviar a un servidor.

const formData = new FormData();
formData.append("nombre", "John Doe"); // Añade datos al formulario
formData.append("archivo", fileInput.files[0]); // Añade un archivo al formulario

// Implementación de FormData sin formulario
// FormData puede construirse sin un formulario HTML, añadiendo manualmente los datos necesarios.

const dataSinFormulario = new FormData();
dataSinFormulario.append("nombre", "Jane Doe");
dataSinFormulario.append("edad", 30);

// Implementación de FormData con XHR
// Usamos FormData para enviar datos a un servidor a través de XMLHttpRequest, ideal para subir archivos.

const xhrForm = new XMLHttpRequest();
xhrForm.open("POST", "https://api.example.com/upload");
xhrForm.onload = function () {
    console.log("Respuesta recibida:", xhrForm.responseText);
};
xhrForm.send(formData); // Envía el FormData con el archivo y otros datos

// Resumen de conceptos avanzados abordados en la clase:
// 1. Eventos de navegación y su impacto en aplicaciones de una sola página (SPA).
// 2. Uso de datos binarios en aplicaciones, incluyendo almacenamiento y decodificación de archivos.
// 3. Gestión de eventos de progreso en solicitudes de datos y visualización en el DOM.
// 4. Implementación de la API Drag and Drop para arrastrar y soltar archivos, así como su integración con formularios.
// 5. Uso de FormData para crear y enviar formularios dinámicos con XMLHttpRequest, especialmente útil para subir archivos.

// Ejemplo final: Implementación completa de carga de archivos con Drag and Drop y XHR
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const finalFormData = new FormData();
    finalFormData.append("file", files[0]);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.example.com/upload");
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("Archivo subido con éxito:", xhr.responseText);
        } else {
            console.error("Error en la subida de archivo");
        }
    };
    xhr.send(finalFormData); // Envía el archivo mediante XHR
});
