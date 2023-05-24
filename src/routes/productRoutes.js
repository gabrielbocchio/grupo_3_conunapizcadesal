// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");
const adminMiddleware = require("../middlewares/adminMiddleware")

// ************ Controller Require ************
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
    cb (null, file.fieldname + '-'+ Date.now() + path.extname(file.originalname))
}

});

const upload = multer({ storage: storage });
// ************************
const productController = require("../controllers/productControllers");


// ************************
// buscar
router.get('/search-producto/:search?', adminMiddleware, productController.buscarProducto);

// todos los productos (productDetail)
router.get('/',productController.produ);

//filtro x categoria
router.get('/detalle/:category', productController.produCategoria);

// descripcion por producto 
router.get('/productInfo/:id', adminMiddleware,productController.productInfo);

// carrito
router.get('/productCart', productController.carrito);
router.post('/productCart', productController.processCarrito);

// crear
router.get('/crear-producto', adminMiddleware, productController.crearProducto);
router.post('/',upload.single('imagen'),adminMiddleware ,productController.guardarProducto);

// editar
router.get('/editar-producto/:id', adminMiddleware,productController.editarProducto);
router.put('/editar-producto/:id', adminMiddleware,upload.single('imagen') ,productController.productoEditado);

// eliminar
router.delete('/delete-producto/:id', adminMiddleware,productController.productoEliminado);



module.exports=router;