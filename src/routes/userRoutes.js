const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");

router.get('/login', userController.login);
router.get('/signin', userController.signin);

module.exports=router;