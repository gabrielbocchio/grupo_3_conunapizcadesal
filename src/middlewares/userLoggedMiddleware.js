const db = require("../database/models");

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  if (req.session.userLogged) {
    // Si hay una sesión activa, buscar al usuario en la base de datos
    db.Users.findOne({ where: { email: req.session.userLogged.email } })
      .then((user) => {
        if (user) {
          res.locals.isLogged = true;
          res.locals.userLogged = user;
        }

        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  } else if (req.cookies.userEmail) {
    // Si no hay una sesión activa, pero hay una cookie que recuerda al usuario, establecer la sesión
    db.Users.findOne({ where: { email: req.cookies.userEmail } })
      .then((user) => {
        if (user) {
          req.session.userLogged = user;
          res.locals.isLogged = true;
          res.locals.userLogged = user;
        }

        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  } else {
    // Si no hay sesión ni cookie, continuar
    next();
  }
}

module.exports = userLoggedMiddleware;


/* const db= require("../database/models")


function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    const emailInCookie = req.cookies.userEmail;
    let userFromCookie;
    
    db.Users.findOne({ where: { email: req.session.userLogged } })
        .then((user) => {
            userFromCookie = user;

            if (userFromCookie) {
                req.session.userLogged = userFromCookie;
            }

            if (req.session.userLogged) {
                res.locals.isLogged = true;
                res.locals.userLogged = req.session.userLogged;
            }

            next();
        })
        .catch((error) => {
            console.log(error);
            next();
        });
}

module.exports = userLoggedMiddleware;  */
// este middleware por el momento no lo estoy usando todo, es para mostrar cosas a alguien logueado


/* const db = require('../database/models');

async function userLoggedMiddleware(req, res, next) {
res.locals.isLogged = false;

const emailInCookie = req.cookies.userEmail;
let userFromCookie;
try {
if (emailInCookie) {
userFromCookie = await db.Users.findOne({ where: { email: emailInCookie } });
}
} catch (error) {
console.log(error);
}

if (userFromCookie) {
req.session.userLogged = userFromCookie;
}

if (req.session.userLogged) {
res.locals.isLogged = true;
res.locals.userLogged = req.session.userLogged;
}
next();
}

module.exports = userLoggedMiddleware; */