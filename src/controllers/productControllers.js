const productos={
    agregarProdu: (req,res)=> {
        return res.render("productDetail");
    },
     carrito: (req,res)=> {
        return res.render("productCart");
    }, 

}


module.exports=productos;