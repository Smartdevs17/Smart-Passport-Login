 const passport = require("passport");
 
 const checkAuthenticated = function checkAuthenticated(req,res, next) {
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect("/login");
}


const checkNotAuthenticated =  function checkNotAuthenticated(req,res, next) {
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    next()
}
 
 
 module.exports = checkAuthenticated;

module.exports = checkNotAuthenticated;