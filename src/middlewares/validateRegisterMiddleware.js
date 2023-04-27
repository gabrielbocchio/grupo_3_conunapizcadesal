const fs = require("fs");
const path = require("path");
const { body } = require('express-validator');

module.exports= [
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
		let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg', '.JPG'];
		
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