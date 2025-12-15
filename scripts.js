// Inicializar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Catálogo fijo de libros
const libros = [
  { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 15, imagen: "img/cien.jpg" },
  { id: 2, titulo: "Rayuela", autor: "Julio Cortázar", precio: 12, imagen: "img/rayuela.jpg" },
  { id: 3, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", precio: 10, imagen: "img/principito.jpg" },
  { id: 4, titulo: "1984", autor: "George Orwell", precio: 14, imagen: "img/1984.jpg" }
];

// Mostrar libros en la sección productos
const productos = document.getElementById("productos");
libros.forEach(libro => {
  productos.innerHTML += `
    <div>
      <img src="${libro.imagen}" alt="${libro.titulo}">
      <h3>${libro.titulo}</h3>
      <p>${libro.autor}</p>
      <p>$${libro.precio}</p>
      <button onclick="agregarAlCarrito(${libro.id}, '${libro.titulo}', ${libro.precio})">Añadir al carrito</button>
    </div>
  `;
});
actualizarCarrito();

// Agregar libro al carrito
function agregarAlCarrito(id, titulo, precio) {
  const libro = carrito.find(l => l.id === id);
  if (libro) {
    libro.cantidad++;
  } else {
    carrito.push({ id, titulo, precio, cantidad: 1 });
  }
  guardarCarrito();
  actualizarCarrito();
}

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Actualizar contador y lista
function actualizarCarrito() {
  document.getElementById("contador").textContent =
    carrito.reduce((acc, l) => acc + l.cantidad, 0);

  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  let total = 0;
  carrito.forEach(l => {
    total += l.precio * l.cantidad;
    lista.innerHTML += `


