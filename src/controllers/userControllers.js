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
          req.session.userLogged = userToCreate;
  
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
                  const user = {
                    id: userToLogin.id,
                    firstname: userToLogin.firstname,
                    lastname: userToLogin.lastname,
                    email: userToLogin.email,
                    avatars: userToLogin.avatars ? userToLogin.avatars.toString() : "default-image.png"
                  };
        
                  req.session.userLogged = user;
        
                  if (req.body.remember_user) {
                    res.cookie("userEmail", req.body.email, { maxAge: (1000 * 60) * 10 })
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
        
        profile: (req, res) => {
          const user = req.session.userLogged;
          
          if (req.file) {
            user.avatars = req.file.filename;
            req.session.userLogged = user;
          } else if (!user.avatars) {
            user.avatars = "default-image.png";
          }
        
          res.render("users/userProfile", { user });
        },
    
    logout: (req,res)=>{
            res.clearCookie("userEmail");
            req.session.destroy();
            return res.redirect("/");
        },
    editPassword: (req,res)=>{
        return res.render("users/change-password")
      },
      processEditPassword: (req, res) => {
        const currentPassword = req.body.currentPassword;
        const newPassword = req.body.password;
        const userId = req.session.userLogged.id;
    
        db.Users.findOne({ where: { id: userId } })
          .then((user) => {
            if (!user) {
              return res.redirect("/");
            }
    
            const isCorrectPassword = bcryptjs.compareSync(currentPassword, user.password);
    
            if (!isCorrectPassword) {
              return res.render("users/change-password", {
                errors: {
                  currentPassword: {
                    msg: "La contraseña actual es incorrecta"
                  }
                }
              });
            }
    
            const hashedPassword = bcryptjs.hashSync(newPassword, 10);
    
            db.Users.update({ password: hashedPassword }, { where: { id: userId } })
              .then(() => {
                return res.redirect("/");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      },
      
    editAvatar: (req,res)=>{
        return res.render("users/change-avatar")
      },
      processEditAvatar: (req,res)=>{
        const userId = req.session.userLogged.id;
      
        if (!req.file) {
          return res.redirect('/users/profile');
        }
      
        db.Users.update ({
          avatars:req.file.filename,
        }, {
          where: {
            id: userId
          }
        }) 
        .then(() => {
          req.session.userLogged.avatars = req.file.filename;
          res.redirect("/users/profile");
        })
        .catch((error) => {
          console.log(error);
        });
      },

    
    
    }
    
    module.exports=userControllers;