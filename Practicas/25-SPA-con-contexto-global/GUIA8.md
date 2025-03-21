# Clase 8: Desarrollo de una Single Page Application (SPA) con JavaScript

## Introducción a las SPAs

Una Single Page Application (SPA) es una aplicación web que carga una sola página HTML y la actualiza dinámicamente según la interacción del usuario, sin necesidad de recargar la página completa.

### Ventajas de las SPAs:

-   Mejor experiencia de usuario
-   Mayor rapidez tras la carga inicial
-   Navegación fluida sin recargas

## Patron Observer:

El patrón de suscripción, también conocido como patrón observador, funciona así:

-   Objeto observable: Mantiene una lista de suscriptores.
-   Suscriptores: Se registran para recibir actualizaciones.
-   Notificación: Cuando el objeto observable cambia, notifica a todos los suscriptores.
-   Desuscripción: Los suscriptores pueden dejar de recibir actualizaciones cuando quieran.
    Este patrón permite una comunicación flexible entre componentes sin que estén fuertemente acoplados. Es útil para manejar eventos o cambios de estado en sistemas distribuidos o interfaces de usuario reactivas.

## Estructura básica de nuestra SPA

## Código completo de la SPA

```html
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SPA - Gestor de Tareas</title>
        <style>
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
            }

            header {
                background: #333;
                color: #fff;
                padding: 1rem;
            }

            nav {
                display: flex;
                gap: 1rem;
            }

            .nav-link {
                color: white;
                text-decoration: none;
            }

            #app {
                padding: 2rem;
                max-width: 800px;
                margin: 0 auto;
            }

            .task {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem;
                margin-bottom: 0.5rem;
                background-color: #f4f4f4;
                border-radius: 4px;
            }

            .task.completed {
                text-decoration: line-through;
                opacity: 0.7;
            }

            button {
                padding: 0.5rem 1rem;
                background: #333;
                color: #fff;
                border: none;
                cursor: pointer;
                margin-right: 0.5rem;
            }

            input[type="text"] {
                padding: 0.5rem;
                width: 70%;
                margin-right: 1rem;
            }

            .notification {
                position: fixed;
                top: 10px;
                right: 10px;
                background: #4caf50;
                color: white;
                padding: 10px;
                border-radius: 4px;
                opacity: 0;
                transition: opacity 0.3s;
            }

            .notification.visible {
                opacity: 1;
            }
        </style>
    </head>
    <body>
        <header>
            <nav>
                <a href="#/" class="nav-link">Inicio</a>
                <a href="#/tasks" class="nav-link">Tareas</a>
                <a href="#/about" class="nav-link">Acerca de</a>
            </nav>
        </header>

        <main id="app"></main>
        <div id="notification" class="notification"></div>

        <script>
            // Estado Global Simple
            const Store = {
                state: {
                    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
                    user: JSON.parse(localStorage.getItem("user")) || {
                        name: "Usuario",
                    },
                    theme: localStorage.getItem("theme") || "light",
                },

                // Suscriptores que escuchan cambios
                subscribers: [],

                // Método para obtener el estado
                getState() {
                    return this.state;
                },

                // Método para modificar el estado
                setState(newState) {
                    this.state = { ...this.state, ...newState };

                    // Guardar en localStorage
                    if (newState.tasks) {
                        localStorage.setItem(
                            "tasks",
                            JSON.stringify(this.state.tasks)
                        );
                    }
                    if (newState.user) {
                        localStorage.setItem(
                            "user",
                            JSON.stringify(this.state.user)
                        );
                    }
                    if (newState.theme) {
                        localStorage.setItem("theme", this.state.theme);
                    }

                    // Notificar a todos los suscriptores
                    this.notifySubscribers();
                },

                // Suscribirse a cambios
                subscribe(callback) {
                    this.subscribers.push(callback);
                    return () => {
                        this.subscribers = this.subscribers.filter(
                            (cb) => cb !== callback
                        );
                    };
                },

                // Notificar a los suscriptores
                notifySubscribers() {
                    this.subscribers.forEach((callback) =>
                        callback(this.state)
                    );
                },
            };

            // Utilidad para mostrar notificaciones
            function showNotification(message, duration = 3000) {
                const notification = document.getElementById("notification");
                notification.textContent = message;
                notification.classList.add("visible");

                setTimeout(() => {
                    notification.classList.remove("visible");
                }, duration);
            }

            // Componentes
            function HomeComponent() {
                const element = document.createElement("div");
                const state = Store.getState();

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

                setTimeout(() => {
                    const button = element.querySelector("#go-to-tasks");
                    button.addEventListener("click", () => {
                        location.hash = "/tasks";
                    });

                    const saveButton = element.querySelector("#save-user");
                    saveButton.addEventListener("click", () => {
                        const username =
                            element.querySelector("#username").value;
                        Store.setState({ user: { name: username } });
                        showNotification("Nombre guardado correctamente");
                    });
                }, 0);

                return element;
            }

            function TasksComponent() {
                const element = document.createElement("div");

                const renderTasks = () => {
                    const taskList = element.querySelector("#task-list");
                    const state = Store.getState();

                    if (!taskList) return;

                    taskList.innerHTML = "";

                    state.tasks.forEach((task, index) => {
                        const taskItem = document.createElement("div");
                        taskItem.className = `task ${
                            task.completed ? "completed" : ""
                        }`;

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

                element.innerHTML = `
                <h1>Mis Tareas</h1>
                <p>Hola ${
                    Store.getState().user.name
                }, administra tus tareas aquí</p>
                <div class="task-form">
                    <input type="text" id="new-task" placeholder="Nueva tarea">
                    <button id="add-task">Añadir</button>
                </div>
                <div id="task-list"></div>
            `;

                setTimeout(() => {
                    const addButton = element.querySelector("#add-task");
                    const newTaskInput = element.querySelector("#new-task");

                    // Suscribirse a cambios en el estado
                    const unsubscribe = Store.subscribe(() => {
                        renderTasks();
                    });

                    addButton.addEventListener("click", () => {
                        const text = newTaskInput.value.trim();
                        if (text) {
                            const state = Store.getState();
                            const newTasks = [
                                ...state.tasks,
                                { text, completed: false },
                            ];
                            Store.setState({ tasks: newTasks });
                            newTaskInput.value = "";
                            showNotification("Tarea añadida correctamente");
                        }
                    });

                    element.addEventListener("click", (e) => {
                        if (e.target.classList.contains("toggle-btn")) {
                            const id = parseInt(e.target.dataset.id);
                            const state = Store.getState();
                            const newTasks = [...state.tasks];
                            newTasks[id].completed = !newTasks[id].completed;
                            Store.setState({ tasks: newTasks });
                            showNotification("Estado de tarea actualizado");
                        } else if (e.target.classList.contains("delete-btn")) {
                            const id = parseInt(e.target.dataset.id);
                            const state = Store.getState();
                            const newTasks = state.tasks.filter(
                                (_, index) => index !== id
                            );
                            Store.setState({ tasks: newTasks });
                            showNotification("Tarea eliminada");
                        }
                    });

                    renderTasks();

                    // Limpieza al desmontar el componente
                    return () => {
                        unsubscribe();
                    };
                }, 0);

                return element;
            }

            function AboutComponent() {
                const element = document.createElement("div");
                const state = Store.getState();

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

            // Router
            class Router {
                constructor(routes) {
                    this.routes = routes;
                    this.rootElem = document.getElementById("app");
                    this.currentComponent = null;

                    window.addEventListener("hashchange", () => {
                        this.render();
                    });

                    this.render();
                }

                render() {
                    const url = location.hash.slice(1) || "/";

                    const route = this.routes.find(
                        (route) => route.path === url
                    );

                    if (route) {
                        this.rootElem.innerHTML = "";
                        this.currentComponent = route.component();
                        this.rootElem.appendChild(this.currentComponent);
                    } else {
                        this.rootElem.innerHTML =
                            "<h1>Página no encontrada</h1>";
                    }
                }
            }

            // Inicialización
            const routes = [
                { path: "/", component: HomeComponent },
                { path: "/tasks", component: TasksComponent },
                { path: "/about", component: AboutComponent },
            ];

            const router = new Router(routes);
        </script>
    </body>
</html>
```
