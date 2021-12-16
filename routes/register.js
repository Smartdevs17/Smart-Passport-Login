const router = require("express").Router();
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const passport = require("passport");
// const  checkNotAuthenticated  = require("../config/auth");


const User = require("../models/user");



const checkNotAuthenticated =  function checkNotAuthenticated(req,res, next) {
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    next()
}
 
router.get("/",(req,res) => {
    res.render("register")
});

router.post("/", async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);

        const {name,email} = req.body;
        User.findOne({email: email},async(user) => {
            try {
                if (user) {
                    console.log(user)
                }else{
                    const user = await new User({
                        name,
                        email,
                        password: hashedPassword
                    });
                    user.save();
                    console.log("New User saved to DB");
                    res.redirect("/login");
                }
            } catch (error) {
               console.log(error) 
            }
        })
        
    } catch (error) {
        console.log(error);
        res.redirect("/register")
    }
});


module.exports = router;