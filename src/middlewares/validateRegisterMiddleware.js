const fs = require("fs");
const path = require("path");
const { body } = require('express-validator');

module.exports = [
    body('firstname').notEmpty().withMessage(''),
    body('lastname').notEmpty().withMessage(''),
    body('email')
        .notEmpty().withMessage('').bail()
        .isEmail().withMessage(''),
    body('password').notEmpty().withMessage('')
    .isLength ({ min: 8 }).withMessage('')
    .bail(),
    body('repeatpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('');
        }
        return true;
    }),
    body('avatars').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg', '.JPG'];

        if (!file) {
            throw new Error('');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error('');
            }
        }

        return true;
    })
];
