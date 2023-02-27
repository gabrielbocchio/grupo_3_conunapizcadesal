const main ={

    index: (req,res)=> {
        return res.render("home");
    },
     quiensomos: (req,res)=> {
        return res.render("quiensomos");
    }, 
    eventos: (req,res)=> {
        return res.render("eventos");
    }, 

}


module.exports=main;