// Requerimos express y guardamos la ejecución del método Router, que usaremos en el archivo.
const express = require("express");
// Router con R mayuscula
const router = express.Router();

// Importamos el controlador de las rutas por defecto
const mainController = require("../controllers/mainControllers");

// En vez de app.get, utilizamos router.get. Esto va "guardando" en router las distintas rutas, que luego exportamos
// Procesa el pedido get con ruta /
router.get('/', mainController.index);
router.get('/quien-somos', mainController.quiensomos);

/* agrego una nueva url, parto agregando aca este reglon list, dps voy a mainController y creo list dentro del objeto literal controller, dps creo el EJS con el nombre que le di en el objetyo literal */
router.get('/eventos', mainController.eventos);



// Exportamos la variable router ya con todas las rutas "guardadas", que se usará en app.js
module.exports=router;