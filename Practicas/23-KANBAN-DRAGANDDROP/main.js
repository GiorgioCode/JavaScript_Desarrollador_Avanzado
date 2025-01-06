// ================ VARIABLES GLOBALES ================
// Variable que almacenará la referencia a la tarea que está siendo arrastrada
// Se usa null como valor inicial ya que al principio no hay ninguna tarea siendo arrastrada
let draggedTask = null;

// Creamos una instancia del modal de Bootstrap
// Esto nos permite controlar programáticamente la apertura/cierre del modal de nueva tarea
const modal = new bootstrap.Modal(document.getElementById("addTaskModal"));

// Estructura de datos principal que representa nuestro tablero
// Usamos un objeto con arrays para cada columna para mejor organización
const board = {
    todo: [], // Array para tareas pendientes
    inProgress: [], // Array para tareas en proceso
    done: [], // Array para tareas completadas
};

// ================ INICIALIZACIÓN ================
// Event listener que se ejecuta cuando el DOM está completamente cargado
// Esto asegura que todos los elementos HTML estén disponibles antes de manipularlos
document.addEventListener("DOMContentLoaded", () => {
    loadBoardData(); // Primero cargamos datos guardados
    setupDragAndDrop(); // Configuramos funcionalidad de arrastrar
    updateCounters(); // Actualizamos contadores de tareas
});

// ================ GESTIÓN DE DATOS ================
/**
 * Carga los datos previamente guardados en localStorage
 * Esta función es crucial para la persistencia de datos
 */
function loadBoardData() {
    // Intentamos obtener datos guardados previamente
    const savedData = localStorage.getItem("kanbanBoard");

    // Si existen datos guardados...
    if (savedData) {
        // Convertimos el string JSON a objeto JavaScript
        const boardData = JSON.parse(savedData);

        // Iteramos sobre cada columna del tablero
        Object.keys(boardData).forEach((column) => {
            // Para cada tarea en la columna, creamos una nueva tarjeta
            boardData[column].forEach((task) => {
                // Recreamos la tarjeta visual con los datos guardados
                createTaskCard(task, column);
            });
        });
    }
}

/**
 * Actualiza los contadores visuales de tareas en cada columna
 * Importante para dar feedback visual al usuario
 */
function updateCounters() {
    // Iteramos sobre cada columna del tablero
    Object.keys(board).forEach((column) => {
        // Encontramos el elemento de la columna
        const columnEl = document.querySelector(`[data-column="${column}"]`);
        // Encontramos el elemento del contador
        const counter = columnEl.querySelector(".task-counter");
        // Contamos las tareas en la columna
        const taskCount = columnEl.querySelector(".task-list").children.length;
        // Actualizamos el texto del contador
        counter.textContent = `(${taskCount})`;
    });
}

/**
 * Guarda el estado actual del tablero en localStorage
 * Esta función es clave para la persistencia de datos
 */
function saveBoardData() {
    // Creamos un objeto para almacenar el estado actual
    const boardData = {
        todo: [],
        inProgress: [],
        done: [],
    };

    // Recopilamos los datos de cada columna
    Object.keys(boardData).forEach((column) => {
        // Seleccionamos la lista de tareas de la columna
        const columnEl = document.querySelector(
            `[data-column="${column}"] .task-list`
        );
        // Obtenemos todas las tarjetas de tareas
        const tasks = columnEl.querySelectorAll(".task-card");

        // Para cada tarjeta, extraemos sus datos
        tasks.forEach((task) => {
            boardData[column].push({
                title: task.querySelector("h5").textContent,
                description: task.querySelector("p").textContent,
                dueDate: task
                    .querySelector("small")
                    .textContent.replace("Vence: ", ""),
                priority: task.dataset.priority,
            });
        });
    });

    // Guardamos en localStorage como string JSON
    localStorage.setItem("kanbanBoard", JSON.stringify(boardData));
    // Actualizamos los contadores visuales
    updateCounters();
}

// ================ GESTIÓN DE TAREAS ================
/**
 * Elimina una tarea del tablero
 * @param {Event} event - Evento del click
 * @param {HTMLElement} taskCard - Elemento DOM de la tarea a eliminar
 */
function deleteTask(event, taskCard) {
    // Prevenimos la propagación del evento para evitar conflictos con drag&drop
    event.stopPropagation();

    // Pedimos confirmación al usuario
    if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
        // Eliminamos la tarjeta del DOM
        taskCard.remove();
        // Guardamos el nuevo estado
        saveBoardData();
    }
}

/**
 * Crea una nueva tarjeta de tarea
 * Esta es una función central en la aplicación
 */
function createTaskCard(taskData, column = "todo") {
    // Creamos el elemento contenedor de la tarjeta
    const taskCard = document.createElement("div");
    // Asignamos las clases necesarias
    taskCard.className = "task-card";
    // Habilitamos el arrastre
    taskCard.draggable = true;
    // Guardamos la prioridad como dato del elemento
    taskCard.dataset.priority = taskData.priority;

    // Construimos el HTML interno de la tarjeta
    // Nota: Usamos template literals para mejor legibilidad
    taskCard.innerHTML = `
        <button class="delete-btn" onclick="deleteTask(event, this.parentElement)">&times;</button>
        <span class="badge priority-${taskData.priority} ${
        taskData.priority !== "medium" ? "text-white" : ""
    }">
            ${
                taskData.priority.charAt(0).toUpperCase() +
                taskData.priority.slice(1)
            }
        </span>
        <h5>${taskData.title}</h5>
        <p class="mb-1">${taskData.description}</p>
        <small class="text-muted">Vence: ${taskData.dueDate}</small>
    `;

    // Añadimos la tarjeta a la columna correspondiente
    const columnEl = document.querySelector(
        `[data-column="${column}"] .task-list`
    );
    columnEl.appendChild(taskCard);

    // Configuramos los eventos de drag and drop
    taskCard.addEventListener("dragstart", handleDragStart);
    taskCard.addEventListener("dragend", handleDragEnd);

    // Actualizamos contadores
    updateCounters();
    return taskCard;
}

// ================ DRAG AND DROP ================
/**
 * Configura los eventos de drag and drop para todas las columnas
 * Esta configuración es esencial para la funcionalidad de arrastre
 */
function setupDragAndDrop() {
    // Seleccionamos todas las columnas
    const columns = document.querySelectorAll(".kanban-column");

    // Para cada columna, añadimos los event listeners necesarios
    columns.forEach((column) => {
        column.addEventListener("dragover", handleDragOver);
        column.addEventListener("dragleave", handleDragLeave);
        column.addEventListener("drop", handleDrop);
    });
}

// === MANEJADORES DE EVENTOS DRAG AND DROP ===
/**
 * Se ejecuta cuando se comienza a arrastrar una tarea
 */
function handleDragStart(e) {
    // Guardamos referencia a la tarea que se está arrastrando
    draggedTask = this;
    // Añadimos clase visual para feedback
    this.classList.add("dragging");
}

/**
 * Se ejecuta cuando se termina de arrastrar
 */
function handleDragEnd(e) {
    // Removemos clase visual
    this.classList.remove("dragging");
    // Guardamos el nuevo estado
    saveBoardData();
}

/**
 * Se ejecuta cuando una tarea está sobre una columna
 */
function handleDragOver(e) {
    // Prevenimos el comportamiento por defecto
    // Esto es necesario para permitir el drop
    e.preventDefault();
    // Añadimos clase visual
    this.classList.add("dragover");
}

/**
 * Se ejecuta cuando una tarea sale de una columna
 */
function handleDragLeave(e) {
    // Removemos clase visual
    this.classList.remove("dragover");
}

/**
 * Se ejecuta cuando se suelta una tarea en una columna
 * Esta función es crítica para el funcionamiento del drag & drop
 */
function handleDrop(e) {
    // Prevenimos comportamiento por defecto
    e.preventDefault();
    // Removemos clase visual
    this.classList.remove("dragover");

    // Obtenemos la lista de tareas de la columna
    const taskList = this.querySelector(".task-list");

    // Si tenemos una tarea siendo arrastrada y una lista válida
    if (draggedTask && taskList) {
        // Movemos la tarea a la nueva columna
        taskList.appendChild(draggedTask);
        // Guardamos el nuevo estado
        saveBoardData();
    }
}

// ================ GESTIÓN DEL MODAL ================
/**
 * Muestra el modal para añadir una nueva tarea
 */
function showAddTaskForm() {
    modal.show();
}

/**
 * Añade una nueva tarea desde el formulario modal
 * Esta función se ejecuta cuando se confirma la creación de una tarea
 */
function addNewTask() {
    // Recopilamos los datos del formulario
    const taskData = {
        title: document.getElementById("taskTitle").value,
        description: document.getElementById("taskDescription").value,
        dueDate: document.getElementById("taskDueDate").value,
        priority: document.getElementById("taskPriority").value,
    };

    // Validación básica - no permitir tareas sin título
    if (!taskData.title) return;

    // Creamos la nueva tarjeta
    createTaskCard(taskData);
    // Guardamos el estado
    saveBoardData();

    // Limpiamos y cerramos el modal
    modal.hide();
    document.getElementById("addTaskForm").reset();
}
