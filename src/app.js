// ************ Require's ************
const express = require("express");
const app = express();
const path = require ('path')
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended:false }));
app.use(express.json());
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.set("view engine", "ejs"); // motor de vistas
app.set('views', path.join(__dirname, 'views'));// define la ubicacion de la carpeta vistas

app.use(methodOverride("_method"))

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