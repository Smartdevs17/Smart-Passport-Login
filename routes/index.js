const express = require("express")
const router = express.Router();
const mongoose = require("mongoose")
// const checkAuthenticated  = require("../config/auth");
const User = require("../models/user")
const passport = require("passport")

 
function checkAuthenticated(req,res, next) {
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect("/login");
}

router.get("/",checkAuthenticated,(req,res) => {
    res.render("index",{user: req.user.name})
});

// router.get("/",(req,res) => {
//       if(req.isAuthenticated()){
//        res.render("index",{user: req.user.name});
//    }else{
//        res.redirect("/login");
//    }
// })

router.delete("/logout",(req,res) => {
    req.logOut;
    res.redirect("/login")
})

module.exports = router;