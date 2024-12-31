# Configuración Básica de Babel

## 1. Instalación
```bash
# Crear proyecto
mkdir babel-demo
cd babel-demo
npm init -y

# Instalar dependencias
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

## 2. Configuración
`.babelrc`:
```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": "> 0.25%, not dead",
      "useBuiltIns": "usage",
      "corejs": 3
    }]
  ]
}
```

## 3. Código de Ejemplo
`src/index.js`:
```javascript
// Código moderno
const greeting = (name) => `Hello, ${name}!`;

// Clase ES6+
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return greeting(this.name);
  }
}

// Async/Await
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Spread operator
const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5];
```

## 4. Scripts en package.json
```json
{
  "scripts": {
    "build": "babel src -d dist",
    "watch": "babel src -d dist --watch"
  }
}
```

## 5. Resultado Transpilado
```javascript
"use strict";

require("core-js/modules/es.promise.js");
// ... otros imports

function _typeof(o) { /* ... */ }

var greeting = function greeting(name) {
  return "Hello, ".concat(name, "!");
};

var Person = /*#__PURE__*/function () {
  function Person(name) {
    this.name = name;
  }

  var _proto = Person.prototype;

  _proto.sayHello = function sayHello() {
    return greeting(this.name);
  };

  return Person;
}();

function getData() {
  return _getData.apply(this, arguments);
}

function _getData() {
  _getData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var response, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      // ... código transpilado
    });
  }));
  return _getData.apply(this, arguments);
}

var numbers = [1, 2, 3];
var moreNumbers = [].concat(numbers, [4, 5]);
```

## 6. Uso
```bash
# Transpilar código
npm run build

# Desarrollo con watch mode
npm run watch
```

## Características Soportadas
- Arrow functions → funciones regulares
- Template literals → concatenación
- Classes → funciones constructoras
- Async/await → promesas y generators
- Spread operator → Object.assign/Array.concat
- ES6+ features → ES5 compatible