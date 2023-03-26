const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const usuariosFilePath = path.join(__dirname, "../database/users.json");
const { validationResult } = require('express-validator');
const User = require("../models/User");

const users={
    /* -- renderizo el get del sign-in -- */
    signin: (req,res)=> {
        return res.render("users/signin");
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
        let userInDB = User.findByField("email", req.body.email);
        if(userInDB){
            return res.render('users/signin', {
                errors: {
                    email: {
                        msg: "Este email ya está registrado"
                    }
                },
                oldData: req.body
            }); 
        };
        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password , 10),
            repeatpassword: bcryptjs.hashSync(req.body.repeatpassword , 10),
            avatars: req.file ? req.file.filename : "default-image.png"
        }
        let userCreated = User.create(userToCreate);
        return res.redirect("/users/login");
        
    }, 
    /* -- renderizo el get del log-in -- */
    login: (req,res)=> {
            return res.render("users/login");
        },
    
    processLogin: (req,res)=> {
        let userToLogin = User.findByField("email", req.body.email);  
        if(userToLogin){
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
            if(isOkThePassword){
                delete userToLogin.password;
                delete userToLogin.repeatpassword;
                req.session.userLogged = userToLogin;

                if(req.body.remember_user){
                    res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 2})
                }
                    return res.redirect('/')
                }
                return res.render('users/login', {
                    errors: {
                        email: {
                         msg: "Las credenciales no son válidas"
                    }
                }
                }); 
            }
            return res.render('users/login', {
            errors: {
                email: {
                 msg: "Las credenciales no son válidas"
            }
        }
        }); 

     
        },
    profile: (req,res)=>{
            res.render("users/userProfile", {
                user: req.session.userLogged
            })
        },
    
    logout: (req,res)=>{
            res.clearCookie("userEmail");
            req.session.destroy();
            return res.redirect("/");
        },

    
    
    }
    
    module.exports=users;