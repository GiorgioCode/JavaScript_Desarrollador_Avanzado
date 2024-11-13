// Trabajo Asincrónico en JavaScript
// En JavaScript, muchas operaciones como llamadas a APIs, lecturas de archivos y temporizadores son asíncronas.
// Para trabajar con ellas, usaremos promesas, callbacks y funciones async.

// Introducción a Promesas
// Una promesa representa un valor que puede estar disponible ahora, en el futuro, o nunca.
// Podemos configurarlas para manejar el resultado o el error de una operación asíncrona.

const promesaEjemplo = new Promise((resolve, reject) => {
    const exito = true; // Simulamos una condición de éxito
    if (exito) {
        resolve("Operación exitosa");
    } else {
        reject("Ocurrió un error");
    }
});

promesaEjemplo
    .then((resultado) => {
        console.log(resultado); // Muestra "Operación exitosa"
    })
    .catch((error) => {
        console.error(error);
    });

// Configurando métodos de una promesa
// Los métodos `.then()` y `.catch()` permiten manejar el resultado o error de una promesa.
// Se pueden encadenar múltiples .then() para ejecutar operaciones secuenciales.

promesaEjemplo
    .then((resultado) => {
        console.log("Primera operación:", resultado);
        return "Segunda operación";
    })
    .then((resultado) => {
        console.log(resultado);
        return "Tercera operación";
    })
    .then((resultado) => console.log(resultado))
    .catch((error) => console.error("Error en alguna operación:", error));

// Principio de Encadenamiento
// Encadenar promesas permite ejecutar tareas secuenciales de manera más ordenada.

function operacionAsincrona1() {
    return new Promise((resolve) =>
        setTimeout(() => resolve("Tarea 1 completa"), 1000)
    );
}

function operacionAsincrona2() {
    return new Promise((resolve) =>
        setTimeout(() => resolve("Tarea 2 completa"), 1000)
    );
}

operacionAsincrona1()
    .then((resultado1) => {
        console.log(resultado1);
        return operacionAsincrona2();
    })
    .then((resultado2) => console.log(resultado2));

// Callbacks Anidados y el Problema de la Pirámide de la Perdición
// Cuando los callbacks se anidan, el código se vuelve difícil de leer y mantener, formando una estructura "piramidal".

function proceso(callback) {
    setTimeout(() => {
        console.log("Proceso terminado");
        callback();
    }, 1000);
}

proceso(() => {
    proceso(() => {
        proceso(() => console.log("Procesos completados"));
    });
});

// Primera Solución al Problema: Usar Promesas
// Podemos mejorar la legibilidad reemplazando callbacks anidados con promesas.

function procesoPromesa() {
    return new Promise((resolve) =>
        setTimeout(() => resolve("Proceso finalizado"), 1000)
    );
}

procesoPromesa()
    .then((resultado) => {
        console.log(resultado);
        return procesoPromesa();
    })
    .then((resultado) => {
        console.log(resultado);
        return procesoPromesa();
    })
    .then((resultado) => console.log(resultado));

// Pipeline y Operaciones
// Usar pipelines nos permite encadenar varias operaciones en un flujo continuo.

const pipeline = [
    operacionAsincrona1,
    operacionAsincrona2,
    operacionAsincrona1,
];
pipeline
    .reduce((prev, curr) => prev.then(curr), Promise.resolve())
    .then(() => console.log("Pipeline completo"));

// Introducción a la Web API Fetch
// Fetch permite realizar solicitudes HTTP y devuelve una promesa.

fetch("https://api.example.com/data")
    .then((response) => response.json()) // Convierte la respuesta en JSON
    .then((data) => console.log("Datos recibidos:", data))
    .catch((error) => console.error("Error en la solicitud:", error));

// Implementación completa de un pedido XHR
// XMLHttpRequest es otra forma de hacer peticiones asíncronas en JavaScript.

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.example.com/data");
xhr.onload = function () {
    if (xhr.status === 200) {
        console.log("Datos recibidos por XHR:", JSON.parse(xhr.responseText));
    } else {
        console.error("Error en la solicitud XHR");
    }
};
xhr.send();

// Encadenamiento Múltiple de Pedidos con Fetch
// Podemos encadenar múltiples llamadas Fetch para hacer varias operaciones secuenciales.

fetch("https://api.example.com/data")
    .then((response) => response.json())
    .then((data) => {
        console.log("Primer conjunto de datos:", data);
        return fetch("https://api.example.com/otros-datos");
    })
    .then((response) => response.json())
    .then((data) => console.log("Segundo conjunto de datos:", data))
    .catch((error) => console.error("Error en alguna solicitud:", error));

// Laboratorio Adicional
// Crear una función que realice una serie de solicitudes de datos y las procese secuencialmente.

function procesarDatos() {
    return fetch("https://api.example.com/data")
        .then((response) => response.json())
        .then((data) => {
            console.log("Datos iniciales:", data);
            return fetch("https://api.example.com/detalles");
        })
        .then((response) => response.json())
        .then((detalles) => console.log("Detalles adicionales:", detalles))
        .catch((error) => console.error("Error en el laboratorio:", error));
}

// Laboratorio Adicional Resuelto
// Solución al laboratorio, mostrando cómo encadenar operaciones y manejar errores en cada paso.

procesarDatos()
    .then(() => console.log("Laboratorio completado con éxito"))
    .catch((error) => console.error("Error en el laboratorio:", error));

// Resumen de conceptos avanzados abordados en la clase:
// 1. Uso de promesas y su encadenamiento para manejar operaciones asíncronas.
// 2. Problemas de callbacks anidados y cómo resolverlos usando promesas.
// 3. Operaciones en Pipeline para un flujo de trabajo continuo.
// 4. Uso de Fetch API para hacer solicitudes HTTP y su encadenamiento para múltiples operaciones.
// 5. Comparación entre Fetch y XHR en la realización de solicitudes asíncronas.
