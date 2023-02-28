const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainControllers");

router.get('/', mainController.index);
router.get('/quien-somos', mainController.quiensomos);
router.get('/eventos', mainController.eventos);

module.exports=router;