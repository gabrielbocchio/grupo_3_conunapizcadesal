// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");
const adminMiddleware = require("../middlewares/adminMiddleware");
let db= require ("../database/models");

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

//API
router.get("/api/products", (req, res) => {
    db.Product.findAll()
        .then(products => res.json(products))
        .catch(error => {
            res.status(500).json({ error: 'Ha ocurrido un error, intente nuevamente' });
        });
});
//API
router.get("/api/category", (req, res) => {
    db.Category.findAll()
        .then(categories => res.json(categories))
        .catch(error => {
            res.status(500).json({ error: 'Ha ocurrido un error, intente nuevamente' });
        });
});


// api parametrizada
router.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;

    db.Product.findByPk(productId)
        .then(product => {
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ error: 'Producto no encontrado' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'Ha ocurrido un error, intente nuevamente' });
        });
});

//api, ruta para borrar producto
router.delete("/api/products/:id", (req, res) => {
    const productId = req.params.id;
  
    db.Product.destroy({ where: { id: productId } })
      .then(() => {
        res.json({ message: 'Producto eliminado exitosamente' });
      })
      .catch(error => {
        res.status(500).json({ error: 'Ha ocurrido un error, intente nuevamente' });
      });
  });

//api, ruta para borrar producto
router.delete("/api/products/:id", (req, res) => {
    const productId = req.params.id;
  
    db.Product.destroy({ where: { id: productId } })
      .then(() => {
        res.json({ message: 'Producto eliminado exitosamente' });
      })
      .catch(error => {
        res.status(500).json({ error: 'Ha ocurrido un error, intente nuevamente' });
      });
  });




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