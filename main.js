apiVehiculos = "./json/vehiculos.json";
let vehiculos = [];

async function obtenerVehiculos() {
  const respuesta = await fetch(apiVehiculos);
  vehiculos = await respuesta.json();
  mostrarProductos(vehiculos);
}

obtenerVehiculos();

const seccionProductos = document.querySelector("#seccion-productos");
const filtroCategorias = document.querySelectorAll(".boton-filtro");
const tituloSeccion = document.querySelector("#tituloSeccion");
const carrito = document.querySelector("#carrito");
let botonesAgregar;

function mostrarProductos(categorizados) {
  categorizados.forEach((vehiculo) => {
    const div = document.createElement("div");
    div.classList.add("tarjeta-producto");
    div.innerHTML = `
        <img class="imagen-producto" src="${vehiculo.imagen}" alt="${
      vehiculo.marca
    } ${vehiculo.modelo}">
        <div class="tarjeta-especificacion">
            <h3 class="producto-modelo">${vehiculo.marca} ${
      vehiculo.modelo
    }</h3>
            <p class="producto-precio">$${vehiculo.valorDia.toLocaleString()}/día</p>

            <button class="producto-alquilar" id="${
              vehiculo.id
            }">Alquilar</button>
        </div>`;
    seccionProductos.appendChild(div);
  });
  actualizarBotonesAgregar();
}

filtroCategorias.forEach((filtro) => {
  filtro.addEventListener("click", (e) => {
    seccionProductos.innerHTML = "";
    filtroCategorias.forEach((filtro) => filtro.classList.remove("active"));
    e.currentTarget.classList.add("active");
    if (e.currentTarget.id != "todos") {
      tituloSeccion.innerText = e.currentTarget.id;
      const categoria = vehiculos.filter(
        (vehiculo) => vehiculo.categoria === e.currentTarget.id
      );
      mostrarProductos(categoria);
    } else {
      tituloSeccion.innerText = "Todos los vehículos";
      mostrarProductos(vehiculos);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-alquilar");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}
botonesAgregar = document.querySelectorAll(".producto-alquilar");

let productosEnCarrito = [];
const alquileresLS = localStorage.getItem("alquileres");
productosEnCarrito = alquileresLS ? JSON.parse(alquileresLS) : [];
actualizarCarrito();

function agregarAlCarrito(e) {
  const id = e.currentTarget.id;
  const vehiculoCarrito = vehiculos.find((vehiculo) => vehiculo.id === id);

  Swal.fire({
    title: "Cuántos días lo quieres alquilar?",
    input: "number",
    inputAttributes: {
      min: 1,
      step: 1,
    },
    inputValue: 7,
    confirmButtonColor: "#ff9500",
    confirmButtonText: "Alquilar",
    inputValidator: (value) => {
      if (!value) {
        return "No ingresaste un número de días.";
      }
      if (value <= 0) {
        return "El valor debe ser mayor a 1.";
      }
    },
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        text: "Alquiler agregado",
        showConfirmButton: false,
        timer: 800,
      });

      const dias = parseInt(Math.ceil(resultado.value));

      if (productosEnCarrito.some((vehiculo) => vehiculo.id === id)) {
        const index = productosEnCarrito.findIndex(
          (vehiculo) => vehiculo.id === id
        );
        productosEnCarrito[index].dias += dias;
      } else {
        vehiculoCarrito.dias = dias;
        productosEnCarrito.push(vehiculoCarrito);
      }
      localStorage.setItem("alquileres", JSON.stringify(productosEnCarrito));
      actualizarCarrito();
    }
  });
}

function actualizarCarrito() {
  let contador = productosEnCarrito.length;
  carrito.innerText = contador;
}
