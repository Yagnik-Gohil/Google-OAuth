const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                let user = await User.findOne({ googleId: profile.id });
                if (user) {
                    cb(null, user);
                } else {
                    const newUser = {
                        googleId: profile.id,
                        displayName: profile.displayName,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        image: profile.photos[0].value
                    }
                    user = await User.create(newUser);
                    cb(null, user);
                }
            } catch (err) {
                console.log(err.message)
            }
        }))

    passport.serializeUser((user, cb) => {
        process.nextTick(() => {
            cb(null, { id: user.id, username: user.username, name: user.name });
        });
    });

    passport.deserializeUser((user, cb) => {
        process.nextTick(() => {
            return cb(null, user);
        });
    });
}