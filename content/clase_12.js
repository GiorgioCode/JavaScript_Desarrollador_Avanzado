// Aprendiendo NodeJS
// Node.js es un entorno de ejecución para JavaScript que permite ejecutar código en el servidor.
// Fue construido en el motor V8 de Google y es popular para crear aplicaciones de backend.

// ¿Qué es NodeJS?
// Node.js permite a los desarrolladores utilizar JavaScript fuera del navegador.
// Tiene características como:
// - Manejo asíncrono
// - Escalabilidad para aplicaciones de alto rendimiento

// Ejemplo de un "Hola Mundo" en Node.js

const http = require("http"); // Importa el módulo 'http' para crear un servidor

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("¡Hola Mundo desde Node.js!");
});

server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

// Módulos en NodeJS
// Los módulos son archivos que exportan y pueden ser requeridos en otros archivos.
// Node.js tiene módulos internos (como `http`, `fs`, `path`) y podemos crear nuestros propios módulos.

const os = require("os"); // Módulo de sistema operativo
console.log("Información del sistema:", os.platform(), os.arch());

// Creando un módulo personalizado
// Exportamos una función desde otro archivo:
// (1) Crea un archivo `utilidades.js` con el siguiente contenido:
//    module.exports.saludar = function(nombre) { return `Hola, ${nombre}`; }
// (2) En nuestro archivo principal:
const utilidades = require("./utilidades");
console.log(utilidades.saludar("Juan"));

// ¿Qué es NPM?
// NPM (Node Package Manager) es el sistema de gestión de paquetes de Node.js.
// Permite instalar bibliotecas de terceros y gestionar dependencias para proyectos Node.js.

// Utilizando NPM para configurar un proyecto en Node.js
// 1. Ejecuta `npm init -y` para crear un archivo `package.json` básico.
// 2. Instala un paquete con `npm install express`.
// 3. Ahora `express` estará disponible en `node_modules`.

const express = require("express"); // Usamos un paquete de terceros
const app = express();

app.get("/", (req, res) => {
    res.send("¡Hola desde Express!");
});

app.listen(3000, () => {
    console.log("Servidor Express en http://localhost:3000");
});

// Introducción a Compiladores y Transpiladores
// Los compiladores transforman código de alto nivel a un formato ejecutable.
// Los transpiladores (ej. Babel) transforman el código de un lenguaje a otro (JS moderno a JS compatible con navegadores antiguos).

// ¿Qué es Babel?
// Babel es un transpilador de JavaScript que permite usar características modernas que pueden no ser compatibles con todos los navegadores.
// Instala Babel con `npm install --save-dev @babel/core @babel/cli @babel/preset-env`.

module.exports = {
    presets: ["@babel/preset-env"], // Configura Babel para usar características de ES6+
};

// Ahora ejecuta Babel con `npx babel archivo.js --out-file compilado.js`.

// ¿Qué es Webpack?
// Webpack es un empaquetador de módulos que agrupa archivos JavaScript, CSS, imágenes, etc., en un único archivo.
// Webpack es útil para preparar aplicaciones para producción.

// Configurando Webpack
// Primero, instala Webpack y su CLI: `npm install --save-dev webpack webpack-cli`.

const path = require("path");

module.exports = {
    entry: "./src/index.js", // Punto de entrada
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"), // Carpeta de salida
    },
    mode: "production", // Configura el modo
};

// Ejecuta Webpack con `npx webpack` para generar el archivo `bundle.js`.

// JSON-Server
// JSON-Server es una herramienta que permite crear una API REST de prueba basada en un archivo JSON.
// Instalación: `npm install -g json-server`
// Crea un archivo `db.json` con datos de prueba y ejecuta `json-server --watch db.json`.

// Ejemplo de archivo db.json
// {
//   "posts": [
//     { "id": 1, "title": "Hello World", "author": "Juan" }
//   ]
// }

// Compilando código para producción
// Webpack permite minificar y optimizar archivos para producción.
// Configura `mode: "production"` en Webpack para habilitar optimizaciones.

// Introducción a TypeScript
// TypeScript es un lenguaje que añade tipado estático a JavaScript, facilitando el mantenimiento de grandes proyectos.
// Instala TypeScript con `npm install -g typescript`.

// Ejemplo básico en TypeScript (archivo con extensión .ts)

function saludarTS(nombre: string): string {
    return `Hola, ${nombre}`;
}

console.log(saludarTS("Ana"));

// Transpila el código con `tsc archivo.ts`, que genera un archivo JavaScript compatible.

// Ejercicio adicional de TypeScript
// Crear una clase en TypeScript:

class Persona {
    nombre: string;
    edad: number;

    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar(): void {
        console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
    }
}

const persona = new Persona("Pedro", 30);
persona.saludar();

// Ejercicio práctico: Configurar un proyecto con Babel y TypeScript
// Paso 1: Instala dependencias: `npm install --save-dev @babel/core @babel/preset-env @babel/preset-typescript`.
// Paso 2: Configura Babel para TypeScript:

module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-typescript"],
};

// Laboratorio adicional resuelto
// Crea un proyecto en Node.js con Babel, Webpack y TypeScript.
// - Usa Webpack para agrupar los archivos.
// - Usa Babel para transpilar TypeScript a JavaScript.
// - Usa TypeScript para tipado y mejor mantenimiento del código.
