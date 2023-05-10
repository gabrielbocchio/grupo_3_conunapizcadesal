// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");

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
router.get('/search-producto/:search?', productController.buscarProducto);

// todos los productos (productDetail)
router.get('/', productController.produ);

//filtro x categoria
router.get('/detalle/:category', productController.produCategoria);

// descripcion por producto 
router.get('/productInfo/:id', productController.productInfo);

// carrito
router.get('/productCart', productController.carrito);

// crear
router.get('/crear-producto', productController.crearProducto);
router.post('/',upload.single('imagen') ,productController.guardarProducto);

// editar
router.get('/editar-producto/:id', productController.editarProducto);
router.put('/editar-producto/:id', upload.single('imagen') ,productController.productoEditado);

// eliminar
router.delete('/delete-producto/:id', productController.productoEliminado);



module.exports=router;