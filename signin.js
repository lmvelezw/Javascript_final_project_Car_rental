
class Cliente {
    constructor(dni, nombre, edad, password){
        this.dni = parseInt(dni);
        this.nombre = nombre;
        this.edad = parseInt(edad);
        this.password = password;
    }
}

const listaClientes = [
new Cliente(12345,"Luis", 33, "123"),
new Cliente(55322,"Juan", 18, "315a"),
new Cliente(54135,"Pedro", 44, "12345"),
new Cliente(56875,"Maria", 53, "12f"),
new Cliente(45345,"Patricia", 25, "12r"),
];


const loginFormulario = document.querySelector("#loginFormulario");
const loginBoton = document.querySelector("#loginBoton");
const errorLoginMensaje = document.querySelector("#errorLoginMensaje");

loginBoton.addEventListener("click", (e) =>  {
    e.preventDefault();
    const usuario = loginFormulario.usuario.value;
    const password = loginFormulario.password.value;

    if(listaClientes.some(cliente => cliente.nombre === usuario) && listaClientes.some(cliente => cliente.password === password)){
        alert("Sesión iniciada exitosamente")
        location.reload();
    } else {
        errorLoginMensaje.classList.remove("disabled");
        errorLoginMensaje.classList.add("boton-nav");
    }

});
