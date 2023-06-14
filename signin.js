class Cliente {
  constructor(dni, nombre, edad, password) {
    this.dni = parseInt(dni);
    this.nombre = nombre;
    this.edad = parseInt(edad);
    this.password = password;
  }
}

const listaClientes = [
  new Cliente(12345, "Luis", 33, "123"),
  new Cliente(55322, "Juan", 18, "315a"),
  new Cliente(54135, "Pedro", 44, "12345"),
  new Cliente(56875, "Maria", 53, "12f"),
  new Cliente(45345, "Patricia", 25, "12r"),
];

const loginFormulario = document.querySelector("#loginFormulario");
const loginBoton = document.querySelector("#loginBoton");
const errorLoginMensaje = document.querySelector("#errorLoginMensaje");

loginBoton.addEventListener("click", (e) => {
  e.preventDefault();
  const usuario = loginFormulario.usuario.value;
  const password = loginFormulario.password.value;

  if (
    listaClientes.some((cliente) => cliente.nombre === usuario) &&
    listaClientes.some((cliente) => cliente.password === password)
  ) {
    Swal.fire({
      icon: "success",
      html: `<strong>Hola ${loginFormulario.usuario.value}!</strong> <br>En un momento te redirigiremos</br>`,
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#ff9500",
    }).then((result) => {
      window.location.href = "index.html";
    });
  } else if (listaClientes.some((cliente) => cliente.nombre === usuario)) {
    Swal.fire({
      icon: "error",
      title: "Contraseña incorrecta!",
      html: `<strong>${loginFormulario.usuario.value}</strong>, ingresaste una contraseña incorrecta`,
      confirmButtonText: "Volver",
      footer: "Dale otra oportunidad",
      confirmButtonColor: "#ff9500",
      background: "#fafafa",
      backdrop: `rgba(0, 0, 0,0.25)`,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oh nooooo!",
      html: `<strong>${loginFormulario.usuario.value}</strong> no es un usuario registrado`,
      confirmButtonText: "Volver",
      footer: "Dale otra oportunidad",
      confirmButtonColor: "#ff9500",
      background: "#fafafa",
      backdrop: `rgba(0, 0, 0,0.25)`,
    });
  }
});
