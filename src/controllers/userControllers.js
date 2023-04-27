let db = require ("../database/models");
const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');


const userControllers={
    /* -- renderizo el get del sign-in -- */
    signin: (req,res)=> {
        return res.render("users/signin");
    }, 
    
    /* creacion de usuario y pusheo a json, pasado con validaciones */
    processSignin: (req, res) => {
        const resultValidation = validationResult(req);
    
        if (resultValidation.errors.length > 0) {
          return res.render('users/signin', {
            errors: resultValidation.mapped(),
            oldData: req.body
          });
        }
    
        db.Users.findOne({ where: { email: req.body.email } })
          .then((userInDB) => {
            if (userInDB) {
              return res.render('users/signin', {
                errors: {
                  email: {
                    msg: "Este email ya está registrado"
                  }
                },
                oldData: req.body
              });
            }
    
            const userToCreate = {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: bcryptjs.hashSync(req.body.password, 10),
              avatars: req.file ? req.file.filename : "default-image.png"
            };
    
            db.Users.create(userToCreate)
              .then((userCreated) => {
                return res.redirect("/users/login");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }, 
    /* -- renderizo el get del log-in -- */
    login: (req,res)=> {
            return res.render("users/login");
        },

        processLogin: (req, res) => {
            db.Users.findOne({ where: { email: req.body.email } })
              .then((userToLogin) => {
                if (userToLogin) {
                  const isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
        
                  if (isOkThePassword) {
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;
        
                    if (req.body.remember_user) {
                      res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 2 })
                    }
        
                    return res.redirect('/');
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
              })
              .catch((error) => {
                console.log(error);
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
    
    module.exports=userControllers;