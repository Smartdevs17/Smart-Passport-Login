const router = require("express").Router();
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const passport = require("passport")
// const  checkNotAuthenticated  = require("../config/auth");
const User = require("../models/user");
// const initializePassport = require("../config/passport-config");


// initializePassport(passport)

const checkNotAuthenticated =  function checkNotAuthenticated(req,res, next) {
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    next()
}
 



router.get("/",(req,res) => {
    res.render("login")
});

router.post("/",passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));


module.exports = router;