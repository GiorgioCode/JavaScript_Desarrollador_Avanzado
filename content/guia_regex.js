// ============ CONCEPTOS BÁSICOS DE REGEX ============

// Creación de una regex
const regex1 = /patron/; // Usando literales
const regex2 = new RegExp("patron"); // Usando constructor

// ============ CARACTERES ESPECIALES ============

// ^ - Inicio de línea
const iniciaConHola = /^hola/; // Coincide con strings que empiezan con "hola"
console.log(iniciaConHola.test("hola mundo")); // true
console.log(iniciaConHola.test("digo hola")); // false

// $ - Fin de línea
const terminaEnPunto = /\.$/; // Coincide con strings que terminan en punto
console.log(terminaEnPunto.test("fin.")); // true
console.log(terminaEnPunto.test(".inicio")); // false

// \d - Cualquier dígito (equivalente a [0-9])
const tieneNumero = /\d/; // Coincide si hay al menos un número
console.log(tieneNumero.test("abc123")); // true
console.log(tieneNumero.test("abc")); // false

// \w - Cualquier caracter de palabra (letras, números y _)
const caracterPalabra = /\w/; // Coincide con [A-Za-z0-9_]
console.log(caracterPalabra.test("a")); // true
console.log(caracterPalabra.test("!")); // false

// ============ CUANTIFICADORES ============

// * - Cero o más veces
const ceroOMasA = /a*/; // Coincide con "", "a", "aa", "aaa", etc.
console.log(ceroOMasA.test("")); // true
console.log(ceroOMasA.test("aaa")); // true

// + - Una o más veces
const unaOMasA = /a+/; // Coincide con "a", "aa", "aaa", etc.
console.log(unaOMasA.test("")); // false
console.log(unaOMasA.test("aaa")); // true

// ? - Cero o una vez
const opcional = /colou?r/; // Coincide con "color" o "colour"
console.log(opcional.test("color")); // true
console.log(opcional.test("colour")); // true

// {n} - Exactamente n veces
const tresDigitos = /\d{3}/; // Coincide con exactamente 3 dígitos
console.log(tresDigitos.test("123")); // true
console.log(tresDigitos.test("12")); // false

// ============ GRUPOS Y RANGOS ============

// [] - Conjunto de caracteres
const vocales = /[aeiou]/; // Coincide con cualquier vocal
console.log(vocales.test("hello")); // true

// () - Grupos de captura
const telefono = /(\d{3})-(\d{3})-(\d{4})/; // Formato: 123-456-7890
console.log(telefono.test("123-456-7890")); // true

// ============ EJEMPLOS PRÁCTICOS ============

// Validación de email básica
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
console.log(emailRegex.test("usuario@dominio.com")); // true
console.log(emailRegex.test("invalido@.com")); // false

// Validación de contraseña
// Al menos 8 caracteres, una mayúscula, una minúscula y un número
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
console.log(passwordRegex.test("Password123")); // true
console.log(passwordRegex.test("debil")); // false

// ============ MÉTODOS ÚTILES ============

const texto = "Mi número es 123-456-7890";

// test() - Verifica si hay coincidencia
console.log(/\d{3}-\d{3}-\d{4}/.test(texto)); // true

// match() - Encuentra coincidencias
console.log(texto.match(/\d{3}-\d{3}-\d{4}/)); // ["123-456-7890"]

// replace() - Reemplaza coincidencias
console.log(texto.replace(/\d{3}-\d{3}-\d{4}/, "NÚMERO")); // "Mi número es NÚMERO"
