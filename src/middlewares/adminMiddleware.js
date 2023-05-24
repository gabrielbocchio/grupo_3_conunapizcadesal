function adminMiddleware(req, res, next) {
    if (!req.session.userLogged) {
      return res.redirect("/");
    } else if (req.session.userLogged.email !== "admin@admin.com") {
      return res.redirect("/");
    }
    next();
  }
  
  module.exports = adminMiddleware;