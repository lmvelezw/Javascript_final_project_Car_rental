let alquileres = localStorage.getItem("alquileres");
alquileres = JSON.parse(alquileres);

const carritoVacio = document.querySelector("#carritoVacio");
const carritoConProductos = document.querySelector("#carritoConProductos");
const carritoAcciones = document.querySelector("#carritoAcciones");
let eliminarAlquiler = document.querySelector(".carrito-producto-eliminar");
const carritoCancelar = document.querySelector("#carritoCancelar");
const valorTotal = document.querySelector("#total");
const carritoReservar = document.querySelector("#carritoReservar");

function mostrarProductosCarrito() {
  if (alquileres && alquileres.length > 0) {
    carritoVacio.classList.add("disabled");
    carritoConProductos.classList.remove("disabled");
    carritoAcciones.classList.remove("disabled");

    carritoConProductos.innerHTML = "";

    alquileres.forEach((element) => {
      const div = document.createElement("div");
      div.classList.add("producto-carrito");
      div.innerHTML = `
            <img class="imagen-carrito" src="${element.imagen}" alt="${
        element.marca
      } ${element.modelo}">
                <div class="carrito-producto-modelo">
                    <p class="carrito-producto-titulo">Modelo</p>
                    <h4>${element.marca} ${element.modelo}</h4>
                </div>
                <div class="carrito-producto-precio">
                    <p class="carrito-producto-titulo">Precio</p>
                    <p class="carrito-producto-valor">$${element.valorDia.toLocaleString()}/día</p>
                </div>
                <div class="carrito-producto-dias">
                    <p class="carrito-producto-titulo">Días de alquiler</p>
                    <p class="carrito-producto-valor">${element.dias}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <p class="carrito-producto-titulo">Subtotal</p>
                    <p class="carrito-producto-valor">$${(
                      element.valorDia * element.dias
                    ).toLocaleString()}</p>
                </div>
                    <button class="carrito-producto-eliminar" id="${
                      element.id
                    }"><i class="bi bi-trash3-fill"></i></button>
            `;
      carritoConProductos.append(div);
    });
  } else {
    carritoVacio.classList.remove("disabled");
    carritoConProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
  }
  cancelarAlquiler();
  valorTotalactual();
}

mostrarProductosCarrito();

function cancelarAlquiler() {
  botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}

function eliminarDelCarrito(e) {
  const id = e.currentTarget.id;
  const index = alquileres.findIndex((alquiler) => alquiler.id === id);
  alquileres.splice(index, 1);
  mostrarProductosCarrito();
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Alquiler eliminado",
    showConfirmButton: false,
    timer: 1000,
  });
  localStorage.setItem("alquileres", JSON.stringify(alquileres));
}

carritoCancelar.addEventListener("click", cancelarAlquileres);

function cancelarAlquileres() {
  alquileres.length = [];
  localStorage.setItem("alquileres", JSON.stringify(alquileres));

  mostrarProductosCarrito();
}

function valorTotalactual() {
  const totalActual = alquileres.reduce(
    (a, alquiler) => a + alquiler.valorDia * alquiler.dias,
    0
  );
  valorTotal.innerText = `$${totalActual.toLocaleString()}`;
}

carritoReservar.addEventListener("click", comprobarAlquiler);
function comprobarAlquiler() {
  alquileres.length = [];
  localStorage.setItem("alquileres", JSON.stringify(alquileres));

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Tu alquiler ha sido reservado",
    showConfirmButton: false,
    timer: 3800,
  });

  let confettiSettings = {
    target: "my-canvas",
    max: 300,
    size: 1,
    animate: true,
    props: ["circle", "square", "triangle", "line"],
    colors: [
      [165, 104, 246],
      [230, 61, 135],
      [0, 199, 228],
      [253, 214, 126],
    ],
    clock: 25,
    rotate: true,
    width: 1231,
    height: 910,
    start_from_edge: false,
    respawn: true,
  };
  let confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();

  carritoVacio.classList.add("disabled");
  carritoConProductos.classList.add("disabled");
  carritoAcciones.classList.add("disabled");

  setTimeout(function () {
    window.location.href = "index.html";
    confetti.clear();
  }, 4100);
}
