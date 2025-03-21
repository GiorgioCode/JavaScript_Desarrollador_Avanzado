// Implementación de un almacén de estado global para compartir datos entre componentes
const Store = {
    // Estado inicial que se carga desde localStorage o usa valores predeterminados
    state: {
        tasks: JSON.parse(localStorage.getItem("tasks")) || [], // Lista de tareas o array vacío
        user: JSON.parse(localStorage.getItem("user")) || { name: "Usuario" }, // Datos del usuario
        theme: localStorage.getItem("theme") || "light", // Tema de la aplicación
    },

    // Array para almacenar funciones callback que se ejecutarán cuando el estado cambie
    subscribers: [],

    // Método para acceder al estado actual
    getState() {
        return this.state;
    },

    // Método para actualizar el estado y notificar a los observadores
    setState(newState) {
        // Actualiza el estado combinando el estado actual con las nuevas propiedades
        this.state = { ...this.state, ...newState };

        // Persiste los cambios en localStorage según qué parte del estado se actualizó
        if (newState.tasks) {
            localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
        }
        if (newState.user) {
            localStorage.setItem("user", JSON.stringify(this.state.user));
        }
        if (newState.theme) {
            localStorage.setItem("theme", this.state.theme);
        }

        // Notifica a todos los suscriptores sobre el cambio de estado
        this.notifySubscribers();
    },

    // Método para suscribirse a cambios en el estado
    // Devuelve una función para cancelar la suscripción
    subscribe(callback) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter((cb) => cb !== callback);
        };
    },

    // Método que ejecuta todos los callbacks de suscriptores con el estado actual
    notifySubscribers() {
        this.subscribers.forEach((callback) => callback(this.state));
    },
};

// Función utilitaria para mostrar notificaciones temporales
function showNotification(message, duration = 3000) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("visible"); // Hace visible la notificación

    // Oculta la notificación después del tiempo especificado
    setTimeout(() => {
        notification.classList.remove("visible");
    }, duration);
}

// Componente para la página de inicio
function HomeComponent() {
    const element = document.createElement("div"); // Crea un contenedor para el componente
    const state = Store.getState(); // Obtiene el estado actual

    // Define el contenido HTML del componente
    element.innerHTML = `
        <h1>Hola, ${state.user.name}</h1>
        <p>Bienvenido a nuestra aplicación SPA para gestión de tareas.</p>
        <p>Tienes ${state.tasks.length} tareas en total.</p>
        <button id="go-to-tasks">Ver mis tareas</button>
        <div style="margin-top: 20px">
            <label>Tu nombre: 
                <input type="text" id="username" value="${state.user.name}">
            </label>
            <button id="save-user">Guardar</button>
        </div>
    `;

    // Agrega event listeners después de que el elemento esté en el DOM
    setTimeout(() => {
        // Configura la navegación al hacer clic en el botón
        const button = element.querySelector("#go-to-tasks");
        button.addEventListener("click", () => {
            location.hash = "/tasks"; // Cambia el hash para navegar
        });

        // Maneja la actualización del nombre de usuario
        const saveButton = element.querySelector("#save-user");
        saveButton.addEventListener("click", () => {
            const username = element.querySelector("#username").value;
            Store.setState({ user: { name: username } }); // Actualiza el estado global
            showNotification("Nombre guardado correctamente");
        });
    }, 0);

    return element; // Devuelve el elemento creado
}

// Componente para la página de tareas
function TasksComponent() {
    const element = document.createElement("div");

    // Función interna para renderizar la lista de tareas según el estado actual
    const renderTasks = () => {
        const taskList = element.querySelector("#task-list");
        const state = Store.getState();

        if (!taskList) return; // Evita errores si el elemento no existe

        taskList.innerHTML = ""; // Limpia la lista antes de volver a renderizar

        // Crea un elemento para cada tarea
        state.tasks.forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.className = `task ${task.completed ? "completed" : ""}`;

            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="toggle-btn" data-id="${index}">
                        ${task.completed ? "Reactivar" : "Completar"}
                    </button>
                    <button class="delete-btn" data-id="${index}">Eliminar</button>
                </div>
            `;

            taskList.appendChild(taskItem);
        });
    };

    // Define el contenido HTML inicial del componente
    element.innerHTML = `
        <h1>Mis Tareas</h1>
        <p>Hola ${Store.getState().user.name}, administra tus tareas aquí</p>
        <div class="task-form">
            <input type="text" id="new-task" placeholder="Nueva tarea">
            <button id="add-task">Añadir</button>
        </div>
        <div id="task-list"></div>
    `;

    // Configura la interactividad después de que el elemento esté en el DOM
    setTimeout(() => {
        const addButton = element.querySelector("#add-task");
        const newTaskInput = element.querySelector("#new-task");

        // Se suscribe a cambios en el estado para actualizar la UI automáticamente
        const unsubscribe = Store.subscribe(() => {
            renderTasks();
        });

        // Maneja la adición de nuevas tareas
        addButton.addEventListener("click", () => {
            const text = newTaskInput.value.trim();
            if (text) {
                const state = Store.getState();
                const newTasks = [...state.tasks, { text, completed: false }];
                Store.setState({ tasks: newTasks }); // Actualiza el estado global
                newTaskInput.value = "";
                showNotification("Tarea añadida correctamente");
            }
        });

        // Usa delegación de eventos para manejar clics en los botones de cada tarea
        element.addEventListener("click", (e) => {
            // Maneja el cambio de estado (completar/reactivar) de una tarea
            if (e.target.classList.contains("toggle-btn")) {
                const id = parseInt(e.target.dataset.id);
                const state = Store.getState();
                const newTasks = [...state.tasks];
                newTasks[id].completed = !newTasks[id].completed;
                Store.setState({ tasks: newTasks });
                showNotification("Estado de tarea actualizado");
            }
            // Maneja la eliminación de una tarea
            else if (e.target.classList.contains("delete-btn")) {
                const id = parseInt(e.target.dataset.id);
                const state = Store.getState();
                const newTasks = state.tasks.filter((_, index) => index !== id);
                Store.setState({ tasks: newTasks });
                showNotification("Tarea eliminada");
            }
        });

        // Renderiza las tareas iniciales
        renderTasks();

        // Retorna una función de limpieza para cancelar suscripciones
        return () => {
            unsubscribe();
        };
    }, 0);

    return element;
}

// Componente para la página "Acerca de"
function AboutComponent() {
    const element = document.createElement("div");
    const state = Store.getState(); // Obtiene el estado actual

    // Define el contenido HTML del componente
    element.innerHTML = `
        <h1>Acerca de esta aplicación</h1>
        <p>Hola ${state.user.name}, esta es una aplicación SPA desarrollada con JavaScript vanilla.</p>
        <p>Características principales:</p>
        <ul>
            <li>Enrutamiento basado en hash (#)</li>
            <li>Componentes modulares</li>
            <li>Estado global compartido</li>
            <li>Persistencia con localStorage</li>
        </ul>
    `;

    return element;
}

// Implementación del enrutador para cambiar entre componentes
class Router {
    constructor(routes) {
        this.routes = routes; // Almacena las rutas disponibles
        this.rootElem = document.getElementById("app"); // Elemento donde se renderizarán los componentes
        this.currentComponent = null; // Referencia al componente actual

        // Escucha cambios en el hash para actualizar la vista
        window.addEventListener("hashchange", () => {
            this.render();
        });

        // Renderiza el componente inicial
        this.render();
    }

    // Método para renderizar el componente correspondiente a la ruta actual
    render() {
        const url = location.hash.slice(1) || "/"; // Obtiene la ruta desde el hash

        // Busca la ruta en la configuración
        const route = this.routes.find((route) => route.path === url);

        if (route) {
            // Si encuentra la ruta, limpia el contenedor y renderiza el componente
            this.rootElem.innerHTML = "";
            this.currentComponent = route.component();
            this.rootElem.appendChild(this.currentComponent);
        } else {
            // Si no encuentra la ruta, muestra página no encontrada
            this.rootElem.innerHTML = "<h1>Página no encontrada</h1>";
        }
    }
}

// Configuración de rutas disponibles
const routes = [
    { path: "/", component: HomeComponent },
    { path: "/tasks", component: TasksComponent },
    { path: "/about", component: AboutComponent },
];

// Inicializa el router con las rutas definidas
const router = new Router(routes);
