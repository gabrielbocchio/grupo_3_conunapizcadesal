const fs = require("fs");
const path = require("path");

const productos={

// main de producto (productDetail), muestra todo el listado de productos desde el json
    produ: (req,res)=> {
        const productos = require("../productos.json"); 
        return res.render("product/productDetail", { productos: productos });
    },
    produCategoria: (req, res) => {
        const category = req.params.category;
        const productos = require("../productos.json");
        let productosFiltrados = [];
    // aca filtra por categoria y renderiza a la pagina 
        if (category) {
          productosFiltrados = productos.filter(
            (producto) => producto.categoria === category
          );
        } else {
          productosFiltrados = productos;
        }
    
        return res.render("product/productDetail", {  productos : productosFiltrados });
      },
    // pagina individual del producto, toma por params el producto seleccionado, requiere json y busca el que coincide y lo muestra a travez de la renderizacion
      productInfo: (req, res) => {
        const info= req.params.id;
        const productos = require("../productos.json");
        const comida = productos.find(comida => comida.id == info)
        return res.render("product/productInfo", { comida : comida})
      },
/* ---------------------------------------------------------------- */
// carrito
    carrito: (req,res)=> {
        return res.render("product/productCart");
    },
/* ---------------------------------------------------------------- */
// crear

    // simplemente renderiza la pagina de creacion de producto
    crearProducto: (req,res)=> {
        return res.render("product/crear-producto");
    },
/* --------- */   
    // da funcionalidad, este es el POST, explicado paso x paso, parte por la lectura del producto que se pasa por url
    guardarProducto:(req,res)=> {
        let producto = {
            nombre: req.body.nombre,
            id: req.body.id,
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
    // Obtener el ID del producto a editar de la ruta
    const id = req.params.id;
    
    // Leer los productos desde el archivo
    let archivoJSON = fs.readFileSync("productos.json", "utf-8")
    let productos = JSON.parse(archivoJSON);

    // Encontrar el producto con el ID especificado
    let producto = productos.find((p) => p.id === id);

    // Pasar el producto a la vista
    return res.render("product/editar-producto", { producto });
 
        }, 
/* --------- */        
productoEditado: (req, res) => {

// obtener el id del producto
    const idProducto = req.params.id;
// crea un nuevo producto usando los valores que nos da el req.body
    const nuevoProducto = {
      id: idProducto,
      nombre: req.body.nombre,
      categoria: req.body.categoria,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      imagen: req.body.imagen
    };
    
    // Leer el archivo JSON
    const archivoJSON = fs.readFileSync("productos.json", "utf-8");
    let productos = JSON.parse(archivoJSON);
    
    // Verificar si el ID del producto existe en el archivo
     const indexProducto = productos.findIndex(producto => producto.id === idProducto);
    if (indexProducto < 0) {
      return res.status(404).send('Producto no encontrado');
    }
    // Actualizar el producto
    productos[indexProducto] = nuevoProducto;
    // Guardar los cambios en el archivo JSON
    fs.writeFileSync("productos.json", JSON.stringify(productos, null, 2));
    
    res.redirect('/productDetail');
},
/* ---------------------------------------------------------------- */
// eliminar
productoEliminado: (req,res) =>{
        // Lee el archivo productos.json y conviértelo en un array de objetos JSON.
        const productosFilePath = path.join(__dirname, '../productos.json');
        const productosRawData = fs.readFileSync(productosFilePath);
        const productos = JSON.parse(productosRawData);
    
        // Encuentra el índice del producto que desea eliminar.
        const productoId = req.params.id;
        const productoIndex = productos.findIndex((producto) => producto.id === productoId);
    
        // Elimina el producto del array usando el índice encontrado.
        productos.splice(productoIndex, 1);
    
        // Guarda el array actualizado en el archivo productos.json.
        fs.writeFileSync(productosFilePath, JSON.stringify(productos));
    
        // Redirige a la página principal de productos.
        res.redirect('/productDetail');
},

/* ---------------------------------------------------------------- */
// buscar
    buscarProducto:  (req,res)=> {
    // tomo el producto buscado con query
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
