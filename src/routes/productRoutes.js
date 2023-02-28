const express = require("express");
const router = express.Router();

const productController = require("../controllers/productControllers");

router.get('/', productController.agregarProdu);
router.get('/productDetail', productController.carrito);

module.exports=router;