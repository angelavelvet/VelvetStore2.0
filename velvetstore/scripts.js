// Inicializar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar productos desde API
fetch("https://fakestoreapi.com/products?limit=4")
  .then(res => res.json())
  .then(data => {
    const productos = document.getElementById("productos");
    data.forEach(prod => {
      productos.innerHTML += `
        <div>
          <img src="${prod.image}" alt="${prod.title}" width="100">
          <h3>${prod.title}</h3>
          <p>$${prod.price}</p>
          <button onclick="agregarAlCarrito(${prod.id}, '${prod.title}', ${prod.price})">Añadir al carrito</button>
        </div>
      `;
    });
    actualizarCarrito();
  });

// Agregar producto al carrito
function agregarAlCarrito(id, titulo, precio) {
  const producto = carrito.find(p => p.id === id);
  if (producto) {
    producto.cantidad++;
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
    carrito.reduce((acc, p) => acc + p.cantidad, 0);

  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  let total = 0;
  carrito.forEach(p => {
    total += p.precio * p.cantidad;
    lista.innerHTML += `
      <li>
        ${p.titulo} - $${p.precio} x ${p.cantidad}
        <button onclick="eliminarProducto(${p.id})">Eliminar</button>
      </li>
    `;
  });
  document.getElementById("total").textContent = total.toFixed(2);
}

// Eliminar producto
function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito();
  actualizarCarrito();
}

// Validar formulario
document.getElementById("formulario").addEventListener("submit", e => {
  const email = e.target.email.value;
  if (!email.includes("@")) {
    e.preventDefault();
    alert("Por favor ingresa un correo válido.");
  }
});
