/**
1) Instalar dependencias:
- npm init -y
- npm install express multer cors

2) Crear carpeta uploads
- mkdir uploads

3) Iniciar servidor
- node server.js
 */

// ================== BACKEND (server.js) ==================

// Importamos los módulos necesarios
const express = require("express"); // Framework web para Node.js
const multer = require("multer"); // Middleware para manejar archivos multipart/form-data
const cors = require("cors"); // Middleware para permitir peticiones cross-origin
const path = require("path"); // Módulo para manejar rutas de archivos
const app = express(); // Creamos la aplicación Express

// Habilitamos CORS para permitir peticiones desde el frontend
app.use(cors());

// Configuramos el almacenamiento para los archivos subidos
const storage = multer.diskStorage({
    // Definimos el directorio donde se guardarán los archivos
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Los archivos se guardarán en la carpeta 'uploads'
    },
    // Definimos cómo se nombrarán los archivos
    filename: function (req, file, cb) {
        // Generamos un nombre único usando timestamp + extensión original
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Configuramos multer con las opciones de almacenamiento y límites
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Limitamos el tamaño de archivo a 10MB
    },
});

// Definimos la ruta POST para subir archivos
app.post("/upload", upload.single("file"), (req, res) => {
    // Verificamos si se recibió un archivo
    if (!req.file) {
        return res.status(400).send("No se subió ningún archivo.");
    }
    // Si todo está bien, enviamos respuesta exitosa
    res.send("Archivo subido correctamente");
});

// Iniciamos el servidor en el puerto especificado
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
