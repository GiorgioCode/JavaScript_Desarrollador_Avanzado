import { sumar, restar, multiplicar, dividir } from "./matematicas.js";

// Ejemplos de uso
console.log("Suma: " + sumar(5, 3)); // salida: 8
console.log("Resta: " + restar(10, 4)); // salida: 6
console.log("Multiplicación: " + multiplicar(6, 2)); // Output: 12
console.log("División: " + dividir(15, 3)); // salida: 5

// También puedes importar todo el módulo con un alias
import * as matematicas from "./matematicas.js";

console.log(matematicas.sumar(10, 5)); // salida: 15
console.log(matematicas.multiplicar(3, 4)); // salida: 12
