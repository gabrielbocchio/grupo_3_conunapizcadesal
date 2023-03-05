const fs = require("fs");
const path = require("path");

const productos={

// main de producto (productDetail)
    produ: (req,res)=> {
        return res.render("product/productDetail");
    },
/* ---------------------------------------------------------------- */
// carrito
    carrito: (req,res)=> {
        return res.render("product/productCart");
    },
/* ---------------------------------------------------------------- */
// crear
    crearProducto: (req,res)=> {
        return res.render("product/crear-producto");
    },
/* --------- */   
    guardarProducto:(req,res)=> {
        let producto = {
            nombre: req.body.nombre,
            categoria: req.body.categoria,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            imagen: req.body.imagen
        }
    // esto es para leer el archivo
        let archivoProducto = fs.readFileSync("productos.json", "utf-8");
        let productos;
        if (archivoProducto == "") {
            productos = [];
        } else {
    // hacer un parse para descomprimir el json y tener el array
            productos = JSON.parse(archivoProducto);
        }
    // aplicar codigo para hacer lo que se necesita    
        productos.push(producto);
    // Convertir el arreglo de productos a formato JSON
        productosJSON = JSON.stringify(productos);
    // Escribir el archivo con los nuevos datos
        fs.writeFileSync("productos.json" , productosJSON)

        res.redirect("/productDetail")
        },


/* ---------------------------------------------------------------- */
// editar

editarProducto: (req,res)=> {
    // esto es para leer el archivo
    let archivoJSON = fs.readFileSync("productos.json", "utf-8")
    // hacer un parse para descomprimir el json y tener el array
    let productos = JSON.parse(archivoJSON)
    return res.render("product/editar-producto" , {"productos": productos});
        },
/* --------- */        
    productoEditado:(req,res)=> {
        return res.render("product/editar-producto");
        },

/* ---------------------------------------------------------------- */
// eliminar
    eliminarProducto:  (req,res)=> {
        let archivoJSON = fs.readFileSync("productos.json", "utf-8")
        let productos = JSON.parse(archivoJSON)

    return res.render("product/delete-producto" , {"productos": productos});

        },
    productoEliminado: (req,res)=> {
 // esto es para leer el archivo
  let archivoProducto = fs.readFileSync("productos.json", "utf-8");
  //hacer un parse para descomprimir el json y tener el array
  let productos = JSON.parse(archivoProducto);

  let productoSeleccionado = req.body.nombre;
  // Filtrar los productos para eliminar el seleccionado
  let nuevosProductos = productos.filter((producto) => {
    return producto.nombre !== productoSeleccionado;
  });
  // Convertir el arreglo de productos a formato JSON
  let nuevosProductosJSON = JSON.stringify(nuevosProductos);
  // Escribir el archivo con los nuevos datos
  fs.writeFileSync("productos.json", nuevosProductosJSON);

  res.redirect("/productDetail");
        },
/* ---------------------------------------------------------------- */
// buscar
    buscarProducto:  (req,res)=> {

    let buscadoPorAdmin = req.query.search;
    
    // esto es para leer el archivo
   let archivoJSON = fs.readFileSync("productos.json" , {encoding: "utf-8"});
    
   // hacer un parse para descomprimir el json y tener el array
   let productos = JSON.parse(archivoJSON);
    // aplicar codigo para hacer lo que se necesita     
   let productoResults = [];
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].nombre.includes(buscadoPorAdmin)) {
            productoResults.push(productos[i]);
        }
    }
    res.render("product/search-producto" , {productoResults: productoResults})
        },

    }
          
    
module.exports=productos;