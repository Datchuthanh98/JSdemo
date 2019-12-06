var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

module.exports = function (passportfb) {
    passportfb.use(new FacebookStrategy({
        clientID: "1092605550920667",
        clientSecret:"5e06baf037ffe42a4a627e654454090c",
        callbackURL: "http://localhost:3000/user/auth/fb/cb" //https
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        
      }
    ));

    passportfb.serializeUser(function (user, done) {
        done(null, user._id);     
    });

    passportfb.deserializeUser(function (_id, done) {
        User.findById(_id, function (err, user) {
            done(err, user);
        });
    });

    }