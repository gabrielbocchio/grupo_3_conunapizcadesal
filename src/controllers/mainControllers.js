// Creamos el objeto literal con los métodos a exportar


const main ={
// Manejo del pedido get con ruta
    index: (req,res)=> {
        return res.render("main/home");
    },
     quiensomos: (req,res)=> {
        return res.render("main/quiensomos");
    }, 
    eventos: (req,res)=> {
        return res.render("main/eventos");
    }, 

}

// Exportamos el objeto literal con los distintos métodos, que se usará en el enrutador por defecto
module.exports=main;