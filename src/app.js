const express = require('express');
// Path : poder unificar las rutas dentros de los distintos sistemas operartivos
const path = require ('path')

const app = express();

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.listen(3000,()=> console.log('Servidor corriendo en el puerto 3000'));

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'./view/home.html'))
})


