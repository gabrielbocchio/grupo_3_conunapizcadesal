const fs = require("fs");
const path = require("path");
const usuariosFilePath = path.join(__dirname, "../database/users.json");
const { validationResult } = require('express-validator');

const users={
/* -- renderizo el get del log-in -- */
    login: (req,res)=> {
        return res.render("users/login");
    },
/* -- renderizo el get del sign-in -- */
     signin: (req,res)=> {
        return res.render("users/signin");
    }, 

    processLogin: (req,res)=> {
        return res.send("probando el post che");
    },

    /* creacion de usuario y pusheo a json, pasado con validaciones */
    processSignin: (req,res)=> {
        
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('users/signin', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        const users = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));
        
        let usuario = {
            nombre: req.body.firstname,
            apellido: req.body.lastname,
            id: users[users.length - 1].id + 1,
            email: req.body.email,
            password: req.body.password,
            repeatpassword: req.body.repeatpassword,
            imagen: req.file ? req.file.filename : "default-image.png"
          };
  
        // Aplicar código para hacer lo que se necesita
         users.push(usuario);
        // Convertir el arreglo de productos a formato JSON
        let usersJSON = JSON.stringify(users, null, " ");
        // Escribir el archivo con los nuevos datos
        fs.writeFileSync(usuariosFilePath, usersJSON);


		return res.redirect("/");

    }, 



}

module.exports=users;