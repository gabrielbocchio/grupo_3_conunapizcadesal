const users={

    login: (req,res)=> {
        return res.render("users/login");
    },
     signin: (req,res)=> {
        return res.render("users/signin");
    }, 

}

module.exports=users;