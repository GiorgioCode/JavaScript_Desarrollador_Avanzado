// 1. Tipos Primitivos
// JavaScript incluye varios tipos de datos primitivos: string, number, boolean, null, undefined, bigint y symbol
let texto = "Hola, mundo"; // Tipo string: representa texto
let numero = 42; // Tipo number: número entero o decimal
let booleano = true; // Tipo boolean: verdadero o falso
let nulo = null; // Tipo null: representa la ausencia intencionada de un valor
let indefinido; // Tipo undefined: variable declarada sin valor asignado
let granNumero = BigInt(123456789012345678901234567890); // Tipo bigint: números enteros grandes
let simbolo = Symbol("unico"); // Tipo symbol: representa un valor único e inmutable

// Ejemplo de coerción de tipos: conversión automática entre tipos
console.log("5" + 3); // "53" - el número se convierte en string y se concatena
console.log("5" - 3); // 2 - el string se convierte en número y se resta

// Uso de typeof para ver el tipo de dato de cada variable
console.log(typeof texto); // "string"
console.log(typeof numero); // "number"
console.log(typeof booleano); // "boolean"
console.log(typeof nulo); // "object" - peculiaridad de JavaScript, null se considera un "objeto"
console.log(typeof indefinido); // "undefined"

// Diferencia entre == y ===
// == compara el valor, permitiendo conversión de tipos
console.log(5 == "5"); // true
// === compara el valor y el tipo, sin conversión (se respeta el tipo de dato)
console.log(5 === "5"); // false

// 2. Introducción a Constructores Variables
// Podemos usar el constructor de tipos para crear variables, aunque se prefiere la declaración directa
let numeroConstructor = Number(42); // Crea un número usando el constructor Number
let textoConstructor = String("Hola"); // Crea un string usando el constructor String

// Los constructores crean instancias de objeto, no primitivas
let numeroLiteral = 10; // Literal primitivo
let numeroObjeto = new Number(10); // Objeto de tipo número
console.log(typeof numeroLiteral); // "number"
console.log(typeof numeroObjeto); // "object"

// Comparación de objetos creados con constructores
console.log(numeroObjeto == 10); // true - comparación de valor
console.log(numeroObjeto === 10); // false - diferente tipo (objeto vs primitivo)

// 3. Variables Globales y Locales
// Las variables globales son accesibles desde cualquier parte del código, mientras que las locales solo desde su ámbito
var variableGlobal = "Soy global"; // var crea una variable global si se declara fuera de una función
function mostrarVariables() {
    let variableLocal = "Soy local"; // let crea una variable local en un bloque o función
    console.log(variableGlobal); // Accediendo a la variable global
    console.log(variableLocal); // Accediendo a la variable local
}
// console.log(variableLocal); // Error: no se puede acceder a variableLocal fuera de la función

// Problema con variables globales: cualquier parte del código puede cambiar el valor de una variable global
// Esto puede causar errores difíciles de encontrar.

// 4. Funciones Lambda
// Las funciones lambda o funciones flecha proporcionan una sintaxis más corta y reducida. son una evolucion de las funciones anonimas
// sobre todo, cuando ocupan una sola linea de codigo. ademas, en una sola linea, tienen el retorno implicito.
const suma = (a, b) => a + b; // Función flecha que suma dos números
console.log(suma(5, 3)); // Salida: 8

// Las funciones flecha tienen una particularidad: no crean su propio contexto de `this`, sino que heredan el contexto de la función exterior
function pruebaThis() {
    this.nombre = "Prueba";
    const mostrarNombre = () => console.log(this.nombre); // this en la función flecha es el mismo que en `pruebaThis`
    mostrarNombre();
}
pruebaThis(); // Salida: "Prueba"

// 5. Variables y Tipos de Datos
// JavaScript es dinámicamente tipado; el tipo de una variable puede cambiar
let cualquierVariable = 100; // Empieza como un número
cualquierVariable = "Ahora soy un string"; // Ahora es un string
console.log(typeof cualquierVariable); // typeof muestra el tipo de dato actual

// Variables `let`, `const`, y `var`
// var tiene un alcance de función y puede ser redefinido, mientras que let y const tienen alcance de bloque
if (true) {
    var x = "soy var";
    let y = "soy let";
}
console.log(x); // Funciona, x es accesible
// console.log(y); // Error: y no está definida

// 6. Objetos
// Los objetos en JavaScript se usan para almacenar colecciones de datos clave-valor
const libro = {
    titulo: "JavaScript Avanzado",
    autor: "Jane Doe",
    paginas: 350,
    mostrarInfo() {
        console.log(`${this.titulo} escrito por ${this.autor}`);
    },
};
libro.mostrarInfo(); // Llamamos al método para mostrar información del libro

// Los objetos son dinámicos: se pueden agregar o eliminar propiedades en tiempo de ejecución
libro.editorial = "Editorial XYZ"; // Agrega una propiedad
console.log(libro.editorial); // Salida: "Editorial XYZ"
delete libro.paginas; // Elimina una propiedad
console.log(libro.paginas); // undefined

// 7. BOM (Browser Object Model)
// El BOM permite acceder y manipular el navegador y sus componentes, como el historial, ubicación y pantalla
console.log(window.location.href); // Muestra la URL actual
console.log(window.history.length); // Muestra la cantidad de páginas en el historial

// Podemos manipular la URL o incluso redirigir al usuario
// window.location.href = "https://www.ejemplo.com"; // Descomentar para probar redirección

// 8. Introducción al Objeto Global window (BOM)
// El objeto `window` representa la ventana del navegador y es el objeto global en el contexto del navegador
window.alert("Hola desde el objeto window"); // Muestra un mensaje de alerta
console.log(window.innerWidth); // Muestra el ancho de la ventana en píxeles
console.log(window.navigator.userAgent); // Muestra información del navegador

// 9. Introducción a la API Web DOM
// El DOM (Document Object Model) permite manipular la estructura HTML de una página
// Podemos seleccionar elementos y manipularlos
const titulo = document.querySelector("h1"); // Selecciona el primer elemento <h1>
titulo.textContent = "Bienvenido a JavaScript Avanzado"; // Cambia el texto del elemento
titulo.style.color = "blue"; // Cambia el color del texto

// Acceso a hijos, padres y hermanos de elementos
const primerElemento = document.body.firstChild; // Primer hijo de <body>
console.log(primerElemento); // Muestra el primer nodo hijo

// Crear y agregar un nuevo elemento
const nuevoParrafo = document.createElement("p"); // Crear un elemento <p>
nuevoParrafo.textContent = "Este es un nuevo párrafo creado con DOM"; // Agregar contenido
document.body.appendChild(nuevoParrafo); // Agregar el párrafo al final de <body>
