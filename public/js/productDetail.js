document.addEventListener('DOMContentLoaded', function() {
  const btnAgregar = document.querySelectorAll(".agregar-carrito");
  const cantidadProductos = document.querySelector(".cart-count");
  let contador = 0;
  const modales = document.querySelectorAll(".modal");

  // Función para actualizar la cantidad en el carrito
  function actualizarCantidadCarrito() {
    contador = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const clave = localStorage.key(i);
      if (clave.startsWith("producto-")) {
        const producto = JSON.parse(localStorage.getItem(clave));
        contador += producto.cantidad;
      }
    }
    cantidadProductos.textContent = contador;
  }

    // abrir popup cuando clickeo en la imagen del producto
    const imagenesProducto = document.querySelectorAll('#imagen-producto');
    imagenesProducto.forEach(function(imagen) {
      imagen.addEventListener('click', function() {
        const modal = imagen.closest(".articulo-producto").querySelector(".modal");
        modal.style.display = "flex";
      });
    });
  // Abrir ventana modal cuando se hace clic en "Agregar al carrito"
  btnAgregar.forEach(function(button) {
    button.addEventListener("click", function() {
      button.style.backgroundColor = "#DCFFC3";
      const modal = button.closest(".articulo-producto").querySelector(".modal");
      modal.style.display = "flex";
    });
  });

  // Cerrar ventana modal
  modales.forEach(function(modal) {
    const btnCerrar = modal.querySelector('.cerrar');
    btnCerrar.addEventListener('click', function() {
      modal.style.display = "none";
    });
  });

  // Agregar producto al carrito
  modales.forEach(function(modal) {
    const btnAgregarCarrito = modal.querySelector('.agregar-carrito-modal');
    const inputCantidad = modal.querySelector(".cantidad-input");

    btnAgregarCarrito.addEventListener('click', function() {
      const cantidadProducto = parseInt(inputCantidad.value);
      const nombreProducto = modal.querySelector('h2').textContent;

      // Verificar si el producto ya existe en el carrito
      const claveProducto = "producto-" + nombreProducto;
      if (localStorage.getItem(claveProducto)) {
        // El producto ya existe, sumar la cantidad
        const productoExistente = JSON.parse(localStorage.getItem(claveProducto));
        productoExistente.cantidad += cantidadProducto;
        localStorage.setItem(claveProducto, JSON.stringify(productoExistente));
      } else {
        // El producto no existe, agregarlo al carrito
        const descripcionProducto = modal.querySelector('p').textContent;
        const precioProducto = modal.querySelector("h3").textContent;
        const fotoProducto = modal.querySelector("img").src;
        const nombreImagen = fotoProducto.split('/').pop();

        const producto = {
          nombre: nombreProducto,
          descripcion: descripcionProducto,
          cantidad: cantidadProducto,
          precio: precioProducto,
          foto: nombreImagen
        };

        localStorage.setItem(claveProducto, JSON.stringify(producto));
      }

      actualizarCantidadCarrito();
      modal.style.display = "none";
    });
  });

  // Actualizar la cantidad en el carrito cuando se carga la página
  actualizarCantidadCarrito();

  // Restar o sumar cantidad en el carrito
  modales.forEach(function(modal) {
    const botonSumar = modal.querySelector(".plus-btn");
    const botonRestar = modal.querySelector(".minus-btn");
    const inputCantidad = modal.querySelector(".cantidad-input");

    botonSumar.addEventListener("click", function() {
      inputCantidad.value = parseInt(inputCantidad.value) + 1;
    });

    botonRestar.addEventListener("click", function() {
      let valorActual = parseInt(inputCantidad.value);
      if (valorActual <= 1) {
        inputCantidad.value = 1;
      } else {
        inputCantidad.value = valorActual - 1;
      }
    });
  });

  // Vista del carrito
  if (document.querySelector(".prueba")) {
    let productos = [];
    let total = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const clave = localStorage.key(i);
      if (clave.startsWith("producto-")) {
        const producto = JSON.parse(localStorage.getItem(clave));
        productos.push(producto);
        total += parseInt(producto.precio.slice(1)) * producto.cantidad;
      }
    }

    let html = "<section>";

    if (productos.length > 0) {
      productos.forEach(producto => {
        html += "<div class='compra-producto' data-producto-id='" + producto.id + "'>";
        html += "<div class='detalle-producto'>";
        html += "<div class='detalle-producto-foto-nombre'>";
        html += "<a class='close-link' style='font-size: 25px'><i class='fa-solid fa-xmark'></i></a>";
        html += "<img class='producto-img' src='/images/" + producto.foto + "' alt='producto'>";
        html += "<p style='font-size: 12px'>" + producto.nombre + "</p>";
        html += "</div>"
        html += "<div class='detalle-producto-precio'>";
        html += "<p>" + producto.precio + "</p>";
        html += "</div>";
        html += "<div class='detalle-producto-cantidad' style='margin: 0 0 0 0'>";
        html += "<p>" + producto.cantidad + "</p>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
      });

      html += "</section>";
      html += '<section class="bottom">';
      html += "<h4>Total del pedido</h4>";
      html += "<p>Total: $" + total + "</p>";
    } else {
      html += "<p style='text-align: center'>No se encontraron productos</p>";
    }

    document.querySelector(".prueba").innerHTML = html;

    // Botón para eliminar un producto del carrito
    const botonCerrarProducto = document.querySelectorAll(".close-link");
    botonCerrarProducto.forEach(function(boton) {
      boton.addEventListener("click", function() {
        const compraProducto = boton.closest(".compra-producto");
        const nombreProducto = compraProducto.querySelector("p").textContent;

        localStorage.removeItem("producto-" + nombreProducto);
        location.reload();
      });
    });

    // Botón para finalizar la compra
    const finalizar = document.querySelector("#borrar-finalizar");
    finalizar.addEventListener("click", function(e) {
      e.preventDefault();
      localStorage.clear();
      window.location.replace("/");
    });
  }

      fetch('http://localhost:3000/productDetail/productCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    });

});