const express = require("express");
const router = express.Router();

const carritoController = require("../controllers/carritoControllers");

router.get('/',  carritoController.carrito)

module.exports=router;