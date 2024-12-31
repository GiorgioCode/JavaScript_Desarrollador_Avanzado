# Guía Completa: Transpilación de TypeScript a JavaScript

## 1. Preparación del Entorno

Primero, necesitamos tener un entorno correctamente configurado:

```bash
# Crear un nuevo directorio para el proyecto
mkdir mi-proyecto-typescript
cd mi-proyecto-typescript

# Inicializar un proyecto Node.js
npm init -y

# Instalar TypeScript localmente en el proyecto
npm install typescript --save-dev

# Crear el archivo de configuración de TypeScript
npx tsc --init
```

## 2. Estructura del Proyecto

Crear una estructura básica de archivos:

```plaintext
mi-proyecto-typescript/
├── src/
│   └── index.ts      # Archivo TypeScript fuente
├── dist/             # Carpeta donde irá el código transpilado
├── package.json
└── tsconfig.json     # Configuración de TypeScript
```

## 3. Configuración de TypeScript

Modificar el archivo `tsconfig.json` para especificar las opciones de compilación:

```json
{
    "compilerOptions": {
        // Versión de JavaScript de salida
        "target": "es2016",
        
        // Sistema de módulos
        "module": "commonjs",
        
        // Directorio de salida para archivos compilados
        "outDir": "./dist",
        
        // Directorio raíz de archivos fuente
        "rootDir": "./src",
        
        // Habilitar todas las comprobaciones estrictas
        "strict": true,
        
        // Otras opciones comunes
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    },
    "include": ["src/**/*"],    // Archivos a incluir
    "exclude": ["node_modules"]  // Archivos a excluir
}
```

## 4. Archivo TypeScript de Ejemplo

Crear un archivo `src/index.ts`:

```typescript
// Definir una interfaz para un usuario
interface Usuario {
    nombre: string;
    edad: number;
    email?: string;  // Propiedad opcional
}

// Crear una función con tipos
function crearSaludo(usuario: Usuario): string {
    return `¡Hola ${usuario.nombre}! Tienes ${usuario.edad} años.`;
}

// Usar la función con un objeto
const usuario: Usuario = {
    nombre: "Juan",
    edad: 30,
    email: "juan@ejemplo.com"
};

console.log(crearSaludo(usuario));

// Exportar para uso en otros módulos
export { Usuario, crearSaludo };
```

## 5. Métodos de Transpilación

### 5.1 Usando el Compilador Directamente

```bash
# Compilar un archivo específico
npx tsc src/index.ts

# Compilar todo el proyecto según tsconfig.json
npx tsc

# Compilar y observar cambios
npx tsc --watch
```

### 5.2 Usando Scripts de NPM

Agregar scripts al `package.json`:

```json
{
    "scripts": {
        "build": "tsc",
        "watch": "tsc --watch",
        "clean": "rm -rf ./dist",
        "build:clean": "npm run clean && npm run build"
    }
}
```

Ahora puedes usar:

```bash
# Compilar el proyecto
npm run build

# Compilar y observar cambios
npm run watch

# Limpiar y recompilar
npm run build:clean
```

## 6. Resultado de la Transpilación

El archivo JavaScript resultante (`dist/index.js`) se verá así:

```javascript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearSaludo = void 0;

function crearSaludo(usuario) {
    return `¡Hola ${usuario.nombre}! Tienes ${usuario.edad} años.`;
}
exports.crearSaludo = crearSaludo;

const usuario = {
    nombre: "Juan",
    edad: 30,
    email: "juan@ejemplo.com"
};

console.log(crearSaludo(usuario));
```

## 7. Verificación y Ejecución

```bash
# Ejecutar el código transpilado
node dist/index.js

# O usar ts-node para ejecutar TypeScript directamente
npx ts-node src/index.ts
```

## 8. Consejos y Buenas Prácticas

1. Siempre incluir `sourceMap: true` en tsconfig.json para mejor depuración
2. Usar el modo estricto (`strict: true`) para máxima seguridad de tipos
3. Mantener una estructura de carpetas clara (src/dist)
4. Incluir scripts npm para automatizar tareas comunes
5. Usar `.gitignore` para excluir la carpeta `dist` del control de versiones

## 9. Solución de Problemas Comunes

### Error: Cannot find module
```bash
# Instalar tipos necesarios
npm install @types/node --save-dev
```

### Error: TypeScript emite errores pero quieres compilar de todos modos
```bash
# Usar la bandera --noEmitOnError
npx tsc --noEmitOnError
```

### Error: Archivos JS no se actualizan
```bash
# Limpiar la carpeta dist antes de compilar
rm -rf dist && tsc
```
