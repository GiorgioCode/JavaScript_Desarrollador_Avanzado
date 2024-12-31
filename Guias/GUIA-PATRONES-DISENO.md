# Guión de Clase: Patrones de Diseño en JavaScript

## Objetivos de Aprendizaje
Al finalizar esta clase, los estudiantes serán capaces de:
1. Comprender y aplicar el Patrón Revelador
2. Implementar el Patrón Singleton de manera efectiva
3. Entender el Patrón de Publicación y Suscripción
4. Trabajar con Iteradores y Generadores en JavaScript

## 1. Patrón Revelador (Module Pattern)

### Introducción (15 minutos)
El Patrón Revelador es una evolución del patrón módulo que proporciona una manera de encapsular métodos y variables dentro de un único objeto, revelando solo las partes que queremos hacer públicas.

### Principio
El patrón se basa en el concepto de clausuras (closures) en JavaScript, permitiendo crear un ámbito privado y exponiendo selectivamente la funcionalidad pública.

### Beneficios
- Encapsulación clara de la funcionalidad
- Control preciso sobre qué métodos y propiedades son públicos
- Organización limpia del código
- Prevención de conflictos de nombres en el ámbito global

### Desventajas
- Mayor consumo de memoria (cada instancia tiene sus propias copias de métodos)
- Dificultad para modificar la visibilidad después de la creación
- Complejidad en las pruebas unitarias de métodos privados

### Implementación Paso a Paso

```javascript
// 1. Comenzamos definiendo nuestro módulo utilizando una IIFE 
// (Immediately Invoked Function Expression)
const CalculadoraFinanciera = (function() {
    // 2. Variables privadas dentro del closure
    let saldo = 0;
    const tasaInteres = 0.05;
    
    // 3. Función privada que solo será accesible dentro del módulo
    function calcularInteres(monto) {
        return monto * tasaInteres;
    }
    
    // 4. Objeto público que expone la interfaz que queremos revelar
    return {
        // 5. Método público para depositar dinero
        depositar: function(monto) {
            saldo += monto;
            return saldo;
        },
        
        // 6. Método público para retirar dinero
        retirar: function(monto) {
            if (monto <= saldo) {
                saldo -= monto;
                return true;
            }
            return false;
        },
        
        // 7. Método público que utiliza la función privada
        obtenerInteresAnual: function() {
            return calcularInteres(saldo);
        },
        
        // 8. Método público para consultar el saldo
        obtenerSaldo: function() {
            return saldo;
        }
    };
})();

// Ejemplo de uso:
console.log(CalculadoraFinanciera.obtenerSaldo()); // 0
CalculadoraFinanciera.depositar(1000);            // 1000
console.log(CalculadoraFinanciera.obtenerInteresAnual()); // 50
```

### Ejercicio Práctico (20 minutos)
Crear un módulo que gestione una lista de tareas con métodos para agregar, eliminar y listar tareas.

## 2. Patrón Singleton

### Introducción (15 minutos)
El Singleton es un patrón de diseño que asegura que una clase solo tenga una instancia y proporciona un punto de acceso global a ella.

### Principio
Garantiza que una clase tenga una única instancia y proporciona un método para acceder a ella desde cualquier parte de la aplicación.

### Beneficios
- Control estricto sobre el acceso a la instancia única
- Reduce el uso de variables globales
- Puede ser inicializado de manera diferida
- Implementación flexible

### Desventajas
- Puede ser considerado un anti-patrón en algunos casos
- Dificulta las pruebas unitarias
- Puede ocultar dependencias

### Implementación Paso a Paso

```javascript
// 1. Definimos la clase Singleton utilizando una IIFE
const ConfiguracionApp = (function() {
    // 2. Variable privada para almacenar la instancia
    let instancia;
    
    // 3. Función constructora privada
    function crearInstancia() {
        // 4. Objeto que contendrá la configuración
        const configuracion = {
            tema: 'claro',
            idioma: 'es',
            notificaciones: true
        };
        
        // 5. Métodos públicos para manipular la configuración
        return {
            obtenerTema: function() {
                return configuracion.tema;
            },
            
            cambiarTema: function(nuevoTema) {
                configuracion.tema = nuevoTema;
            },
            
            obtenerIdioma: function() {
                return configuracion.idioma;
            },
            
            cambiarIdioma: function(nuevoIdioma) {
                configuracion.idioma = nuevoIdioma;
            },
            
            toggleNotificaciones: function() {
                configuracion.notificaciones = !configuracion.notificaciones;
                return configuracion.notificaciones;
            }
        };
    }
    
    // 6. Objeto público que controla el acceso a la instancia
    return {
        // 7. Método para obtener la instancia única
        obtenerInstancia: function() {
            if (!instancia) {
                instancia = crearInstancia();
            }
            return instancia;
        }
    };
})();

// Ejemplo de uso:
const config1 = ConfiguracionApp.obtenerInstancia();
const config2 = ConfiguracionApp.obtenerInstancia();

console.log(config1 === config2); // true - misma instancia
config1.cambiarTema('oscuro');
console.log(config2.obtenerTema()); // 'oscuro'
```

### Ejercicio Práctico (20 minutos)
Implementar un Singleton para gestionar el estado de autenticación de una aplicación.

## 3. Patrón de Publicación y Suscripción (Pub/Sub)

### Introducción (15 minutos)
El patrón Pub/Sub permite la comunicación entre componentes sin que estos se conozcan entre sí, proporcionando un sistema de eventos flexible y desacoplado.

### Principio
Los publicadores emiten eventos sin conocer quiénes son los suscriptores, y los suscriptores escuchan eventos sin conocer quiénes son los publicadores.

### Beneficios
- Desacoplamiento total entre componentes
- Facilita la escalabilidad
- Permite comunicación asíncrona
- Flexibilidad en la adición/eliminación de suscriptores

### Desventajas
- Puede ser difícil de debuggear
- Posible pérdida de control sobre el flujo de la aplicación
- Potenciales problemas de memoria si no se gestionan bien las suscripciones

### Implementación Paso a Paso

```javascript
// 1. Definimos la clase EventBus que gestionará nuestro sistema de eventos
class EventBus {
    // 2. Constructor que inicializa el almacén de suscriptores
    constructor() {
        this.suscriptores = {};
    }
    
    // 3. Método para suscribirse a un evento
    suscribir(evento, callback) {
        // 3.1 Si el evento no existe, creamos un array vacío
        if (!this.suscriptores[evento]) {
            this.suscriptores[evento] = [];
        }
        
        // 3.2 Agregamos el callback a la lista de suscriptores
        this.suscriptores[evento].push(callback);
        
        // 3.3 Retornamos una función para cancelar la suscripción
        return () => {
            this.suscriptores[evento] = this.suscriptores[evento]
                .filter(cb => cb !== callback);
        };
    }
    
    // 4. Método para publicar un evento
    publicar(evento, data) {
        // 4.1 Si no hay suscriptores, no hacemos nada
        if (!this.suscriptores[evento]) {
            return;
        }
        
        // 4.2 Notificamos a todos los suscriptores
        this.suscriptores[evento].forEach(callback => {
            callback(data);
        });
    }
}

// Ejemplo de uso:
const eventBus = new EventBus();

// Suscriptor 1
const cancelarSuscripcion = eventBus.suscribir('nuevoMensaje', 
    mensaje => console.log('Suscriptor 1:', mensaje)
);

// Suscriptor 2
eventBus.suscribir('nuevoMensaje', 
    mensaje => console.log('Suscriptor 2:', mensaje)
);

// Publicar un evento
eventBus.publicar('nuevoMensaje', '¡Hola mundo!');

// Cancelar suscripción del primer suscriptor
cancelarSuscripcion();
```

### Ejercicio Práctico (20 minutos)
Implementar un sistema de notificaciones usando el patrón Pub/Sub.

## 4. Iteradores y Generadores

### Introducción (15 minutos)
Los iteradores y generadores son características de ES6+ que proporcionan una forma elegante de trabajar con colecciones de datos y crear funciones que pueden pausar su ejecución.

### Principio
- Iteradores: objetos que implementan el protocolo de iteración
- Generadores: funciones especiales que pueden pausar su ejecución y reanudarla posteriormente

### Beneficios
- Control preciso sobre la iteración
- Manejo eficiente de memoria
- Código más limpio y expresivo
- Facilita el trabajo con secuencias infinitas

### Desventajas
- Curva de aprendizaje inicial
- Puede ser confuso para desarrolladores nuevos
- Potencial complejidad en el debugging

### Implementación Paso a Paso

```javascript
// 1. Implementación de un Iterador personalizado
class RangoNumerico {
    // 1.1 Constructor que define el rango
    constructor(inicio, fin, paso = 1) {
        this.inicio = inicio;
        this.fin = fin;
        this.paso = paso;
    }
    
    // 1.2 Método que hace la clase iterable
    [Symbol.iterator]() {
        let contador = this.inicio;
        const fin = this.fin;
        const paso = this.paso;
        
        // 1.3 Retornamos el objeto iterador
        return {
            next() {
                if (contador <= fin) {
                    const valor = contador;
                    contador += paso;
                    return { value: valor, done: false };
                }
                return { done: true };
            }
        };
    }
}

// 2. Implementación de un Generador
function* generadorFibonacci() {
    // 2.1 Inicializamos los primeros números
    let prev = 0, curr = 1;
    
    // 2.2 Generamos la secuencia infinita
    while (true) {
        // 2.3 Yield pausa la ejecución y retorna el valor
        yield curr;
        
        // 2.4 Calculamos el siguiente número
        [prev, curr] = [curr, prev + curr];
    }
}

// Ejemplos de uso:

// Usando el iterador
const rango = new RangoNumerico(1, 5);
for (const num of rango) {
    console.log(num); // 1, 2, 3, 4, 5
}

// Usando el generador
const fibonacci = generadorFibonacci();
console.log(fibonacci.next().value); // 1
console.log(fibonacci.next().value); // 1
console.log(fibonacci.next().value); // 2
console.log(fibonacci.next().value); // 3
console.log(fibonacci.next().value); // 5
```

### Ejercicio Práctico (20 minutos)
Crear un generador que produzca una secuencia personalizada (por ejemplo, números primos o una secuencia matemática específica).

## Evaluación y Cierre

### Actividad Final (30 minutos)
Los estudiantes deberán implementar un pequeño proyecto que combine al menos dos de los patrones vistos en clase. Por ejemplo:
- Un gestor de tareas que use Singleton para el estado global y Pub/Sub para las notificaciones
- Un sistema de filtros que use el Patrón Revelador para la lógica y Generadores para procesar los datos

### Recursos Adicionales
- Documentación oficial de JavaScript
- Libros recomendados sobre patrones de diseño
- Repositorio de ejemplos de código
- Enlaces a tutoriales y artículos relacionados

### Tareas para Casa
1. Implementar una versión mejorada del ejercicio final
2. Investigar otros patrones de diseño comunes en JavaScript
3. Crear documentación técnica para el código desarrollado