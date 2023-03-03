// Requerimos express y lo ejecutamos para tener disponibles todos los metodos que vamos a precisar
const express = require("express");
const app = express();
// Path : poder unificar las rutas dentros de los distintos sistemas operartivos
const path = require ('path')

// Importar los distintos enrutadores
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const mainRoutes = require("./routes/mainRoutes");
const carritoRoutes = require("./routes/carritoRoutes");

/* carpeta archivos publicos */
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));


// -- Template Engine --
app.set("view engine", "ejs"); // motor de vistas
app.set('views', path.join(__dirname, 'views'));// define la ubicacion de la carpeta vistas

// Usando los enrutadores importados
app.use('/', mainRoutes);
app.use('/productDetail', productRoutes);
app.use('/login', userRoutes);
app.use('/productCart', carritoRoutes);

//estos prox 2 son para el metodo POST, para que pueda leer req.body (req.body en POST es el 'req.query' del get)
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

//pasar como metodo el paquete instalado para usar el metodo PUT (npm install method-override --save))
const methodOverride = require("method-override");
app.use(methodOverride("_method"))

// error 404 tiene q ir siempre al final, clave
app.use((req,res, next)=> {
    res.status(404).send("404, pagina no encontrada")
}); 

/* levantar el server */
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000")
});