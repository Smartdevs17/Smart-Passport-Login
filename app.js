if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

// Require npm packages for development
const express = require('express');
const ejs = require("ejs");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const { connection } = require("./db/db-config");


// Passport Config
require("./config/passport-config")(passport);


const User = require("./models/user")

// initializePassport(passport)


const homeRoute = require("./routes/index");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");


app.set("view engine","ejs")
app.use(express.static(__dirname + "/public/"));
app.use(express.urlencoded({extended: false}));

//Express Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(methodOverride("_method"))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/",homeRoute);
app.use("/login",loginRoute);
app.use("/register",registerRoute)


port = process.env.PORT || 3000
app.listen(port,function (req,res) {
    console.log(`Server started running on ${port} `);
})
