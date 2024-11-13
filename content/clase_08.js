// Paradigmas de Programación en JavaScript
// Un paradigma es un enfoque o estilo de programación. JavaScript es multiparadigma, permitiendo programar de manera imperativa, funcional y orientada a objetos.
// Cada paradigma tiene sus propias reglas y formas de estructurar el código.

// Definiciones: Paradigmas
// - Programación Imperativa: Se enfoca en "cómo" se hace algo, detallando cada paso.
// - Programación Declarativa: Se enfoca en "qué" se quiere lograr, sin definir cada paso.
// - Programación Funcional: Se basa en funciones puras sin efectos colaterales.
// - Programación Orientada a Objetos (POO): Organiza el código en objetos que representan "cosas" con propiedades y métodos.

// Construcción de un Prototipo
// JavaScript utiliza prototipos para la herencia y la extensión de objetos.
// Cada función en JavaScript tiene un prototipo, que es una estructura de datos donde podemos definir métodos y propiedades compartidos.

function Vehiculo(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
}

Vehiculo.prototype.arrancar = function () {
    console.log(`${this.marca} ${this.modelo} está arrancando.`);
};

// Crear una instancia del prototipo Vehiculo
const auto = new Vehiculo("Toyota", "Corolla");
auto.arrancar(); // "Toyota Corolla está arrancando."

// Configuración avanzada de propiedades de un objeto
// Además de los métodos y propiedades básicos, podemos definir propiedades avanzadas usando `Object.defineProperty`.

Object.defineProperty(auto, "año", {
    value: 2023,
    writable: false, // No permite modificar el valor
    enumerable: true, // Permite que se muestre en bucles
    configurable: false, // Evita que se pueda borrar la propiedad
});

console.log(auto.año); // 2023
// auto.año = 2024; // Error: no se puede modificar una propiedad no writable

// Patrones: Estratégico y Táctico
// Los patrones de diseño ayudan a resolver problemas comunes en el desarrollo de software, optimizando la reutilización y mantenibilidad del código.

// Nivel Estratégico
// Ejemplo de un patrón estratégico como el Singleton, usado para asegurar que sólo haya una instancia de una clase.

const Singleton = (function () {
    let instancia;

    function crearInstancia() {
        const objeto = new Object("Soy la única instancia");
        return objeto;
    }

    return {
        obtenerInstancia: function () {
            if (!instancia) {
                instancia = crearInstancia();
            }
            return instancia;
        },
    };
})();

const instancia1 = Singleton.obtenerInstancia();
const instancia2 = Singleton.obtenerInstancia();
console.log(instancia1 === instancia2); // true: ambas variables apuntan a la misma instancia

// Introducción a funciones constructoras
// Las funciones constructoras actúan como plantillas para crear objetos.

function Persona(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
}

const persona1 = new Persona("Ana", 25);
console.log(persona1.nombre); // "Ana"

// Introducción al constructor `new`
// `new` permite crear instancias de una función constructora, inicializando un nuevo objeto y vinculando el `this` al nuevo objeto.

// Nivel Táctico
// Un ejemplo de un patrón táctico es el Patrón Estrategia, que permite definir una familia de algoritmos y hacerlos intercambiables.

class Orden {
    constructor(estrategia) {
        this.estrategia = estrategia;
    }

    calcularTotal(cantidad) {
        return this.estrategia.calcular(cantidad);
    }
}

class EstrategiaDescuento {
    calcular(cantidad) {
        return cantidad * 0.9;
    }
}

class EstrategiaImpuesto {
    calcular(cantidad) {
        return cantidad * 1.1;
    }
}

const ordenConDescuento = new Orden(new EstrategiaDescuento());
console.log(ordenConDescuento.calcularTotal(100)); // 90

const ordenConImpuesto = new Orden(new EstrategiaImpuesto());
console.log(ordenConImpuesto.calcularTotal(100)); // 110

// Funciones en JavaScript
// En JavaScript, una función es un bloque de código diseñado para realizar una tarea específica.

function saludar(nombre) {
    return `Hola, ${nombre}!`;
}

console.log(saludar("Carlos")); // "Hola, Carlos!"

// El ámbito (scope) de una función
// El ámbito es el contexto en el cual las variables están disponibles para su uso. Las variables definidas dentro de una función no son accesibles desde fuera de la misma.

function ejemploScope() {
    let mensaje = "Esto está en el ámbito de ejemploScope.";
    console.log(mensaje);
}

// console.log(mensaje); // Error: mensaje no está definida en este ámbito

// El contexto de una función (this)
// `this` se refiere al contexto actual en el que se ejecuta una función.
// Dentro de un objeto, `this` hace referencia al objeto en sí, mientras que en una función global apunta al objeto global.

const objetoConThis = {
    nombre: "Objeto",
    mostrarThis: function () {
        console.log(this); // Aquí, `this` apunta al objeto `objetoConThis`
    },
};

objetoConThis.mostrarThis();

// Ejemplo de cambio de contexto usando `bind`
function mostrarNombre() {
    console.log(this.nombre);
}

const persona = {
    nombre: "Luis",
};

const mostrarNombreConBind = mostrarNombre.bind(persona);
mostrarNombreConBind(); // "Luis"

// Resumen de conceptos avanzados abordados en la clase:
// 1. Introducción a los paradigmas de programación y cómo aplicarlos en JavaScript.
// 2. Creación y configuración de prototipos y propiedades avanzadas en objetos.
// 3. Implementación de patrones de diseño estratégico y táctico.
// 4. Uso y comprensión de funciones, incluyendo ámbito y contexto (`this`) en JavaScript.
// 5. Ejemplos de patrones de diseño estratégico (Singleton) y táctico (Estrategia) para un diseño estructurado.

// Laboratorio adicional: Implementación de un objeto con propiedades avanzadas y patrones de diseño
// Crea una clase `Usuario` que use el patrón Singleton y que tenga un método `iniciarSesion` que permita iniciar sesión con un nombre de usuario único.
