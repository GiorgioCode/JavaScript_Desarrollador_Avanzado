// Clase principal que maneja toda la lógica de gestión financiera
class FinanceManager {
    // Constructor: inicializa el estado de la aplicación
    constructor() {
        // Carga las transacciones desde localStorage o inicia un array vacío si no hay datos
        this.transactions =
            JSON.parse(localStorage.getItem("transactions")) || [];
        // Carga las metas de ahorro desde localStorage o inicia un array vacío si no hay datos
        this.savingGoals =
            JSON.parse(localStorage.getItem("savingGoals")) || [];
        // Carga las transacciones de ahorro desde localStorage o inicia un array vacío si no hay datos
        this.savingsTransactions =
            JSON.parse(localStorage.getItem("savingsTransactions")) || [];
    }

    // Método para agregar una nueva transacción al sistema
    addTransaction(transaction) {
        // Genera un ID único usando la fecha actual en milisegundos
        transaction.id = Date.now();
        // Agrega la fecha actual a la transacción en formato ISO
        transaction.date = new Date().toISOString();
        // Añade la transacción al array de transacciones
        this.transactions.push(transaction);
        // Guarda los cambios en localStorage
        this.saveData();
    }

    // Método para agregar una nueva meta de ahorro
    addSavingGoal(goal) {
        // Genera un ID único para la meta
        goal.id = Date.now();
        // Inicializa el progreso de la meta en 0
        goal.progress = 0;
        // Añade la meta al array de metas
        this.savingGoals.push(goal);
        // Guarda los cambios
        this.saveData();
    }

    // Método para registrar un nuevo ahorro hacia una meta específica
    addSavingTransaction(goalId, amount) {
        // Crea un objeto con los datos de la transacción de ahorro
        const savingTransaction = {
            id: Date.now(),
            goalId, // ID de la meta asociada
            amount, // Cantidad ahorrada
            date: new Date().toISOString(), // Fecha del ahorro
        };
        // Agrega la transacción al array de transacciones de ahorro
        this.savingsTransactions.push(savingTransaction);
        // Actualiza el progreso de la meta correspondiente
        this.updateSavingGoalProgress(goalId, amount);
        // Guarda los cambios
        this.saveData();
    }

    // Método para actualizar el progreso de una meta de ahorro
    updateSavingGoalProgress(id, amount) {
        // Busca la meta específica por su ID
        const goal = this.savingGoals.find((g) => g.id === id);
        if (goal) {
            // Actualiza el progreso sin exceder el objetivo
            goal.progress = Math.min(goal.target, goal.progress + amount);
            // Guarda los cambios
            this.saveData();
        }
    }

    // Método para calcular el balance total (ingresos - gastos)
    getBalance() {
        // Reduce el array de transacciones a un solo número
        return this.transactions.reduce(
            (acc, curr) =>
                // Suma los ingresos y resta los gastos
                acc + (curr.type === "ingreso" ? curr.amount : -curr.amount),
            0
        );
    }

    // Método para filtrar transacciones por tipo
    getTransactionsByType(type) {
        // Devuelve un array con solo las transacciones del tipo especificado
        return this.transactions.filter((t) => t.type === type);
    }

    // Método para obtener el balance por categorías
    getTransactionsByCategory() {
        // Reduce el array de transacciones a un objeto con totales por categoría
        return this.transactions.reduce((acc, curr) => {
            // Si la categoría no existe, la inicializa
            if (!acc[curr.category]) acc[curr.category] = 0;
            // Suma o resta según el tipo de transacción
            acc[curr.category] +=
                curr.type === "ingreso" ? curr.amount : -curr.amount;
            return acc;
        }, {});
    }

    // Método para guardar todos los datos en localStorage
    saveData() {
        // Guarda las transacciones regulares
        localStorage.setItem("transactions", JSON.stringify(this.transactions));
        // Guarda las metas de ahorro
        localStorage.setItem("savingGoals", JSON.stringify(this.savingGoals));
        // Guarda las transacciones de ahorro
        localStorage.setItem(
            "savingsTransactions",
            JSON.stringify(this.savingsTransactions)
        );
    }
}

// Clase para manejar la navegación SPA (Single Page Application)
class Router {
    // Constructor: recibe las rutas y una instancia del FinanceManager
    constructor(routes, financeManager) {
        // Almacena las rutas y el gestor financiero
        this.routes = routes;
        this.financeManager = financeManager;

        // Maneja el evento de navegación del navegador (botón atrás/adelante)
        window.addEventListener("popstate", () => this.handleRoute());

        // Maneja los clics en elementos con atributo data-route
        document.addEventListener("click", (e) => {
            if (e.target.matches("[data-route]")) {
                e.preventDefault(); // Previene la navegación normal
                this.navigate(e.target.dataset.route); // Navega a la ruta especificada
            }
        });
    }

    // Método para navegar a una nueva ruta
    navigate(path) {
        // Actualiza la URL sin recargar la página
        window.history.pushState({}, "", path);
        // Maneja la nueva ruta
        this.handleRoute();
    }

    // Método para manejar el cambio de rutas
    handleRoute() {
        // Obtiene la ruta actual de la URL
        const path = window.location.pathname;
        // Obtiene la configuración de la ruta o usa la de 404 si no existe
        const route = this.routes[path] || this.routes["/404"];
        // Obtiene el contenedor principal
        const appContainer = document.getElementById("app");
        // Limpia el contenedor
        appContainer.innerHTML = "";
        // Renderiza la vista correspondiente
        route.render(appContainer, this.financeManager);
    }
}

// Definición de las rutas y sus vistas correspondientes
const routes = {
    // Ruta principal - Dashboard
    "/": {
        render: (container, manager) => {
            // Renderiza el HTML del dashboard
            container.innerHTML = `
                <div class="dashboard-grid">
                    <!-- Tarjeta de Balance Total -->
                    <div class="card">
                        <h2>Balance Total</h2>
                        <h3 class="${
                            manager.getBalance() >= 0 ? "income" : "expense"
                        }">
                            $${manager.getBalance().toFixed(2)}
                        </h3>
                    </div>
                    <!-- Tarjeta de Ingresos Totales -->
                    <div class="card">
                        <h2>Ingresos Totales</h2>
                        <h3 class="income">
                            $${manager
                                .getTransactionsByType("ingreso")
                                .reduce((acc, curr) => acc + curr.amount, 0)
                                .toFixed(2)}
                        </h3>
                    </div>
                    <!-- Tarjeta de Gastos Totales -->
                    <div class="card">
                        <h2>Gastos Totales</h2>
                        <h3 class="expense">
                            $${manager
                                .getTransactionsByType("gasto")
                                .reduce((acc, curr) => acc + curr.amount, 0)
                                .toFixed(2)}
                        </h3>
                    </div>
                </div>
                <!-- Gráfico de categorías -->
                <div class="card">
                    <h2>Distribución por Categorías</h2>
                    <canvas id="categoryChart"></canvas>
                </div>
            `;

            // Obtiene los datos para el gráfico
            const categoryData = manager.getTransactionsByCategory();
            // Obtiene el contexto del canvas para el gráfico
            const ctx = document
                .getElementById("categoryChart")
                .getContext("2d");
            // Crea el gráfico de barras
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: Object.keys(categoryData), // Nombres de las categorías
                    datasets: [
                        {
                            label: "Balance por Categoría",
                            data: Object.values(categoryData), // Valores de las categorías
                            // Colores de fondo según el valor sea positivo o negativo
                            backgroundColor: Object.values(categoryData).map(
                                (value) =>
                                    value >= 0
                                        ? "rgba(46, 204, 113, 0.5)"
                                        : "rgba(231, 76, 60, 0.5)"
                            ),
                            // Colores de borde según el valor
                            borderColor: Object.values(categoryData).map(
                                (value) =>
                                    value >= 0
                                        ? "rgb(46, 204, 113)"
                                        : "rgb(231, 76, 60)"
                            ),
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: { y: { beginAtZero: true } }, // Comienza el eje Y en cero
                },
            });
        },
    },

    // Ruta de transacciones
    "/transacciones": {
        render: (container, manager) => {
            // Renderiza la lista de transacciones
            container.innerHTML = `
                <div class="card">
                    <h2>Transacciones Recientes</h2>
                    <ul class="transaction-list">
                        <!-- Mapea cada transacción a un elemento de lista -->
                        ${manager.transactions
                            .map(
                                (t) => `
                            <li class="transaction-item">
                                <div>
                                    <strong>${t.description}</strong>
                                    <p>${t.category} - ${new Date(
                                    t.date
                                ).toLocaleDateString()}</p>
                                </div>
                                <span class="${
                                    t.type === "ingreso" ? "income" : "expense"
                                }">
                                    ${
                                        t.type === "ingreso" ? "+" : "-"
                                    }$${t.amount.toFixed(2)}
                                </span>
                            </li>
                        `
                            )
                            .join("")}
                    </ul>
                </div>
            `;
        },
    },

    // Ruta para agregar transacciones
    "/agregar": {
        render: (container, manager) => {
            // Renderiza el formulario para agregar transacciones
            container.innerHTML = `
                <div class="card">
                    <h2>Agregar Transacción</h2>
                    <form class="transaction-form" id="transactionForm">
                        <!-- Selector de tipo de transacción -->
                        <div class="form-group">
                            <label>Tipo</label>
                            <select name="type" required>
                                <option value="ingreso">Ingreso</option>
                                <option value="gasto">Gasto</option>
                            </select>
                        </div>
                        <!-- Selector de categoría -->
                        <div class="form-group">
                            <label>Categoría</label>
                            <select name="category" required>
                                <option value="salario">Salario</option>
                                <option value="alimentos">Alimentos</option>
                                <option value="transporte">Transporte</option>
                                <option value="entretenimiento">Entretenimiento</option>
                                <option value="servicios">Servicios</option>
                                <option value="otros">Otros</option>
                            </select>
                        </div>
                        <!-- Campo de descripción -->
                        <div class="form-group">
                            <label>Descripción</label>
                            <input type="text" name="description" required>
                        </div>
                        <!-- Campo de monto -->
                        <div class="form-group">
                            <label>Monto</label>
                            <input type="number" name="amount" step="0.01" min="0" required>
                        </div>
                        <button type="submit">Agregar Transacción</button>
                    </form>
                </div>
            `;

            // Maneja el envío del formulario de transacción
            document
                .getElementById("transactionForm")
                .addEventListener("submit", (e) => {
                    e.preventDefault(); // Previene el envío normal del formulario
                    const formData = new FormData(e.target); // Obtiene los datos del formulario
                    // Crea y agrega la nueva transacción
                    manager.addTransaction({
                        type: formData.get("type"),
                        category: formData.get("category"),
                        description: formData.get("description"),
                        amount: parseFloat(formData.get("amount")),
                    });
                    router.navigate("/"); // Vuelve al dashboard
                });
        },
    },
    // Ruta de metas de ahorro
    "/metas": {
        render: (container, manager) => {
            // Renderiza el contenedor principal de metas de ahorro
            container.innerHTML = `
                <div class="dashboard-grid">
                    <!-- Mapea y muestra cada meta de ahorro existente -->
                    ${manager.savingGoals
                        .map(
                            (goal) => `
                        <div class="card">
                            <!-- Detalles de la meta -->
                            <h3>${goal.name}</h3>
                            <p>Meta: $${goal.target.toFixed(2)}</p>
                            <p>Progreso: $${goal.progress.toFixed(2)}</p>
                            
                            <!-- Barra de progreso visual -->
                            <progress value="${goal.progress}" max="${
                                goal.target
                            }"></progress>
                            
                            <!-- Formulario para agregar ahorros a esta meta -->
                            <form class="saving-form" data-goal-id="${goal.id}">
                                <div class="form-group">
                                    <label>Registrar Ahorro</label>
                                    <div style="display: flex; gap: 0.5rem;">
                                        <input type="number" 
                                               name="amount" 
                                               step="0.01" 
                                               min="0" 
                                               required>
                                        <button type="submit">Guardar</button>
                                    </div>
                                </div>
                            </form>
                            
                            <!-- Historial de ahorros para esta meta -->
                            <div class="savings-history">
                                <h4>Historial de Ahorros</h4>
                                <ul class="transaction-list">
                                    ${manager.savingsTransactions
                                        .filter((t) => t.goalId === goal.id)
                                        .map(
                                            (t) => `
                                            <li class="transaction-item">
                                                <span>$${t.amount.toFixed(
                                                    2
                                                )}</span>
                                                <small>${new Date(
                                                    t.date
                                                ).toLocaleDateString()}</small>
                                            </li>
                                        `
                                        )
                                        .join("")}
                                </ul>
                            </div>
                        </div>
                    `
                        )
                        .join("")}
                </div>

                <!-- Formulario para crear una nueva meta de ahorro -->
                <div class="card">
                    <h2>Nueva Meta de Ahorro</h2>
                    <form class="transaction-form" id="goalForm">
                        <div class="form-group">
                            <label>Nombre de la Meta</label>
                            <input type="text" 
                                   name="name" 
                                   required 
                                   placeholder="Ej: Vacaciones">
                        </div>
                        <div class="form-group">
                            <label>Monto Objetivo</label>
                            <input type="number" 
                                   name="target" 
                                   step="0.01" 
                                   min="0" 
                                   required 
                                   placeholder="Ingresa el monto">
                        </div>
                        <button type="submit">Crear Nueva Meta</button>
                    </form>
                </div>
            `;

            // Manejador del formulario para crear nueva meta
            document
                .getElementById("goalForm")
                .addEventListener("submit", (e) => {
                    e.preventDefault(); // Previene el envío tradicional del formulario
                    const formData = new FormData(e.target); // Obtiene los datos del formulario

                    // Crea la nueva meta con los datos del formulario
                    manager.addSavingGoal({
                        name: formData.get("name"),
                        target: parseFloat(formData.get("target")),
                    });

                    // Redirige a la misma página para ver la nueva meta
                    router.navigate("/metas");
                });

            // Manejador para todos los formularios de registro de ahorros
            document.querySelectorAll(".saving-form").forEach((form) => {
                form.addEventListener("submit", (e) => {
                    e.preventDefault(); // Previene el envío tradicional del formulario

                    // Obtiene el ID de la meta y el monto del ahorro
                    const goalId = parseInt(e.target.dataset.goalId);
                    const amount = parseFloat(e.target.amount.value);

                    // Registra la transacción de ahorro
                    manager.addSavingTransaction(goalId, amount);

                    // Recarga la página para mostrar el progreso actualizado
                    router.navigate("/metas");
                });
            });
        },
    },

    // Ruta para manejar páginas no encontradas (404)
    "/404": {
        render: (container) => {
            // Renderiza un mensaje de error amigable
            container.innerHTML = `
                <div class="card">
                    <h2>404 - Página no encontrada</h2>
                    <p>Lo sentimos, la página que buscas no existe.</p>
                    <button onclick="router.navigate('/')">
                        Volver al Inicio
                    </button>
                </div>
            `;
        },
    },
};

// Inicialización de la aplicación

// Crea una instancia del gestor financiero para manejar los datos
const financeManager = new FinanceManager();

// Crea una instancia del router pasándole las rutas y el gestor financiero
const router = new Router(routes, financeManager);

// Manejo de la ruta inicial cuando se carga la aplicación
if (window.location.pathname === "/") {
    // Si estamos en la ruta raíz, simplemente maneja la ruta
    router.handleRoute();
} else {
    // Si estamos en cualquier otra ruta, redirige a la ruta raíz
    router.navigate("/");
}
