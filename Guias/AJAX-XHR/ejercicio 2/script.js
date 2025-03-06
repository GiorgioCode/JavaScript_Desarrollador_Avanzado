// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Obtener referencias a los elementos del DOM
    const botonCargar = document.getElementById("cargarDatos");
    const progressContainer = document.getElementById("progress-container");
    const progressBar = document.getElementById("progress-bar");
    const tableContainer = document.getElementById("tableContainer");
    const tableBody = document.getElementById("tableBody");
    const errorElement = document.getElementById("error");

    // Añadir evento click al botón
    botonCargar.addEventListener("click", cargarDatos);

    /**
     * Función principal para cargar los datos
     */
    function cargarDatos() {
        // Reiniciar estado
        resetUI();

        // Mostrar la barra de progreso
        progressContainer.style.display = "block";

        // URL de la API que devuelve datos JSON (usuarios)
        const url = "https://jsonplaceholder.typicode.com/users";

        // Crear una nueva instancia de XMLHttpRequest
        let xhr = new XMLHttpRequest();

        // Abrir la conexión
        xhr.open("GET", url, true);

        // Configurar el tipo de respuesta como JSON
        xhr.responseType = "json";

        // Manejar el evento de progreso
        xhr.onprogress = function (event) {
            if (event.lengthComputable) {
                // Calcular el porcentaje de progreso
                const porcentaje = Math.round(
                    (event.loaded / event.total) * 100
                );

                // Actualizar la barra de progreso
                progressBar.style.width = porcentaje + "%";
                progressBar.textContent = porcentaje + "%";
            }
        };

        // Manejar la respuesta cuando se complete
        xhr.onload = function () {
            // Ocultar la barra de progreso
            progressContainer.style.display = "none";

            // Verificar si la petición fue exitosa
            if (xhr.status === 200) {
                // Procesar los datos JSON y mostrarlos en la tabla
                const datos = xhr.response;
                mostrarDatosEnTabla(datos);
            } else {
                // Mostrar mensaje de error con el código de estado
                mostrarError(`Error ${xhr.status}: ${xhr.statusText}`);
            }
        };

        // Manejar errores de red
        xhr.onerror = function () {
            progressContainer.style.display = "none";
            mostrarError(
                "Error de red. Por favor, revisa tu conexión e inténtalo nuevamente."
            );
        };

        // Manejar timeout
        xhr.ontimeout = function () {
            progressContainer.style.display = "none";
            mostrarError(
                "La solicitud ha excedido el tiempo límite. Por favor, inténtalo nuevamente."
            );
        };

        // Establecer un timeout de 10 segundos
        xhr.timeout = 10000;

        // Enviar la petición
        xhr.send();
    }

    /**
     * Función para procesar y mostrar los datos en la tabla
     * @param {Array} datos - Array de objetos con datos de usuarios
     */
    function mostrarDatosEnTabla(datos) {
        // Limpiar el contenido actual de la tabla
        tableBody.innerHTML = "";

        // Verificar si se recibieron datos
        if (!datos || datos.length === 0) {
            mostrarError("No se encontraron datos para mostrar.");
            return;
        }

        // Iterar sobre cada objeto de datos y crear filas en la tabla
        datos.forEach((usuario) => {
            // Crear una nueva fila
            const fila = document.createElement("tr");

            // Añadir celdas con los datos del usuario
            fila.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.name}</td>
                <td>${usuario.username}</td>
                <td>${usuario.email}</td>
                <td>${usuario.phone}</td>
                <td>${usuario.website}</td>
                <td>${usuario.company.name}</td>
            `;

            // Añadir la fila al cuerpo de la tabla
            tableBody.appendChild(fila);
        });

        // Mostrar la tabla
        tableContainer.style.display = "block";
    }

    /**
     * Función para mostrar mensajes de error
     * @param {string} mensaje - Mensaje de error a mostrar
     */
    function mostrarError(mensaje) {
        errorElement.textContent = mensaje;
        errorElement.style.display = "block";
    }

    /**
     * Función para reiniciar la interfaz de usuario
     */
    function resetUI() {
        // Ocultar elementos
        errorElement.style.display = "none";
        tableContainer.style.display = "none";

        // Reiniciar la barra de progreso
        progressBar.style.width = "0%";
        progressBar.textContent = "0%";
    }
});
