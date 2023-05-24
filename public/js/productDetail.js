document.addEventListener('DOMContentLoaded', function() {
  const btnAgregar = document.querySelectorAll(".agregar-carrito")
  const cantidadProductos = document.querySelector(".cart-count")
  let contador = 0;
  const modales = document.querySelectorAll(".modal")


  // abrir popup cuando clickeo en agregar al carrito
  btnAgregar.forEach(function(button){
    button.addEventListener("click", function(){
      button.style.backgroundColor = "#DCFFC3";
      const modal = button.closest(".articulo-producto").querySelector(".modal");
      modal.style.display = "flex";
    })
  })

  // abrir popup cuando clickeo en la imagen del producto
  const imagenesProducto = document.querySelectorAll('#imagen-producto');
  imagenesProducto.forEach(function(imagen) {
    imagen.addEventListener('click', function() {
      const modal = imagen.closest(".articulo-producto").querySelector(".modal");
      modal.style.display = "flex";
    });
  });

  // Cerrar la ventana modal
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
      contador += cantidadProducto;
      cantidadProductos.textContent = contador;

      // Obtener información del producto
      const nombreProducto = modal.querySelector('h2').textContent;
      const descripcionProducto = modal.querySelector('p').textContent;
      const precioProducto = modal.querySelector("h3").textContent;
      const fotoProducto = modal.querySelector("img").src;
      const nombreImagen = fotoProducto.split('/').pop();
      

      // Crear objeto del producto
      const producto = {
        nombre: nombreProducto,
        descripcion: descripcionProducto,
        cantidad: cantidadProducto,
        precio: precioProducto,
        foto: nombreImagen
      };

      // Guardar objeto del producto en el local storage
      localStorage.setItem(`producto-${nombreProducto}`, JSON.stringify(producto));

      // Enviar producto al servidor
/*     fetch('http://localhost:3000/productDetail/productCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    });
 */
      // Cerrar la ventana modal
      modal.style.display = "none";

    });
  });

  // Obtener productos del local storage
  for (let i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i);
    if (clave.startsWith('producto-')) {
      const producto = JSON.parse(localStorage.getItem(clave));
      console.log(producto);
    }
  }

  // en cart, agregar o quitar cantidad de productos
  modales.forEach(function(modal) {
    const botonSumar = modal.querySelector(".plus-btn");
    const botonRestar = modal.querySelector(".minus-btn");
    const inputCantidad = modal.querySelector(".cantidad-input");

    botonSumar.addEventListener("click", function(){
      inputCantidad.value = parseInt(inputCantidad.value) + 1;
    });

    botonRestar.addEventListener("click", function(){
      let valorActual = parseInt(inputCantidad.value);
      if (valorActual <= 1) {
        inputCantidad.value = 1;
      }
      else {
        inputCantidad.value = valorActual - 1;
      }
          });
        });

        // vista del carrito, hago un if xq prueba esta solo en carrito, y en products me daba error
        if (document.querySelector(".prueba")) {
          let productos = [];
          let total = 0; // variable para almacenar el total de los precios
          for (let i = 0; i < localStorage.length; i++) {
            const clave = localStorage.key(i);
            if (clave.startsWith("producto-")) {
              const producto = JSON.parse(localStorage.getItem(clave));
              productos.push(producto);
              total += parseInt(producto.precio.slice(1))* producto.cantidad; // sumar el precio del producto al total
            }
          }
          let html = "<section>";
          if (productos.length > 0) {
            productos.forEach(producto => {
              html += "<div class='compra-producto' data-producto-id='" + producto.id + "'>";
              html += "<div class='detalle-producto'>";
              html += "<a class='close-link' style= 'font-size: 25px' ><i class='fa-solid fa-xmark'></i></a>";
              html += "<img class='producto-img' src='/images/" + producto.foto + "' alt='producto'>";
              html += "<p style='margin: 0 20% 0 10px'>" + producto.nombre + "</p>";
              html += "<div class='detalle-producto-precio'>";
              html += "<p>" + producto.precio + "</p>";
              html += "</div>";
              html += "<div class='detalle-producto-cantidad' style='margin: 0 0 0 25%'>";
              html += "<p >" + producto.cantidad + "</p>";
              html += "</div>";
              html += "</div>";
              html += "</div>";
            });
            html += "</section>";
           html+= '<section class="bottom">'
            html+='<h4>Total del pedido</h4>'
            html += "<p>Total: $" + total + "</p>";
          } else {
            html += "<p style='text-align: center'>No se encontraron productos</p>";
          }
          document.querySelector(".prueba").innerHTML = html;

          // --- //
          const botonCerrarProducto = document.querySelectorAll(".close-link");
            botonCerrarProducto.forEach(function(boton) {
              boton.addEventListener("click", function() {
                const compraProducto = boton.closest(".compra-producto");
                const nombreProducto = compraProducto.querySelector("p").textContent;

                localStorage.removeItem("producto-" + nombreProducto);
                location.reload();
              });
            });


      }
        
          

      // boton finalizar compra me hace un clear de los productos guardados en localStorage
      if(document.querySelector("#borrar-finalizar")){
        const finalizar = document.querySelector("#borrar-finalizar")
        finalizar.addEventListener("click", function(e){
          e.preventDefault();
          localStorage.clear();
          window.location.replace("/");
        })

      }
});
