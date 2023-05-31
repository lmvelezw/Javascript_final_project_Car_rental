
class Vehiculo{
    constructor(id,marca,modelo,anio,kilometraje,valorDia,categoria,imagen,dias){
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.kilometraje = kilometraje;
        this.valorDia = valorDia;
        this.categoria = categoria;
        this.imagen = imagen;
        this.dias = dias
    }
}

    let vehiculos = [
        new Vehiculo("1","Ford","Escape",2022,25000,100000,"SUV","./img/escape.webp",0),
        new Vehiculo("2","Mazda","CX5",2023,5420,130000,"SUV","./img/cx5.jpeg",0),
        new Vehiculo("3","Toyota","4Runner",2018,53200,150000,"SUV","./img/4runner.jpeg",0),
        new Vehiculo("4","Mercedes Benz","GLC200",2021,3500,250000,"SUV","./img/glc200.jpeg",0),
        new Vehiculo("5","Audi","Q5",2020,26250,130000,"SUV","./img/q5.jpeg",0),
        new Vehiculo("6","BMW","X5",2019,27500,160000,"SUV","./img/x5.webp",0),
        new Vehiculo("7","Volvo","XC60",2018,27500,120000,"SUV","./img/xc60.jpeg",0),
        new Vehiculo("8","Mazda","2",2023,2000,8000,"Hatchback","./img/mazda2.jpeg",0),
        new Vehiculo("9","Fiat","500e",2022,5050,100000,"Hatchback","./img/500e.jpeg",0),
        new Vehiculo("10","Mercedes Benz","A45 AMG",2022,5200,250000,"Hatchback","./img/a45.jpeg",0),
        new Vehiculo("11","Mercedes Benz","C250",2020,3500,250000,"Sedan","./img/c250.avif",0),
        new Vehiculo("12","Audi","A8",2021,2250,330000,"Sedan","./img/a8.jpeg",0),
        new Vehiculo("13","Volvo","S60",2022,7500,180000,"Sedan","./img/s60.jpeg",0),
        new Vehiculo("14","BMW","3 Series",2023,500,260000,"Sedan","./img/serie3.png",0),
    ];

const seccionProductos = document.querySelector('#seccion-productos');
const filtroCategorias = document.querySelectorAll(".boton-filtro")
const tituloSeccion = document.querySelector("#tituloSeccion");
let botonesAgregar = document.querySelectorAll(".producto-alquilar");
const carrito = document.querySelector("#carrito")

function mostrarProductos(categorizados){
    categorizados.forEach(vehiculo => {
        const div = document.createElement("div");
        div.classList.add("tarjeta-producto");
        div.innerHTML = `
        <img class="imagen-producto" src="${vehiculo.imagen}" alt="${vehiculo.marca} ${vehiculo.modelo}">
        <div class="tarjeta-especificacion">
            <h3 class="producto-modelo">${vehiculo.marca} ${vehiculo.modelo}</h3>
            <p class="producto-precio">$${vehiculo.valorDia}/día</p>
            <button class="producto-alquilar" id="${vehiculo.id}">Alquilar</button>
        </div>`;
    seccionProductos.append(div);
    })
    actualizarBotonesAgregar();
}

mostrarProductos(vehiculos);

filtroCategorias.forEach(filtro => {
    filtro.addEventListener('click', (e) => {
        seccionProductos.innerHTML = "";
        filtroCategorias.forEach(filtro => filtro.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            tituloSeccion.innerText = e.currentTarget.id;
            const categoria = vehiculos.filter(vehiculo => vehiculo.categoria === e.currentTarget.id);
            mostrarProductos(categoria);
        }else {
            tituloSeccion.innerText = "Todos los vehículos";
            mostrarProductos(vehiculos);
        };
    })
})

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-alquilar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
} 

const productosEnCarrito = [];

const alquileresLS = JSON.parse(localStorage.getItem("alquileres"));

productosEnCarrito = alquileresLS ? JSON.parse(alquileresLS) : [];
actualizarCarrito();

function agregarAlCarrito(e) {
    const id = e.currentTarget.id;
    const vehiculoCarrito = vehiculos.find(vehiculo => vehiculo.id === id);
    
    if(productosEnCarrito.some(vehiculo => vehiculo.id === id)){
        const index = productosEnCarrito.findIndex(vehiculo => vehiculo.id === id);
        productosEnCarrito[index].dias++;

    } else{
        vehiculoCarrito.dias = 1;
        productosEnCarrito.push(vehiculoCarrito);
    };

    localStorage.setItem("alquileres",JSON.stringify(productosEnCarrito))

    actualizarCarrito();
    
}

function actualizarCarrito(){
    let contador = productosEnCarrito.length;
    carrito.innerText = contador;
    
}

