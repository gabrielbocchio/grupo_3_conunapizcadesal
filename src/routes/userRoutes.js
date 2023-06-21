// ************ Require's ************
const express = require("express");
const router = express.Router();
const path = require('path');
const { check } = require('express-validator');
let db= require ("../database/models");

const multerMiddleware = require("../middlewares/multerMiddleware");
const validations = require("../middlewares/validateRegisterMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")

// ************************
const userController = require("../controllers/userControllers");
// ************************



// API
router.get("/api/users", (req, res) => {
    db.User.findAll()
        .then(users => res.json(users))
        .catch(error => {
            res.status(500).json({ error: 'Ha ocurrido un error, intente nuevamente' });
        });
});
// api parametrizada
router.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;

    db.User.findByPk(userId)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'Usuario no encontrado' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'Ha ocurrido un error, intente nuevamente' });
        });
});

// Eliminar un usuario por ID
router.delete("/api/users/:id", (req, res) => {
    const userId = req.params.id;
  
    db.User.destroy({ where: { id: userId } })
      .then(() => {
        res.json({ message: 'Usuario eliminado exitosamente' });
      })
      .catch(error => {
        res.status(500).json({ error: 'Ha ocurrido un error, intente nuevamente' });
      });
  });

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