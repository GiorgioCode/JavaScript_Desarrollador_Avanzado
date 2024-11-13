// Almacenamiento Local en el Navegador
// Los navegadores modernos permiten almacenar datos localmente para hacer aplicaciones más dinámicas y persistentes.
// Estas tecnologías son útiles para guardar preferencias del usuario, sesiones, datos temporales y más.

// LocalStorage y SessionStorage
// La API Web de WebStorage tiene dos tipos principales de almacenamiento:
// 1. LocalStorage: persiste los datos incluso después de cerrar el navegador.
// 2. SessionStorage: los datos solo persisten mientras dura la sesión del navegador.

// Introducción a LocalStorage
// LocalStorage almacena datos en forma de pares clave-valor y puede guardar hasta 5MB por dominio en la mayoría de los navegadores.

localStorage.setItem("nombre", "Juan"); // Guardando datos
const nombreGuardado = localStorage.getItem("nombre"); // Recuperando datos
console.log(nombreGuardado); // "Juan"

// Puedes borrar datos específicos o limpiar todo el LocalStorage:
localStorage.removeItem("nombre"); // Elimina la clave "nombre"
localStorage.clear(); // Elimina todos los datos en LocalStorage

// Almacenamiento de Sesión con SessionStorage
// SessionStorage es similar a LocalStorage, pero los datos solo duran mientras la pestaña está abierta.

sessionStorage.setItem("sesionActiva", "true");
console.log(sessionStorage.getItem("sesionActiva")); // "true"

// Esto puede ser útil para almacenar datos temporales que solo deben persistir mientras el usuario permanece en la página.

// Eventos de Almacenamiento
// Podemos escuchar eventos de almacenamiento con `storage`, útil cuando queremos saber si los datos cambian en otra pestaña.

window.addEventListener("storage", function (event) {
    console.log("Cambio en el almacenamiento:");
    console.log("Clave: ", event.key);
    console.log("Nuevo valor: ", event.newValue);
});

// Este evento se dispara en todas las ventanas que escuchan el cambio, excepto en la que realizó la modificación.
// Ejemplo práctico: sincronizar datos de usuario entre diferentes pestañas de la misma aplicación.

// Cookies en JavaScript
// Las cookies son una forma tradicional de almacenamiento que permite a los sitios guardar pequeños trozos de datos en el navegador.
// Útil para autenticación y seguimiento, aunque más limitada que WebStorage en cuanto a tamaño y accesibilidad.

document.cookie = "usuario=Juan; max-age=3600; path=/"; // `max-age` define la duración en segundos

// Leer cookies desde JavaScript:
console.log(document.cookie); // muestra todas las cookies disponibles en la página actual

// Crear funciones para gestionar cookies facilita su uso:

function setCookie(nombre, valor, dias) {
    let fecha = new Date();
    fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
    document.cookie = `${nombre}=${valor};expires=${fecha.toUTCString()};path=/`;
}

function getCookie(nombre) {
    const nombreEQ = `${nombre}=`;
    const cookies = document.cookie.split(";");
    for (let c of cookies) {
        while (c.charAt(0) === " ") c = c.substring(1);
        if (c.indexOf(nombreEQ) === 0) return c.substring(nombreEQ.length);
    }
    return null;
}

function borrarCookie(nombre) {
    document.cookie = `${nombre}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// Ejemplo de uso:
setCookie("tema", "oscuro", 7); // Guarda una cookie "tema" por 7 días
console.log(getCookie("tema")); // "oscuro"
borrarCookie("tema"); // Borra la cookie "tema"

// Cookies vs LocalStorage vs SessionStorage
// - LocalStorage: persiste hasta que se borre explícitamente, buena para preferencias de usuario.
// - SessionStorage: dura hasta cerrar la pestaña, útil para información sensible a una sesión.
// - Cookies: pueden compartirse entre servidores y navegador, útil para autenticación o estados.

// Medición de Performance
// La API de Performance permite medir tiempos de carga y optimizar aplicaciones.

console.time("cargaCompleta"); // Inicia un temporizador

// Emulando una carga de recursos
setTimeout(() => {
    console.timeEnd("cargaCompleta"); // Mide el tiempo transcurrido
}, 1000);

// La consola mostrará el tiempo total transcurrido, en milisegundos.

// También podemos medir tareas específicas dentro de nuestro código:

console.time("procesoComplejo");
for (let i = 0; i < 1000000; i++) {
    // Simulamos un proceso complejo
}
console.timeEnd("procesoComplejo"); // Muestra cuánto tomó ejecutar el bucle

// API de Performance Web
// La API Performance también nos permite medir el rendimiento en carga de recursos.

window.addEventListener("load", () => {
    const performanceInfo = window.performance.timing;
    const tiempoDeCarga =
        performanceInfo.loadEventEnd - performanceInfo.navigationStart;
    console.log(`Tiempo de carga: ${tiempoDeCarga} ms`);
});

// La API Performance ofrece mediciones precisas de carga, respuesta del servidor y otros eventos de navegación.

// Ejemplo avanzado de medición de performance
// Vamos a medir el tiempo de respuesta de una solicitud de datos.

async function medirTiempoDeRespuesta(url) {
    const start = performance.now(); // Empieza el temporizador
    await fetch(url); // Hace una solicitud asíncrona
    const end = performance.now(); // Termina el temporizador
    console.log(`Tiempo de respuesta: ${end - start} ms`);
}

medirTiempoDeRespuesta("https://jsonplaceholder.typicode.com/todos/1");

// Esta medición puede ayudarnos a detectar problemas de rendimiento en la carga de datos remotos.

// Ejercicio adicional: Crear una función que utilice LocalStorage y mida el tiempo de ejecución para almacenar y recuperar grandes cantidades de datos.

function almacenarDatosMasivos() {
    console.time("Almacenamiento de datos masivos");
    const datos = Array(10000).fill("datoEjemplo");
    localStorage.setItem("datosMasivos", JSON.stringify(datos));
    console.timeEnd("Almacenamiento de datos masivos");
}

function recuperarDatosMasivos() {
    console.time("Recuperación de datos masivos");
    const datos = JSON.parse(localStorage.getItem("datosMasivos"));
    console.timeEnd("Recuperación de datos masivos");
}

almacenarDatosMasivos();
recuperarDatosMasivos();

// Resumen de conceptos avanzados en almacenamiento y medición de rendimiento:
// 1. Almacenamiento local con LocalStorage y SessionStorage.
// 2. Eventos de almacenamiento para sincronizar datos entre pestañas.
// 3. Uso de cookies en JavaScript y comparación con otros métodos de almacenamiento.
// 4. Medición de rendimiento con console.time y la API Performance.
// 5. Ejercicios prácticos para comprender la persistencia y optimización de rendimiento.
