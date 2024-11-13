// Páginas SPA (Single Page Applications)
// Una SPA es una aplicación que carga una sola página HTML y actualiza dinámicamente el contenido en respuesta a la interacción del usuario.
// Las SPA ofrecen una experiencia más rápida y fluida porque no requieren recargar la página completa.

function cargarSeccion(url) {
    // Función que simula cargar contenido dinámico en una SPA
    // Imagina que esta función hace una solicitud AJAX para obtener el contenido y actualizar la vista
    console.log(`Cargando contenido de: ${url}`);
}

// Navegación SPA y el problema de la navegación
// Con las SPA, el reto es que la navegación no recarga la página. Esto rompe la funcionalidad de "atrás" y "adelante" del navegador.

document
    .getElementById("linkInicio")
    .addEventListener("click", () => cargarSeccion("/inicio"));
document
    .getElementById("linkSobreNosotros")
    .addEventListener("click", () => cargarSeccion("/sobre-nosotros"));

// API History y Control del historial
// La API History permite manipular el historial del navegador sin recargar la página.
// Podemos usar `history.pushState` para agregar una nueva entrada en el historial y `history.replaceState` para cambiar la entrada actual sin agregar otra.

history.pushState({ page: "inicio" }, "Inicio", "/inicio"); // Añade una entrada en el historial
history.replaceState({ page: "inicio" }, "Inicio"); // Reemplaza la entrada actual en el historial

// Escuchar eventos de historial
// El evento `popstate` se dispara cuando el usuario navega hacia atrás o adelante en el historial del navegador.

window.addEventListener("popstate", function (event) {
    if (event.state) {
        cargarSeccion(event.state.page); // Recargamos la sección correspondiente
        console.log(`Se cargó la página: ${event.state.page}`);
    }
});

// Uso de hash para el control de historial en aplicaciones SPA
// Otra forma de manejar la navegación es usando el hash (#) en la URL. Esto no recarga la página.

function navegarConHash(hash) {
    window.location.hash = hash;
}

window.addEventListener("hashchange", () => {
    console.log("El hash cambió a:", window.location.hash);
    cargarSeccion(window.location.hash.substring(1)); // Eliminar el # del hash
});

// Estado de historial como recurso
// Podemos usar `pushState` o `replaceState` para guardar datos en el historial que se puedan usar al navegar
let state = { pageId: 1 };
history.pushState(state, "Página 1", "?page=1");
console.log(history.state); // Accede al estado del historial actual

// Introducción: Location
// El objeto `location` proporciona detalles de la URL actual y métodos para redirigir y manipularla.

console.log(window.location.href); // URL completa
console.log(window.location.hostname); // Nombre de host
window.location.assign("https://www.ejemplo.com"); // Redirige a una nueva URL

// Introducción a una API REST
// REST es una arquitectura para crear servicios web basados en HTTP.
// Las APIs REST permiten realizar operaciones CRUD: Crear (POST), Leer (GET), Actualizar (PUT), y Eliminar (DELETE).

// Ejemplo de consumo de una API REST con AJAX (XHR)
function obtenerDatos() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.ejemplo.com/datos");
    xhr.onload = function () {
        if (xhr.status === 200) {
            const datos = JSON.parse(xhr.responseText);
            console.log("Datos recibidos:", datos);
        }
    };
    xhr.send();
}

// Consumo de recursos externos con fetch
// `fetch` es una función más moderna para realizar solicitudes HTTP.
// Devuelve una Promesa que puede manejarse con `then` o `async/await`.

fetch("https://api.ejemplo.com/datos")
    .then((response) => response.json())
    .then((data) => console.log("Datos recibidos con fetch:", data))
    .catch((error) => console.error("Error al obtener datos:", error));

// CORS (Cross-Origin Resource Sharing)
// CORS permite que una página web realice solicitudes a dominios distintos al dominio desde el cual se cargó la página.
// Los navegadores aplican CORS para proteger la seguridad, y solo permiten peticiones si el servidor lo permite explícitamente.

fetch("https://otro-dominio.com/api")
    .then((response) => {
        if (!response.ok) throw new Error("CORS bloqueado");
        return response.json();
    })
    .catch((error) => console.error("Error de CORS:", error));

// Introducción a JSONP (JSON with Padding)
// JSONP es una técnica para hacer solicitudes cross-origin que era común antes de que existiera CORS.
// Utiliza etiquetas `<script>` para cargar datos de otro dominio, ya que los scripts no tienen las mismas restricciones de origen que XHR.

function cargarJSONP(url) {
    const script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
}

// Implementando JSONP con AJAX
// JSONP requiere que el servidor devuelva datos en una función de callback. Aquí creamos un ejemplo básico.

function recibirDatos(datos) {
    console.log("Datos recibidos vía JSONP:", datos);
}

// Para probar, llamaríamos a `cargarJSONP("https://api.ejemplo.com?callback=recibirDatos");`
// El servidor debería responder con: `recibirDatos({ mensaje: "Hola desde JSONP" });`

// Resumen de flujo de navegación y uso de APIs en SPA
// 1. Definir eventos y funciones para controlar la navegación (sin recargar la página)
// 2. Usar la API History para manipular el historial y el evento `popstate` para manejar navegación
// 3. Controlar navegación usando hashes (URL con #) y escuchar el evento `hashchange`
// 4. Utilizar APIs REST con fetch o XMLHttpRequest para obtener y enviar datos
// 5. Manejar restricciones de CORS al consumir APIs externas
// 6. Implementar JSONP como alternativa para consumir APIs de dominios distintos (sin CORS)

// Ejemplo completo: navegación y consumo de una API con SPA
function configurarNavegacion() {
    document.querySelectorAll(".link").forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Evita el comportamiento predeterminado del enlace
            const seccion = this.getAttribute("href").substring(1); // Obtiene la sección
            cargarSeccion(seccion);
            history.pushState({ seccion }, seccion, `#${seccion}`); // Actualiza el historial con el hash
        });
    });
}

// Ejecuta la configuración inicial de la navegación SPA
configurarNavegacion();
