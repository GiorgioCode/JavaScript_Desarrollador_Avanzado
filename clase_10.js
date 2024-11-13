// Trabajo con Clases en JavaScript
// Las clases en JavaScript permiten crear estructuras para representar objetos y gestionar herencia y métodos.
// Las clases facilitan el trabajo con objetos y encapsulan datos y funcionalidad.

// Clases en JavaScript
// En ES6, `class` fue introducido para simplificar la creación de objetos.

class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
    }
}

const persona = new Persona("Ana", 30);
persona.saludar(); // "Hola, soy Ana y tengo 30 años."

// IIFE (Immediately Invoked Function Expression)
// Una IIFE es una función que se ejecuta inmediatamente después de ser definida.
// Se usa para crear un contexto privado y evitar conflictos de nombres.

(function () {
    const mensajePrivado = "Este mensaje es privado";
    console.log(mensajePrivado); // "Este mensaje es privado"
})();

// `mensajePrivado` no está accesible fuera de la IIFE:
// console.log(mensajePrivado); // Error: mensajePrivado no está definido

// Modo Estricto
// 'use strict' activa el modo estricto de JavaScript, que previene ciertos errores y hace el código más seguro.
// En modo estricto, debemos declarar variables antes de usarlas y no podemos usar palabras reservadas como nombres de variables.

("use strict");

function ejemploEstricto() {
    let mensaje = "Este código usa modo estricto";
    console.log(mensaje);
}

// Patrones e Iteradores
// Existen varios patrones de diseño que ayudan a organizar el código y resolver problemas comunes.

// Proxy
// El objeto `Proxy` permite interceptar y redefinir operaciones fundamentales de un objeto (como acceso a propiedades).
// Útil para validar o modificar el comportamiento de un objeto.

const objetoOriginal = {
    nombre: "Objeto Original",
};

const proxy = new Proxy(objetoOriginal, {
    get(target, propiedad) {
        console.log(`Accediendo a la propiedad: ${propiedad}`);
        return target[propiedad];
    },
    set(target, propiedad, valor) {
        console.log(`Modificando ${propiedad} a ${valor}`);
        target[propiedad] = valor;
    },
});

proxy.nombre; // Log: "Accediendo a la propiedad: nombre"
proxy.nombre = "Nuevo Nombre"; // Log: "Modificando nombre a Nuevo Nombre"

// Implementación Práctica de Módulos
// Los módulos permiten dividir el código en partes independientes y reutilizables, mejorando la organización.
// En JavaScript moderno, `export` y `import` permiten usar módulos, aunque también existen patrones para crear módulos sin módulos nativos.

// Patrón Revelador
// Este patrón expone solo ciertas funciones y propiedades, manteniendo otras privadas.

const moduloRevelador = (function () {
    let mensajePrivado = "Mensaje privado";
    function mostrarMensajePrivado() {
        console.log(mensajePrivado);
    }
    return {
        mostrarMensaje: mostrarMensajePrivado,
    };
})();

moduloRevelador.mostrarMensaje(); // "Mensaje privado"

// Patrón Singleton
// El Singleton asegura que una clase solo tenga una instancia en toda la aplicación.

const Singleton = (function () {
    let instancia;
    function crearInstancia() {
        const objeto = new Object("Soy una instancia única");
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
console.log(instancia1 === instancia2); // true, ambas son la misma instancia

// Implementación Práctica de Singleton
// Singleton es útil para clases como gestores de base de datos, donde solo se necesita una instancia.

class GestorBD {
    constructor() {
        if (GestorBD.instancia) {
            return GestorBD.instancia;
        }
        this.conexion = "Conexión a la base de datos";
        GestorBD.instancia = this;
    }
}

const gestor1 = new GestorBD();
const gestor2 = new GestorBD();
console.log(gestor1 === gestor2); // true

// Introducción y Problema del Patrón de Publicación y Suscripción
// Este patrón permite a un objeto suscribirse a eventos de otros, permitiendo comunicación entre objetos sin dependencia directa.

const PubSub = {
    eventos: {},
    suscribir: function (evento, listener) {
        if (!this.eventos[evento]) {
            this.eventos[evento] = [];
        }
        this.eventos[evento].push(listener);
    },
    publicar: function (evento, data) {
        if (!this.eventos[evento] || this.eventos[evento].length === 0) return;
        this.eventos[evento].forEach((listener) => listener(data));
    },
};

// Ejemplo de uso del Patrón de Publicación/Suscripción
PubSub.suscribir("eventoTest", (data) => console.log(`Recibido: ${data}`));
PubSub.publicar("eventoTest", "¡Hola desde el evento!"); // Log: "Recibido: ¡Hola desde el evento!"

// Iteradores y Generadores
// Los iteradores permiten recorrer colecciones de datos secuencialmente. Los generadores son funciones especiales
// que pueden detener su ejecución y luego reanudarla, facilitando el trabajo con grandes volúmenes de datos o cálculos asíncronos.

const iterador = {
    actual: 0,
    final: 5,
    next() {
        if (this.actual < this.final) {
            return { value: this.actual++, done: false };
        } else {
            return { done: true };
        }
    },
};

let resultado = iterador.next();
while (!resultado.done) {
    console.log(resultado.value); // 0, 1, 2, 3, 4
    resultado = iterador.next();
}

// Generadores en JavaScript
// Un generador es una función que produce múltiples valores a lo largo del tiempo.

function* generador() {
    yield 1;
    yield 2;
    yield 3;
}

const iteradorGenerador = generador();
console.log(iteradorGenerador.next().value); // 1
console.log(iteradorGenerador.next().value); // 2
console.log(iteradorGenerador.next().value); // 3

// Uso avanzado de generadores para cálculos secuenciales
function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    while (curr <= limit) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

for (const numero of fibonacci(21)) {
    console.log(numero); // 1, 1, 2, 3, 5, 8, 13, 21
}

// Resumen de conceptos avanzados cubiertos en esta clase:
// 1. Clases en JavaScript y encapsulación de datos.
// 2. Uso de IIFE para crear ámbitos privados.
// 3. Modo Estricto (`'use strict'`) y sus ventajas.
// 4. Implementación de patrones de diseño (Revelador, Singleton, Proxy) y sus aplicaciones.
// 5. Patrón de Publicación/Suscripción para comunicación entre componentes.
// 6. Iteradores y generadores para gestionar secuencias y cálculos de forma más eficiente.
// 7. Ejemplos prácticos de implementación de patrones y conceptos avanzados.
