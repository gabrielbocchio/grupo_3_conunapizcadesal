const main ={

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


module.exports=main;