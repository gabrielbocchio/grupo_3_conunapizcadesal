const express = require("express");
const router = express.Router();

const productController = require("../controllers/productControllers");

// buscar
router.get('/search-producto', productController.buscarProducto);

// main de producto (productDetail)
router.get('/', productController.produ);

// carrito
router.get('/productCart', productController.carrito);

// crear
router.get('/crear-producto', productController.crearProducto);
router.post('/crear-producto', productController.guardarProducto)

// editar
router.get('/editar-producto', productController.editarProducto);
router.put('/editar-producto', productController.productoEditado);

// eliminar
router.get('/delete-producto', productController.eliminarProducto);
router.post('/delete-producto', productController.productoEliminado);



module.exports=router;