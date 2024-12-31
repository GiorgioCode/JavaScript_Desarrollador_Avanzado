# Guía de Paradigmas y Patrones en JavaScript

## 1. Paradigmas
### 1.1 Definiciones Básicas

```javascript
// Paradigma Imperativo
let numbers = [1, 2, 3, 4, 5];
let sum = 0;
// Enfoque paso a paso, dictando CÓMO hacer algo
for(let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
}

// Paradigma Declarativo
// Enfoque que describe QUÉ queremos lograr
const total = numbers.reduce((acc, curr) => acc + curr, 0);

// Paradigma Orientado a Objetos
class Calculator {
    constructor(numbers) {
        this.numbers = numbers;
    }
    
    sum() {
        return this.numbers.reduce((acc, curr) => acc + curr, 0);
    }
}

// Paradigma Funcional
const sum = (numbers) => numbers.reduce((acc, curr) => acc + curr, 0);
```

### 1.2 Construcción de Prototipos

```javascript
// Definición base del prototipo
function Vehicle(brand, model) {
    // Propiedades de instancia
    this.brand = brand;
    this.model = model;
    
    // Estado interno
    let _mileage = 0;  // Propiedad privada mediante closure
    
    // Getter público
    this.getMileage = function() {
        return _mileage;
    };
    
    // Setter público con validación
    this.addMileage = function(miles) {
        if (miles > 0) {
            _mileage += miles;
        }
    };
}

// Añadiendo métodos al prototipo (más eficiente en memoria)
Vehicle.prototype.getInfo = function() {
    return `${this.brand} ${this.model}`;
};

// Herencia prototípica
function Car(brand, model, doors) {
    // Llamada al constructor padre
    Vehicle.call(this, brand, model);
    this.doors = doors;
}

// Establecer la cadena de prototipos
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
```

### 1.3 Configuración Avanzada de Propiedades

```javascript
const product = {};

// Definición de propiedades con descriptores
Object.defineProperty(product, 'name', {
    value: 'Laptop',
    writable: false,      // No se puede modificar
    enumerable: true,     // Visible en iteraciones
    configurable: false   // No se puede eliminar/reconfigurar
});

// Definición de múltiples propiedades
Object.defineProperties(product, {
    price: {
        value: 999.99,
        writable: true,
        enumerable: true,
        configurable: false
    },
    // Getter/Setter para propiedades calculadas
    discountPrice: {
        get: function() {
            return this.price * 0.9;
        },
        enumerable: true
    }
});
```

## 2. Patrones
### 2.1 Nivel Estratégico

```javascript
// Patrón Módulo (Module Pattern)
const ShoppingCart = (function() {
    // Variables privadas mediante closure
    let items = [];
    let total = 0;
    
    // Métodos privados
    function calculateTotal() {
        total = items.reduce((sum, item) => sum + item.price, 0);
    }
    
    // API pública
    return {
        addItem: function(item) {
            items.push(item);
            calculateTotal();
        },
        getTotal: function() {
            return total;
        },
        getItems: function() {
            return [...items]; // Devuelve copia para evitar modificación directa
        }
    };
})();

// Patrón Singleton
const Database = (function() {
    let instance;
    
    function createInstance() {
        const object = new Object({
            connections: 0,
            connect: function() {
                this.connections++;
                return this;
            }
        });
        return object;
    }
    
    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
```

### 2.2 Funciones Constructoras y Operador new

```javascript
// Función constructora básica
function User(name, email) {
    // 'this' se crea automáticamente cuando se usa 'new'
    this.name = name;
    this.email = email;
    
    // Método de instancia
    this.sayHello = function() {
        return `Hola, soy ${this.name}`;
    };
}

// Uso del constructor
const user1 = new User('Juan', 'juan@email.com');
// Si olvidamos 'new', this será undefined o window en navegadores

// Patrón Factory para evitar problemas con 'new'
function createUser(name, email) {
    return new User(name, email);
}
```

### 2.3 Nivel Táctico

```javascript
// Patrón Observer
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    // Suscribirse a un evento
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    // Emitir un evento
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
}

// Patrón Strategy
class Shipping {
    constructor() {
        this.company = '';
    }
    
    setStrategy(company) {
        this.company = company;
    }
    
    calculate(package) {
        return this.company.calculate(package);
    }
}

// Estrategias concretas
const UPSStrategy = {
    calculate: package => package.weight * 1.5
};

const FedExStrategy = {
    calculate: package => package.weight * 2.45
};
```

### 2.4 Ejemplos Operativos

```javascript
// Implementación práctica de los patrones
const shipping = new Shipping();
shipping.setStrategy(UPSStrategy);
console.log(shipping.calculate({weight: 2})); // 3

shipping.setStrategy(FedExStrategy);
console.log(shipping.calculate({weight: 2})); // 4.9

// Ejemplo de Observer en acción
const newsAgency = new EventEmitter();
newsAgency.on('news', news => console.log(`Breaking: ${news}`));
newsAgency.emit('news', 'Nueva noticia importante!');

// Ejemplo de Factory con validación
function createProduct(type, properties) {
    switch(type) {
        case 'book':
            return new Book(properties);
        case 'electronic':
            return new Electronic(properties);
        default:
            throw new Error('Tipo de producto no soportado');
    }
}

// Uso de Prototype para extensiones
Array.prototype.sum = function() {
    return this.reduce((acc, curr) => acc + curr, 0);
};
[1,2,3].sum(); // 6
```

## 3. Ejercicios Prácticos

1. Implementar un sistema de carrito de compras usando el patrón Module
2. Crear un gestor de usuarios con el patrón Factory
3. Implementar un sistema de notificaciones usando Observer
4. Crear un calculador de precios usando Strategy

## 4. Mejores Prácticas

1. Usar IIFE para encapsulación
2. Implementar getters/setters para control de acceso
3. Mantener la responsabilidad única
4. Favorecer composición sobre herencia
5. Documentar patrones utilizados