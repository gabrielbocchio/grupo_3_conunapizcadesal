
const express = require('express');
// Path : poder unificar las rutas dentros de los distintos sistemas operartivos
const path = require ('path')

const app = express();

/* routes */
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const mainRoutes = require("./routes/mainRoutes");
const carritoRoutes = require("./routes/carritoRoutes");

/* carpeta archivos publicos */
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

/* levanto server */
app.listen(3000,()=> console.log('Servidor corriendo en el puerto 3000'));

// ************ Template Engine ************
app.set("view engine", "ejs"); // motor de vistas
app.set("views", "../src/views"); // define la ubicacion de la carpeta vistas

/* llamado de rutas!! */
app.use('/', mainRoutes);
app.use('/productDetail', productRoutes);
app.use('/login', userRoutes);
app.use('/productCart', carritoRoutes);

