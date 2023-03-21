const fs = require("fs");
const path = require("path");
const productosFilePath = path.join(__dirname, "../database/productos.json");

const productos={
/* ---------------------------------------------------------------- */
// main de producto (productDetail), muestra todo el listado de productos desde el json
    produ: (req,res)=> {
        const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
        return res.render("product/productDetail", { productos: productos });
    },
/* ---------------------------------------------------------------- */
    produCategoria: (req, res) => {
        const category = req.params.category;
        const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));;
        let productosFiltrados = [];
        // aca filtra por categoria y renderiza a la pagina
        if (category) {
          productosFiltrados = productos.filter(
            (producto) => producto.categoria === category
          );
        } else {
          productosFiltrados = productos;
        }
      
        return res.render("product/productDetail", { productos: productosFiltrados });
      },
  // pagina individual del producto, toma por params el producto seleccionado, requiere json y busca el que coincide y lo muestra a travez de la renderizacion
/* ---------------------------------------------------------------- */    
  productInfo: (req, res) => {
        const info = req.params.id;
        const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
        const comida = productos.find(comida => comida.id == info);
        return res.render("product/productInfo", { comida: comida });
      },
/* ---------------------------------------------------------------- */
// carrito
    carrito: (req, res) => {
        return res.render("product/productCart");
    },
/* ---------------------------------------------------------------- */
// crear
    // simplemente renderiza la pagina de creacion de producto
    crearProducto: (req, res) => {
        return res.render("product/crear-producto");
    },
/* --------- */   

    guardarProducto: (req, res) => {
      const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

      let producto = {
        nombre: req.body.nombre,
        id: products[products.length - 1].id + 1,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion,
        precio: parseFloat(req.body.precio),
        imagen: req.file ? req.file.filename : "default-image.png"
      };
  
      // Aplicar código para hacer lo que se necesita
      products.push(producto);
      // Convertir el arreglo de productos a formato JSON
      let productsJSON = JSON.stringify(products, null, " ");
      // Escribir el archivo con los nuevos datos
      fs.writeFileSync(productosFilePath, productsJSON);
  
      res.redirect("/productDetail");
    },

      /* ---------------------------------------- */
      // editar
    
      editarProducto: (req, res) => {
        
        const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
        // Obtener el ID del producto a editar de la ruta
        let id = req.params.id;
  
        // Encontrar el producto con el ID especificado
        let producto = productos.find(p => p.id == id);
    
        // Pasar el producto a la vista
        return res.render("product/editar-producto", { producto });
      },


      /* --------- */
    
      productoEditado: (req, res) => {

        const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
        // Obtener el id del producto
        const idProducto = req.params.id;

        // Crear un nuevo producto usando los valores que nos da el req.body
        const nuevoProducto = {
          id: parseFloat(idProducto),
          nombre: req.body.nombre,
          categoria: req.body.categoria,
          descripcion: req.body.descripcion,
          precio: parseFloat(req.body.precio),
          imagen: req.file ? req.file.filename : "default-image.png"
        };
    
        // Verificar si el ID del producto existe en el archivo
        const indexProducto = productos.findIndex(producto => producto.id == idProducto);
        
        // Actualizar el producto
        productos[indexProducto] = nuevoProducto;
        // Guardar los cambios en el archivo JSON
		    /* Reconvertir a JSON */
		  let productsJSON = JSON.stringify(productos, null, " ");

		  /* Escribir en el archivo JSON en si */
		  fs.writeFileSync(productosFilePath, productsJSON);
    
        res.redirect("/productDetail");
      },
    
      /* ---------------------------------------------------------------- */
      // eliminar
      productoEliminado: (req, res) => {
        let id = req.params.id;

        const products = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
    
        let finalProducts = products.filter(product => {
          return product.id != id
        })
        
        /* Reconvertir a JSON */
        let productsJSON = JSON.stringify(finalProducts, null, " ");
    
        /* Escribir en el archivo JSON en si */
        fs.writeFileSync(productosFilePath, productsJSON);
    
        // Redirige a la página principal de productos.
        res.redirect('/productDetail');
      },
    
      /* ---------------------------------------------------------------- */
      // buscar
      buscarProducto: (req, res) => {

        // esto es para leer el archivo y dejar siempre arriba 
        const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

       let search = req.query.search;
       let productoResults = productos.filter(producto => producto.nombre.toLowerCase().includes(search));	

       res.render("product/search-producto",{productoResults: productoResults,search})
      },
    }
    
    module.exports = productos;