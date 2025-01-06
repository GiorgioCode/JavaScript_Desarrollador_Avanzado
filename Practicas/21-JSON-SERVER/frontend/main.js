const API_URL = "http://localhost:3001";
const usuariosContainer = document.getElementById("usuarios");
const loadingElement = document.getElementById("loading");
const errorElement = document.getElementById("error");
const formularioUsuario = document.getElementById("formularioUsuario");
const formUsuario = document.getElementById("formUsuario");
const btnMostrarFormulario = document.getElementById("mostrarFormulario");

//mostrar u ocultar formulario

btnMostrarFormulario.addEventListener("click", () => {
    formularioUsuario.style.display =
        formularioUsuario.style.display === "none" ? "block" : "none";
});

//manejar envio del formulario
formUsuario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoUsuario = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        rol: document.getElementById("rol").value,
    };

    try {
        const response = await fetch(`${API_URL}/usuarios`, {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify(nuevoUsuario),
        });
        if (!response.ok) {
            throw new Error("Error al crear Usuario");
        }

        //limpiar el formulario y ocultarlo
        formUsuario.requestFullscreen();
        formularioUsuario.display = "none";
    } catch (error) {
        mostrarError(error.message); //TODO: funcion a definir
    }
});

function mostrarError(message) {
    errorElement.textContent = mensaje;
    errorElement.style.display = "block";
    setTimeout(() => {
        errorElement.style.display = "none";
    }, 3000);
}

// funcion para mostrar loading

function toggleLoading(show) {
    loadingElement.style.display = show ? "block" : "none";
}

//funcion para eliminar usuario
async function eliminarUsuario(id) {
    try {
        const response = await fetch(`${API_URL}/usuarios/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error al eliminar usuario");
        }
        cargarUsuarios();
    } catch (error) {
        mostrarError(error.message);
    }
}

//funcion para crear el html de un usuario

function crearCardUsuario(usuario) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <h3>${usuario.nombre}</h3>
    <p>Email: ${usuario.email}</p>
    <p>Rol: ${usuario.rol}</p>
    <button onclick="eliminarUsuario(${usuario.id})" class="button" style="background-color:#ff4444;">Eliminar</button>`;

    return card;
}

//funcion para cargar usuarios

async function cargarUsuarios() {
    toggleLoading(true);
    try {
        const response = await fetch(`${API_URL}/usuarios`);
        if (!response.ok) {
            throw new Error("Error al cargar usuarios");
        }
        const usuarios = await response.json();
        usuariosContainer.innerHTML = "";
        usuarios.forEach((usuario) => {
            usuariosContainer.appendChild(crearCardUsuario(usuario));
        });
        toggleLoading(false);
    } catch (error) {
        mostrarError(error.message);
    }
}
cargarUsuarios();
