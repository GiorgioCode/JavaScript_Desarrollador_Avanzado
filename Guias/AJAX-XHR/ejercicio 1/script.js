// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Obtener referencias a los elementos del DOM que vamos a manipular
    const botonCargar = document.getElementById("cargarDatos");
    const divResultado = document.getElementById("resultado");
    const divCargando = document.getElementById("cargando");
    const divError = document.getElementById("error");

    // Añadir un evento click al botón
    botonCargar.addEventListener("click", cargarDatosDesdeServidor);

    /**
     * Función que realiza la petición AJAX para obtener datos de texto
     */
    function cargarDatosDesdeServidor() {
        // Mostrar indicador de carga
        divCargando.style.display = "block";

        // Ocultar contenido previo y mensajes de error
        divResultado.style.display = "none";
        divError.style.display = "none";

        // Crear una nueva instancia de XMLHttpRequest
        let xhr = new XMLHttpRequest();

        // Configurar la petición
        // Usamos una API pública que devuelve texto aleatorio
        xhr.open(
            "GET",
            "https://baconipsum.com/api/?type=all-meat&paras=2&format=text",
            true
        );

        // Configurar el manejador para cambios de estado
        xhr.onreadystatechange = function () {
            // Verificar si la petición se ha completado
            if (xhr.readyState === 4) {
                // Ocultar indicador de carga
                divCargando.style.display = "none";

                // Verificar si la respuesta fue exitosa (código 200)
                if (xhr.status === 200) {
                    // Mostrar los datos en el div de resultado
                    divResultado.textContent = xhr.responseText;
                    divResultado.style.display = "block";
                } else {
                    // Mostrar mensaje de error
                    divError.textContent = `Error al cargar los datos: ${xhr.status} ${xhr.statusText}`;
                    divError.style.display = "block";
                }
            }
        };

        // Configurar manejador para errores de red
        xhr.onerror = function () {
            divCargando.style.display = "none";
            divError.textContent =
                "Error de red. Comprueba tu conexión a internet.";
            divError.style.display = "block";
        };

        // Enviar la petición
        xhr.send();
    }
});
