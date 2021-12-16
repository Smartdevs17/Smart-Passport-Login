const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt");
const User = require("../models/user");





 module.exports = function (passport){
            



        //Config Passport Authentication
        passport.use( new LocalStrategy(
            {
        usernameField: "email",
        //   passwordField: "password"
        },
        function (email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err) return done(err);
                if (!user) return done(null, false, { message: 'Incorrect username.' });
                
                bcrypt.compare(password, user.password, function (err, res) {
                    if (err) return done(err);
                    if (res === false) return done(null, false, { message: 'Incorrect password.' });
                
                    return done(null, user);
                    });
                });
            }));


            passport.serializeUser(function (user,done) {
            done(null,user.id);
        });

        passport.deserializeUser(function (id,done) {
            User.findById(id,function (err,user) {
                done(err,user);
            });
        });
        

}


// module.exports = initialize; 