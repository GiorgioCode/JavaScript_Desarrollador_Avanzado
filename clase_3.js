// 1. Introducción a Formularios
// Los formularios HTML permiten a los usuarios enviar datos al servidor.
// A través de diversos elementos como input, select y button, los formularios capturan datos de usuario.
// Ejemplo de formulario en HTML:
// <form id="miFormulario">
//     <input type="text" name="nombre" placeholder="Nombre" required>
//     <button type="submit">Enviar</button>
// </form>

// 2. El evento Submit
// El evento `submit` se dispara cuando se envía el formulario.
// Podemos usar `preventDefault()` para evitar que el formulario se envíe y manejar los datos en JavaScript.

const formulario = document.getElementById("miFormulario");
formulario.addEventListener("submit", (event) => {
    event.preventDefault(); // Previene el envío por defecto
    console.log("Formulario enviado, pero no se ha recargado la página");
    // Aquí puedes capturar y manejar los datos ingresados por el usuario
});

// 3. Introducción a la API Web HTMLElement
// HTMLElement es la clase base de todos los elementos HTML, que proporciona propiedades y métodos comunes.
// Permite manipular la apariencia y el comportamiento de los elementos HTML en la página.

const boton = document.querySelector("button");
boton.style.backgroundColor = "blue"; // Cambia el color del botón usando la propiedad `style`
boton.classList.add("activo"); // Agrega una clase al botón, cambiando su estilo en CSS

// 4. Validación de Formularios
// HTML5 proporciona validación de formularios usando atributos como `required`, `minlength`, `maxlength`, `pattern`
// Esto permite validar datos sin escribir mucho código JavaScript.

const inputNombre = formulario.elements["nombre"];
inputNombre.addEventListener("input", () => {
    if (!inputNombre.checkValidity()) {
        console.log(
            "Error: El nombre no es válido según las reglas del formulario"
        );
    }
});

// 5. Validación customizada
// Podemos añadir validación personalizada usando el evento `input` y métodos JavaScript como `setCustomValidity`

inputNombre.addEventListener("input", () => {
    if (inputNombre.value.length < 3) {
        inputNombre.setCustomValidity(
            "El nombre debe tener al menos 3 caracteres"
        );
    } else {
        inputNombre.setCustomValidity(""); // Reinicia el mensaje de error si es válido
    }
});

// 6. Funciones útiles de validación
// Algunas funciones para validar formularios son `checkValidity` (verifica todos los campos) y `reportValidity` (muestra errores)
// Estas funciones ayudan a centralizar la lógica de validación.

if (formulario.checkValidity()) {
    console.log("Formulario válido");
} else {
    formulario.reportValidity(); // Muestra mensajes de error de cada campo
}

// 7. Manipulación del DOM en Formularios
// Los elementos del formulario se pueden manipular fácilmente con JavaScript para ajustar la interfaz según las entradas del usuario

inputNombre.addEventListener("input", () => {
    if (inputNombre.value.includes("Admin")) {
        formulario.style.backgroundColor = "lightyellow"; // Cambia el color del fondo si el nombre incluye "Admin"
    }
});

// 8. Introducción a Expresiones Regulares
// Las expresiones regulares permiten buscar y manipular texto de forma avanzada.
// En JavaScript, se crean usando `/expresión/` o `new RegExp("expresión")`

const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
console.log(regexCorreo.test("ejemplo@correo.com")); // true si el correo es válido

// 9. Caracteres especiales
// Los caracteres especiales en regex incluyen: `.` para cualquier carácter, `\d` para dígitos, y `\s` para espacios

const regexDigito = /\d/; // Coincide con cualquier dígito
console.log(regexDigito.test("123")); // true, ya que hay dígitos

// 10. Caracteres de cantidad
// Los cuantificadores en regex definen la cantidad de veces que debe aparecer un carácter: `+`, `*`, `{min, max}`

const regexTresLetras = /^[a-zA-Z]{3}$/; // Coincide con exactamente tres letras
console.log(regexTresLetras.test("abc")); // true

// 11. Caracteres de posición
// Los caracteres de posición ayudan a especificar dónde debe aparecer un patrón en el texto: `^` para inicio y `$` para el final

const regexEmpiezaConA = /^A/; // Coincide con texto que empieza con "A"
console.log(regexEmpiezaConA.test("Apple")); // true

// 12. Aplicación de una Expresión Regular
// Aplicamos una regex para validar un número de teléfono en un formulario de contacto
const regexTelefono = /^\d{3}-\d{3}-\d{4}$/; // Formato: 123-456-7890
console.log(regexTelefono.test("123-456-7890")); // true

// 13. Laboratorio adicional (ejercicio)
// Crear una función que valide un código postal con regex, usando el formato de cinco dígitos

function validarCodigoPostal(codigo) {
    const regexCodigoPostal = /^\d{5}$/;
    return regexCodigoPostal.test(codigo);
}
console.log(validarCodigoPostal("12345")); // true

// 14. Laboratorio adicional resuelto
// Agrega una función que también permita códigos postales de 5 dígitos con un guion y 4 dígitos adicionales (e.g., 12345-6789)

function validarCodigoPostalExtendido(codigo) {
    const regexCodigoPostalExtendido = /^\d{5}(-\d{4})?$/;
    return regexCodigoPostalExtendido.test(codigo);
}
console.log(validarCodigoPostalExtendido("12345-6789")); // true

// 15. HTTP - ¿Qué es?
// HTTP es un protocolo que permite la comunicación entre cliente y servidor.
// Define cómo el navegador solicita y recibe recursos de un servidor web.

// 16. Introducción a HTTP
// En HTTP, el cliente envía una solicitud y el servidor responde con datos.
// Cada solicitud HTTP contiene una URL, método (GET, POST, etc.), encabezados y, a veces, un cuerpo (datos).

// 17. Qué es HTTP?
// HTTP es un protocolo sin estado, lo que significa que cada solicitud es independiente y no guarda información de solicitudes anteriores.

// 18. Qué es un Header
// Los Headers en HTTP son metadatos que acompañan las solicitudes y respuestas, proporcionando información sobre el contenido y el cliente

// Ejemplo de headers comunes: Content-Type, Authorization, User-Agent
// Content-Type: define el tipo de datos en el cuerpo de la solicitud (e.g., "application/json")

// 19. JavaScript Asincrónico
// JavaScript asincrónico permite ejecutar código sin bloquear el flujo principal.
// Las funciones asincrónicas como `setTimeout`, `setInterval` y las Promesas (`fetch`) permiten trabajar con código que requiere tiempo de espera.

setTimeout(() => {
    console.log("Este mensaje aparece después de 2 segundos");
}, 2000); // Ejecuta la función después de 2 segundos

// Uso de fetch para realizar una solicitud HTTP GET
fetch("https://api.ejemplo.com/datos")
    .then((respuesta) => respuesta.json()) // Convierte la respuesta a JSON
    .then((datos) => console.log(datos)) // Muestra los datos en consola
    .catch((error) => console.error("Error:", error)); // Maneja cualquier error en la solicitud

// async/await es una forma moderna y más legible para manejar código asincrónico
async function obtenerDatos() {
    try {
        const respuesta = await fetch("https://api.ejemplo.com/datos");
        const datos = await respuesta.json();
        console.log(datos); // Muestra los datos obtenidos
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}
obtenerDatos(); // Llama a la función async para obtener datos
