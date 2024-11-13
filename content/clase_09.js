// Modelo Clásico en JavaScript
// En lenguajes de programación clásicos (como Java o C++), los objetos se crean mediante clases.
// JavaScript, sin embargo, usa prototipos para heredar propiedades y métodos, aunque simula el modelo clásico usando clases.

// Prototipos en JavaScript
// Cada objeto en JavaScript tiene un prototipo, que es otro objeto del cual hereda propiedades y métodos.
// El `prototype` de un objeto permite compartir propiedades entre instancias.

function Animal(tipo) {
    this.tipo = tipo; // Propiedad de instancia
}

// Agregamos un método al prototipo de Animal para que sea compartido entre todas las instancias
Animal.prototype.hablar = function () {
    console.log(`El ${this.tipo} está haciendo un sonido.`);
};

// Creando una instancia de Animal
const perro = new Animal("perro");
perro.hablar(); // "El perro está haciendo un sonido."

// Objeto constructor `prototype`
// Cada función en JavaScript tiene una propiedad `prototype`, que se usa para definir métodos y propiedades
// compartidos por todas las instancias creadas con el constructor.

function Persona(nombre) {
    this.nombre = nombre; // Propiedad de instancia
}

Persona.prototype.saludar = function () {
    console.log(`Hola, soy ${this.nombre}`);
};

// Creando dos instancias
const persona1 = new Persona("Ana");
const persona2 = new Persona("Luis");

persona1.saludar(); // "Hola, soy Ana"
persona2.saludar(); // "Hola, soy Luis"

// Propiedades de instancia vs. propiedades de prototipo
// Las propiedades de instancia están definidas dentro de la función constructora usando `this`.
// Las propiedades del prototipo están definidas en el prototipo y compartidas entre todas las instancias.

console.log(persona1.hasOwnProperty("nombre")); // true, es una propiedad de instancia
console.log(persona1.hasOwnProperty("saludar")); // false, `saludar` está en el prototipo

// Herencia en JavaScript
// La herencia permite a un objeto "heredar" propiedades y métodos de otro objeto.
// En JavaScript, podemos implementar herencia usando el prototipo.

function Mamifero(tipo, sonido) {
    this.tipo = tipo;
    this.sonido = sonido;
}

Mamifero.prototype.hacerSonido = function () {
    console.log(`${this.tipo} hace ${this.sonido}`);
};

// Subclase
function Perro(nombre) {
    Mamifero.call(this, "perro", "guau"); // Llama al constructor de Mamifero
    this.nombre = nombre;
}

// Conectamos el prototipo de Perro con Mamifero
Perro.prototype = Object.create(Mamifero.prototype);
Perro.prototype.constructor = Perro;

Perro.prototype.ladrar = function () {
    console.log(`${this.nombre} está ladrando!`);
};

const miPerro = new Perro("Rex");
miPerro.hacerSonido(); // "perro hace guau"
miPerro.ladrar(); // "Rex está ladrando!"

// Composición de clases
// En lugar de herencia, JavaScript permite composición, una técnica en la que se combinan objetos para obtener funcionalidad.
// Esto es útil para evitar dependencias fuertes entre clases y mejorar la flexibilidad.

function Movilidad() {
    this.mover = function () {
        console.log("Moviéndose");
    };
}

function EmisionSonidos() {
    this.emitirSonido = function () {
        console.log("Emitiendo sonido");
    };
}

function Robot() {
    Movilidad.call(this);
    EmisionSonidos.call(this);
}

const robot = new Robot();
robot.mover(); // "Moviéndose"
robot.emitirSonido(); // "Emitiendo sonido"

// API Object
// La API `Object` en JavaScript nos da métodos para manipular prototipos, propiedades y otros aspectos de los objetos.

const gato = {
    nombre: "Michi",
    edad: 2,
};

console.log(Object.keys(gato)); // ["nombre", "edad"]
console.log(Object.values(gato)); // ["Michi", 2]
console.log(Object.entries(gato)); // [["nombre", "Michi"], ["edad", 2]]

// Construyendo herencia con prototipos
// Creamos herencia manualmente mediante el uso de prototipos y funciones constructoras.
// Esto es posible antes de la introducción de clases en ES6.

function Vehiculo(tipo) {
    this.tipo = tipo;
}

Vehiculo.prototype.arrancar = function () {
    console.log(`El ${this.tipo} está arrancando.`);
};

// Clases en JavaScript: Funciones, Herencia y Métodos
// Con ES6, JavaScript introdujo `class`, una sintaxis para construir objetos y herencia de manera similar a otros lenguajes.

// Funciones constructoras
// Antes de ES6, usábamos funciones constructoras para crear "clases" y métodos de prototipo.

function Coche(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
}

Coche.prototype.encender = function () {
    console.log(`${this.marca} ${this.modelo} está encendiendo.`);
};

const miCoche = new Coche("Toyota", "Corolla");
miCoche.encender(); // "Toyota Corolla está encendiendo."

// Funciones `class`
// `class` es una forma más moderna de declarar clases en JavaScript, simplificando la herencia y la definición de métodos.

class Animalito {
    constructor(nombre, especie) {
        this.nombre = nombre;
        this.especie = especie;
    }

    presentarse() {
        console.log(`Soy ${this.nombre}, un ${this.especie}.`);
    }
}

const miAnimal = new Animalito("Félix", "gato");
miAnimal.presentarse(); // "Soy Félix, un gato."

// Métodos de `class`
// Podemos definir métodos directamente dentro de la declaración de clase.

class PersonaAvanzada {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
    }
}

const personaAvanzada = new PersonaAvanzada("Carlos", 30);
personaAvanzada.saludar(); // "Hola, soy Carlos y tengo 30 años."

// Herencia en Clases
// `extends` permite heredar de otra clase y `super` llama al constructor de la clase base.

class Mascota {
    constructor(nombre) {
        this.nombre = nombre;
    }

    mostrarNombre() {
        console.log(`Mi nombre es ${this.nombre}`);
    }
}

class PerroClase extends Mascota {
    constructor(nombre, raza) {
        super(nombre); // Llama al constructor de `Mascota`
        this.raza = raza;
    }

    mostrarRaza() {
        console.log(`Soy un ${this.raza}`);
    }
}

const miPerroClase = new PerroClase("Firulais", "Labrador");
miPerroClase.mostrarNombre(); // "Mi nombre es Firulais"
miPerroClase.mostrarRaza(); // "Soy un Labrador"

// Resumen de conceptos avanzados cubiertos en la clase:
// 1. Uso de prototipos para definir propiedades y métodos compartidos.
// 2. Diferencias entre propiedades de instancia y de prototipo.
// 3. Implementación de herencia usando prototipos y funciones constructoras.
// 4. Creación de clases modernas con `class` y el uso de herencia y métodos.
// 5. API Object y composición de clases para evitar acoplamiento fuerte entre objetos.
// 6. Ejemplos prácticos de herencia clásica y moderna en JavaScript.
