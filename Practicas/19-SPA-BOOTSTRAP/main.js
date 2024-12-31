console.log("spa");

//router basico
class SPARouter {
    //constructor que inicializa caracteristicas del objeto de ruteo
    constructor(routes) {
        //almacenamos las rutas disponibles
        this.routes = routes;
        //elemento principal donde renderizamos
        this.rootElement = document.getElementById("app");
        //vinculamos el metodo para que tenga el contexto
        this.handleRoute = this.handleRoute.bind(this);
        //inicializamos el router
        this.initializeRoute();
    }

    //metodo para inicializar router
    initializeRoute() {
        window.addEventListener("hashchange", this.handleRoute);
        this.handleRoute();
    }

    //metodo que manejador de rutas
    handleRoute() {
        //obtenemos el hash actual sin el simbolo #
        const hash = window.location.hash.slice(1) || "/";
        console.log(hash);
        //buscamos la ruta correspondiente
        const route = this.routes[hash];
        if (route) {
            //si la ruta existe renderizamos contenido
            this.rootElement.innerHTML = route();
        } else {
            this.rootElement.innerHTML =
                "<h1>ERROR 404 - PAGINA NO ENCONTRADA</h1>";
        }
    }
}

const routes = {
    "/": () => `
        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">SPA APP</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#/">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#/about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#/contact">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
        </nav>
        <div class="alert alert-success mt-5" role="alert">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil voluptatibus iusto, et sunt voluptates, beatae reiciendis atque illo odit libero accusantium sit eveniet? Tempore voluptate pariatur nostrum quaerat corrupti dolorem perferendis libero facere ad excepturi reprehenderit quo accusantium quis voluptatem fugiat dolore delectus inventore modi minus, itaque nesciunt recusandae veniam!</p>
          </div>
    `,
    "/about": () => `
            <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">SPA APP</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#/">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="#/about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#/contact">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
        </nav>
        <div class="alert alert-success mt-5" role="alert">
            <p>Esta es la pagina acerca de nosotros!!!!!</p>
          </div>
    `,
    "/contact": () => `
            <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">SPA APP</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#/">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#/about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="#/contact">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
        </nav>
        <div class="alert alert-success mt-5" role="alert">
            <p>Esta es la pagina de contacto!!!!!!!</p>
          </div>
    `,
};

const app = new SPARouter(routes);
