let pantalla = document.getElementById("valor_pantalla");

function mostrar(val) {
    pantalla.value += val;
}
function limpiar_pantalla() {
    pantalla.value = "";
}

function evaluar() {
    pantalla.value = eval(pantalla.value).toFixed(1);
}
