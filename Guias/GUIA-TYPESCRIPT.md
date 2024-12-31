# Guion Detallado: Introducción a TypeScript

## Duración Estimada: 120 minutos

### Objetivos de Aprendizaje
- Comprender qué es TypeScript y su relación con JavaScript
- Identificar las ventajas y desventajas de TypeScript
- Aprender a instalar y configurar un entorno TypeScript
- Dominar los conceptos básicos y tipos de datos en TypeScript

## 1. INTRODUCCIÓN A TYPESCRIPT (30 minutos)

### 1.1 ¿Qué es TypeScript?

TypeScript es un superconjunto tipado de JavaScript que se compila a JavaScript puro. Fue desarrollado y es mantenido por Microsoft.

Ejemplo introductorio para mostrar la diferencia:

```javascript
// JavaScript tradicional
function sumar(a, b) {
    return a + b;
}
```

```typescript
// TypeScript equivalente
function sumar(a: number, b: number): number {
    return a + b;
}
```

### 1.2 Relación con JavaScript

Explicar que todo código JavaScript válido es también código TypeScript válido. Mostrar el siguiente ejemplo:

```typescript
// Este es un archivo TypeScript (.ts)
let mensaje = "Hola Mundo";  // TypeScript infiere que es string
let numero = 42;             // TypeScript infiere que es number
let esActivo = true;        // TypeScript infiere que es boolean

// La siguiente línea causaría un error en TypeScript
mensaje = 123;  // Error: Type 'number' is not assignable to type 'string'
```

## 2. VENTAJAS Y DESVENTAJAS (20 minutos)

### 2.1 Ventajas

Demostración práctica de cada ventaja:

```typescript
// 1. Detección temprana de errores
interface Usuario {
    nombre: string;
    edad: number;
}

// El IDE mostrará error si falta alguna propiedad
const usuario: Usuario = {
    nombre: "Juan"  // Error: Property 'edad' is missing
};

// 2. Autocompletado mejorado
const nuevoUsuario: Usuario = {
    nombre: "Ana",
    edad: 25
}; // El IDE sugiere las propiedades disponibles

// 3. Refactorización más segura
interface Producto {
    id: number;
    nombre: string;
    precio: number;
}

function calcularDescuento(producto: Producto) {
    return producto.precio * 0.9;
}
```

### 2.2 Desventajas

Ejemplos prácticos de desventajas:

```typescript
// 1. Configuración inicial más compleja
// Necesidad de configurar tsconfig.json y herramientas de build

// 2. Curva de aprendizaje
interface ComplexInterface {
    readonly id: number;
    nombre: string;
    direccion?: {
        calle: string;
        numero: number;
        codigoPostal: string;
    };
    contacto: Array<{
        tipo: 'email' | 'telefono';
        valor: string;
    }>;
}

// 3. Tiempo adicional en desarrollo por tipado
function procesarDatos<T extends object>(datos: T[]): Promise<T[]> {
    return new Promise((resolve) => {
        resolve(datos.map(item => ({...item})));
    });
}
```

## 3. INSTALACIÓN E IMPLEMENTACIÓN (30 minutos)

### 3.1 Instalación Paso a Paso

```bash
# 1. Inicializar proyecto Node.js
npm init -y

# 2. Instalar TypeScript
npm install typescript --save-dev

# 3. Instalar herramientas de desarrollo
npm install ts-node @types/node --save-dev

# 4. Crear archivo de configuración TypeScript
npx tsc --init
```

### 3.2 Configuración del Proyecto

Explicar el archivo tsconfig.json:

```json
{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
}
```

### 3.3 Estructura del Proyecto

```plaintext
mi-proyecto-typescript/
├── node_modules/
├── src/
│   ├── index.ts
│   └── tipos/
│       └── definiciones.ts
├── dist/
├── package.json
└── tsconfig.json
```

## 4. CONCEPTOS Y EJEMPLOS (40 minutos)

### 4.1 Tipos Básicos

```typescript
// Tipos primitivos
let nombre: string = "Juan";          // Tipo string
let edad: number = 25;                // Tipo number
let activo: boolean = true;           // Tipo boolean
let indefinido: undefined = undefined; // Tipo undefined
let nulo: null = null;                // Tipo null

// Arrays
let numeros: number[] = [1, 2, 3, 4, 5];
let nombres: Array<string> = ["Ana", "Juan", "Pedro"];

// Tuplas
let coordenadas: [number, number] = [10, 20];
```

### 4.2 Interfaces y Tipos

```typescript
// Interface vs Type
interface Animal {
    nombre: string;
    edad: number;
}

type Mascota = {
    nombre: string;
    edad: number;
};

// Extensión de interfaces
interface Perro extends Animal {
    raza: string;
}

// Implementación de interfaces
class PerroMascota implements Perro {
    constructor(
        public nombre: string,
        public edad: number,
        public raza: string
    ) {}
}
```

### 4.3 Genéricos

```typescript
// Función genérica
function primerElemento<T>(arr: T[]): T {
    return arr[0];
}

// Clase genérica
class Contenedor<T> {
    private valor: T;

    constructor(valor: T) {
        this.valor = valor;
    }

    obtenerValor(): T {
        return this.valor;
    }
}

// Uso de genéricos
const numeroContenedor = new Contenedor<number>(42);
const textoContenedor = new Contenedor<string>("Hola");
```

### 4.4 Decoradores

```typescript
// Decorador de clase
function logger(constructor: Function) {
    console.log(`Clase creada: ${constructor.name}`);
}

@logger
class Ejemplo {
    constructor() {
        console.log("Instancia creada");
    }
}

// Decorador de propiedad
function validarLongitud(min: number, max: number) {
    return function(target: any, propertyKey: string) {
        let valor: string;
        
        const getter = function() {
            return valor;
        };
        
        const setter = function(newVal: string) {
            if (newVal.length < min || newVal.length > max) {
                throw new Error(`La longitud debe estar entre ${min} y ${max}`);
            }
            valor = newVal;
        };
        
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    };
}

class Usuario {
    @validarLongitud(3, 10)
    nombre: string;
}
```

## Ejercicios Prácticos Sugeridos

1. Crear una interfaz para un sistema de gestión de productos
2. Implementar una clase genérica para manejar listas de elementos
3. Desarrollar un decorador personalizado
4. Crear un sistema de tipos para una aplicación de todo-list

## Recursos Adicionales
- Documentación oficial de TypeScript
- TypeScript Playground para experimentación
- Repositorio de ejemplos en GitHub
- Herramientas recomendadas de desarrollo

## Evaluación Sugerida
- Ejercicio práctico de implementación
- Cuestionario de conceptos básicos
- Proyecto pequeño de integración

