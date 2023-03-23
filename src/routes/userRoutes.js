// ************ Require's ************
const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { body, check } = require('express-validator');

// ************ Controller Require ************
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/avatars");
    },
    filename: function (req, file, cb) {
    cb (null, file.fieldname + '-'+ Date.now() + path.extname(file.originalname))
}

});

// ************************
const upload = multer({ storage: storage });
// ************************
const userController = require("../controllers/userControllers");
// ************************

const validations = [
	body('firstname').notEmpty().withMessage('Tienes que escribir tu nombre'),
	body('lastname').notEmpty().withMessage('Tienes que escribir tu apellido'),
 	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('repeatpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
        throw new Error('Las contraseñas no coinciden');
            }
         return true;
        }),
	body('avatars').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif', 'jpeg'];
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
] 

// ************************
// ************************
router.get('/login', userController.login);
router.post('/login', userController.processLogin);

router.get('/signin', userController.signin);
router.post('/signin', upload.single("avatars"), validations,userController.processSignin);



module.exports=router;