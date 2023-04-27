// **** Require's ****
const express = require("express");
const app = express();
const session = require("express-session");
const path = require ('path')
const methodOverride = require("method-override");
const publicPath = path.resolve(__dirname, '../public');
const cookies = require("cookie-parser")
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware")

app.use(session({
    secret: "Shh",
    resave: false,
    saveUninitialized: false,
}));
app.use(cookies());
app.use(userLoggedMiddleware);
app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(express.static(publicPath));
app.use(methodOverride("_method"))
/* template engine */
app.set("view engine", "ejs"); // motor de vistas
app.set('views', path.join(__dirname, 'views'));// define la ubicacion de la carpeta vistas
// Importar los distintos enrutadores
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const mainRoutes = require("./routes/mainRoutes");


// Usando los enrutadores importados
app.use('/', mainRoutes);
app.use('/productDetail', productRoutes);
app.use('/users', userRoutes);

// error 404 tiene q ir siempre al final, clave
app.use((req,res, next)=> {
    res.status(404).send("404, pagina no encontrada")
}); 

/* levantar el server */
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000")
});