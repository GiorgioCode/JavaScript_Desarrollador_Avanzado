# Configuración de Webpack y Babel: Guía Paso a Paso

## Paso 1: Inicialización del Proyecto
```bash
mkdir mi-proyecto
cd mi-proyecto
npm init -y  # Crea package.json con valores predeterminados
```

## Paso 2: Instalación de Dependencias
```bash
# Dependencias principales
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev @babel/core @babel/preset-env babel-loader
npm install --save-dev html-webpack-plugin clean-webpack-plugin

# Loaders para CSS
npm install --save-dev css-loader style-loader
npm install --save-dev mini-css-extract-plugin # Para extraer CSS en producción

# Bootstrap y sus dependencias
npm install bootstrap @popperjs/core
```

## Paso 3: Estructura del Proyecto
```
mi-proyecto/
├── src/
│   ├── index.js       # Punto de entrada principal
│   ├── index.html     # Template HTML
│   └── styles.css     # Estilos CSS
├── webpack.config.js  # Configuración de webpack
├── .babelrc          # Configuración de babel
└── package.json      # Configuración del proyecto
```

## Paso 4: Configuración de Babel
Crear archivo `.babelrc`:
```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["> 1%", "last 2 versions"]
      },
      "useBuiltIns": "usage",  // Polyfills automáticos según uso
      "corejs": 3             // Versión de core-js para polyfills
    }]
  ]
}
```

## Paso 5: Configuración de Webpack
Crear `webpack.config.js`:
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Determinar si estamos en desarrollo o producción
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  // Punto de entrada de la aplicación
  entry: {
    main: './src/index.js'
  },
  
  // Configuración de salida
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'  // Nombre dinámico para cache busting
  },
  
  // Reglas para procesar diferentes tipos de archivos
  module: {
    rules: [
      // Regla para archivos JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'  // Transpila JS moderno
        }
      },
      // Regla para archivos CSS
      {
        test: /\.css$/,
        use: [
          // En desarrollo usamos style-loader, en producción extraemos el CSS
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment  // Maps solo en desarrollo
            }
          }
        ]
      }
    ]
  },
  
  // Plugins para extender funcionalidad
  plugins: [
    new CleanWebpackPlugin(),  // Limpia dist/ antes de cada build
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: !isDevelopment  // Minifica HTML en producción
    }),
    // Solo extraemos CSS en producción
    ...(!isDevelopment ? [new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })] : [])
  ],
  
  // Configuración del servidor de desarrollo
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open: true,
    hot: true  // Habilita Hot Module Replacement
  },
  
  // Configuración de optimización
  optimization: {
    moduleIds: 'deterministic',  // Ayuda con el caching
    splitChunks: {
      chunks: 'all'  // Separa código común en chunks
    }
  }
};
```

## Paso 6: Archivos Base
`src/index.html`:
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Aplicación con Bootstrap</title>
</head>
<body>
    <div class="container">
        <div id="app"></div>
    </div>
</body>
</html>
```

`src/styles.css`:
```css
/* Estilos personalizados */
.custom-header {
    padding: 2rem;
    background-color: #f8f9fa;
    margin-bottom: 2rem;
}
```

`src/index.js`:
```javascript
// Importamos Bootstrap CSS y JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importamos nuestros estilos
import './styles.css';

const crearContenido = () => {
    const app = document.querySelector('#app');
    
    // Creamos header con Bootstrap
    const header = document.createElement('div');
    header.className = 'custom-header text-center';
    
    const titulo = document.createElement('h1');
    titulo.textContent = '¡Hola desde Webpack, Babel y Bootstrap!';
    titulo.className = 'display-4';
    
    const boton = document.createElement('button');
    boton.textContent = 'Botón Bootstrap';
    boton.className = 'btn btn-primary mt-3';
    
    header.appendChild(titulo);
    header.appendChild(boton);
    app.appendChild(header);
};

crearContenido();
```

## Paso 7: Scripts en package.json
```json
{
  "scripts": {
    "start": "NODE_ENV=development webpack serve --mode development",
    "build": "NODE_ENV=production webpack --mode production",
    "build:dev": "NODE_ENV=development webpack --mode development"
  }
}
```

## Paso 8: Comandos de Uso
```bash
# Desarrollo con hot reload
npm start

# Build de producción optimizado
npm run build

# Build de desarrollo para debugging
npm run build:dev
```

## Explicación para la Clase

### Conceptos Clave:
1. **Loaders CSS**: 
   - `css-loader`: Interpreta @import y url()
   - `style-loader`: Inyecta CSS en el DOM
   - `MiniCssExtractPlugin`: Extrae CSS a archivos separados en producción

2. **Bootstrap**:
   - Se importa vía npm para mejor gestión de dependencias
   - Requiere Popper.js para componentes JavaScript
   - Se puede personalizar mediante variables Sass

### Ejercicios Sugeridos:
1. Añadir soporte para Sass/SCSS
2. Crear componentes Bootstrap personalizados
3. Implementar lazy loading de CSS
4. Optimizar el bundle de Bootstrap