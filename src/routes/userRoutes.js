// ************ Require's ************
const express = require("express");
const router = express.Router();
const path = require('path');
const { check } = require('express-validator');

const multerMiddleware = require("../middlewares/multerMiddleware");
const validations = require("../middlewares/validateRegisterMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")

// ************************
const userController = require("../controllers/userControllers");
// ************************

// formulario de login
router.get('/login',guestMiddleware ,userController.login);
// PROCESAMIENTO de login
router.post('/login', validations, userController.processLogin);

// formulario de registro
router.get('/signin',guestMiddleware ,userController.signin);
// PROCESAMIENTO de login
router.post('/signin', multerMiddleware.single("avatars"), validations ,userController.processSignin);

// renderizacion de perfil
router.get('/profile', authMiddleware,userController.profile);

// logout
router.get('/logout', userController.logout);


//cambiar password:
router.get('/editpassword' ,authMiddleware,userController.editPassword);
router.post('/editpassword',validations , userController.processEditPassword);

// cambiar avatar
router.get('/editavatar',authMiddleware ,userController.editAvatar);
router.post('/editavatar', multerMiddleware.single("avatars"), userController.processEditAvatar);

module.exports=router;