// Introducción al DOM
// El DOM (Document Object Model) es una interfaz que representa la estructura HTML de una página web como un árbol de nodos
// Cada elemento HTML es un nodo en este árbol, lo que permite acceder, manipular y crear contenido dinámicamente

// 1. Accediendo a Elementos del DOM
// Podemos seleccionar elementos del DOM usando varios métodos como querySelector, getElementById, getElementsByClassName, etc.

const titulo = document.getElementById("titulo"); // Selecciona un elemento por su ID
const parrafos = document.getElementsByClassName("parrafo"); // Selecciona todos los elementos con la clase "parrafo"
const primerParrafo = document.querySelector("p"); // Selecciona el primer <p> en el documento
const todosLosParrafos = document.querySelectorAll("p"); // Selecciona todos los <p> en el documento

// Diferencia entre querySelector y querySelectorAll
// querySelector selecciona el primer elemento que coincide, mientras que querySelectorAll devuelve todos los elementos coincidentes

// 2. Manipulación del DOM
// Una vez seleccionados, podemos manipular los elementos cambiando su contenido, estilo y atributos

titulo.textContent = "Nuevo Título"; // Cambia el texto de un elemento
titulo.style.color = "blue"; // Cambia el color de texto a azul
titulo.setAttribute("data-personalizado", "valor"); // Agrega un atributo personalizado

// Creación y agregación de nuevos elementos
const nuevoElemento = document.createElement("div"); // Crea un nuevo elemento <div>
nuevoElemento.textContent = "Este es un nuevo elemento"; // Establece su contenido
document.body.appendChild(nuevoElemento); // Agrega el elemento al final de <body>

// Eliminación de elementos
nuevoElemento.remove(); // Elimina el elemento del DOM

// 3. Aplicación Avanzada del DOM
// Podemos manipular varios aspectos del DOM a la vez para crear contenido dinámico, como listas generadas a partir de datos
const lista = document.createElement("ul"); // Creamos una lista no ordenada
const items = ["Elemento 1", "Elemento 2", "Elemento 3"];
items.forEach((texto) => {
    const item = document.createElement("li");
    item.textContent = texto;
    lista.appendChild(item);
});
document.body.appendChild(lista); // Agrega la lista completa al <body>

// Eventos - ¿Cómo entenderlos?
// Los eventos en JavaScript son acciones que ocurren en la página, como clics, teclas presionadas, o movimientos del ratón
// Cada evento puede ser escuchado y manejado para ejecutar funciones específicas

// 4. Eventos - Ejemplo básico de evento click
const boton = document.querySelector("button");
boton.addEventListener("click", () => {
    alert("Botón clicado!");
});

// 5. ¿Qué es un Callback?
// Un callback es una función que se pasa como argumento a otra función, para que se ejecute luego de que ocurra un evento o acción específica

function saludar(nombre) {
    console.log(`Hola, ${nombre}`);
}
function ejecutarConNombre(callback) {
    const nombre = "Estudiante";
    callback(nombre); // Ejecuta el callback con el argumento nombre
}
ejecutarConNombre(saludar); // Pasa la función `saludar` como callback

// 6. Eventos en HTML y el DOM
// Podemos agregar eventos directamente en el HTML con "onclick", aunque se recomienda usar JavaScript para separar el contenido del comportamiento
// <button onclick="alert('Botón clicado desde HTML!')">Clic aquí</button>

// 7. ApiEventTarget - Introducción a EventTarget
// El EventTarget es una interfaz implementada por todos los objetos que pueden manejar eventos en JavaScript
// Permite añadir y eliminar "event listeners" o escuchadores de eventos

const parrafoEjemplo = document.querySelector("p");
parrafoEjemplo.addEventListener("mouseover", () => {
    parrafoEjemplo.style.backgroundColor = "yellow"; // Cambia el fondo al pasar el mouse
});
parrafoEjemplo.removeEventListener("mouseover", () => {
    parrafoEjemplo.style.backgroundColor = ""; // Remueve el evento
});

// 8. El objeto Event
// El objeto Event contiene información sobre el evento que ocurrió y permite interactuar con él
boton.addEventListener("click", (event) => {
    console.log(event.type); // Muestra el tipo de evento (e.g., "click")
    console.log(event.target); // Muestra el elemento que disparó el evento
});

// 9. Introducción a la Propagación de Eventos
// La propagación de eventos describe cómo los eventos viajan desde el nodo más interno al más externo (bubbling) o viceversa (capturing)

document.body.addEventListener(
    "click",
    () => {
        console.log("Click en <body>");
    },
    true
); // Capturing - evento capturado primero en el <body>

document.getElementById("divInterno").addEventListener(
    "click",
    () => {
        console.log("Click en <divInterno>");
    },
    false
); // Bubbling - evento manejado después en <divInterno>

// 10. Aplicación Avanzada de Propagación de Eventos
// Podemos detener la propagación de eventos con event.stopPropagation(), útil cuando no queremos que el evento alcance otros elementos

document
    .getElementById("elementoInterno")
    .addEventListener("click", (event) => {
        event.stopPropagation(); // Detiene la propagación, solo se ejecuta este listener
        console.log("Evento solo en elementoInterno");
    });

// 11. Eventos con Comportamiento Automático
// Algunos eventos, como el clic en un enlace, tienen un comportamiento automático (redireccionar). Podemos prevenir ese comportamiento

const enlace = document.querySelector("a");
enlace.addEventListener("click", (event) => {
    event.preventDefault(); // Previene la redirección
    console.log("Redirección prevenido");
});

// 12. Manipulación del DOM en un evento de BOM
// Los eventos del BOM (Browser Object Model) permiten manipular la ventana y otros aspectos del navegador

window.addEventListener("resize", () => {
    console.log("La ventana ha sido redimensionada");
    document.body.style.backgroundColor =
        window.innerWidth > 800 ? "lightblue" : "lightcoral";
});
