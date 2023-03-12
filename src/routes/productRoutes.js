const express = require("express");
const router = express.Router();

const productController = require("../controllers/productControllers");

// buscar
router.get('/search-producto/:id?', productController.buscarProducto);

// main de producto (productDetail)
router.get('/', productController.produ);

//filtro x categoria
router.get('/detalle/:category', productController.produCategoria);

// descripcion
router.get('/productInfo/:id', productController.productInfo);

// carrito
router.get('/productCart', productController.carrito);

// crear
router.get('/crear-producto', productController.crearProducto);
router.post('/', productController.guardarProducto);

// editar
router.get('/editar-producto/:id?', productController.editarProducto);
router.put('/editar-producto/:id', productController.productoEditado);

// eliminar
router.delete('/delete-producto/:id', productController.productoEliminado);



module.exports=router;