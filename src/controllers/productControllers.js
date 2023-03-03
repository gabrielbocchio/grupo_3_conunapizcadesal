const productos={
    agregarProdu: (req,res)=> {
        return res.render("product/productDetail");
    },
    carrito: (req,res)=> {
        return res.render("product/productCart");
    },

}


module.exports=productos;