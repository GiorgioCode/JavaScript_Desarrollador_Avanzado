# Guía de Configuración: Frontend Vanilla JS + Backend JSON Server

## Preparación del Entorno

### Requisitos Previos

-   Node.js instalado en el sistema
-   Un editor de código (VS Code recomendado)
-   Conocimientos básicos de terminal/consola

## Paso 1: Configuración del Backend

### 1.1 Crear la estructura del proyecto

1. Crear un directorio principal para el proyecto

```bash
mkdir proyecto-usuarios
cd proyecto-usuarios
```

2. Crear el directorio para el backend

```bash
mkdir backend
cd backend
```

### 1.2 Inicializar el proyecto backend

1. Inicializar un nuevo proyecto npm

```bash
npm init -y
```

2. Instalar json-server

```bash
npm install json-server
```

### 1.3 Configurar json-server

1. Crear el archivo db.json en la carpeta backend
2. Configurar el script de inicio en package.json

```js
    "scripts": {
    "start": "json-server --watch db.json --port 3001",
    "test": "echo \"Error: no test specified\" && exit 1"
    },
```

3. Verificar que el puerto 3001 está libre

### 1.4 Iniciar el servidor

```bash
npm start
```

## Paso 2: Configuración del Frontend

### 2.1 Crear la estructura del frontend

1. En el directorio principal del proyecto:

```bash
mkdir frontend
cd frontend
```

### 2.2 Crear los archivos necesarios

1. Crear el archivo index.html
2. Configurar la estructura HTML básica
3. Agregar los estilos CSS
4. Implementar el código JavaScript

### 2.3 Servir el frontend

Opciones:

-   Usar Live Server en VS Code
-   Abrir directamente el archivo HTML
-   Usar un servidor local simple como http-server

## Paso 3: Pruebas

### 3.1 Verificar el backend

1. Abrir el navegador
2. Visitar http://localhost:3001/usuarios
3. Confirmar que se ven los datos JSON

### 3.2 Verificar el frontend

1. Abrir la página del frontend
2. Verificar que se cargan los usuarios
3. Probar la creación de usuarios
4. Probar la eliminación de usuarios

## Estructura Final del Proyecto

```
proyecto-usuarios/
├── backend/
│   ├── node_modules/
│   ├── db.json
│   └── package.json
└── frontend/
    └── index.html
```

## Solución de Problemas Comunes

### CORS

Si hay problemas de CORS:

1. Verificar que el backend está corriendo en el puerto correcto
2. Verificar que las URLs en el frontend son correctas
3. Asegurarse de que json-server está configurado para permitir CORS

### Conexión

Si hay problemas de conexión:

1. Verificar que el backend está ejecutándose
2. Confirmar que los puertos son correctos
3. Revisar la consola del navegador para errores

## Próximos Pasos Sugeridos

1. Agregar más funcionalidades (edición, búsqueda)
2. Mejorar el diseño visual
3. Implementar validaciones adicionales
4. Agregar confirmaciones antes de eliminar
5. Implementar paginación

## Recursos Adicionales

-   Documentación de json-server
-   MDN Web Docs para JavaScript
-   Guías de CSS moderno
