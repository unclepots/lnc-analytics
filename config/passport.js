// Import Packages
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const apiStrategy = require('passport-http-bearer');

// Import Keys
const keys = require('./keys');

// Import Models
const User = require('../app/models/user.model');
const API = require('../app/models/api.model');

// Set Session Token
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Get Session Token
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    })
});

// Google Strategy
passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect/',
        clientID: keys.google.client_id,
        clientSecret: keys.google.client_secret
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        // Verify domain here
        if(profile._json.domain != "lncproductions.com"){
            done(new Error("Invalid host domain"));
            return;
        }

        User.findOne({
            'google_id': profile.id
        }).then(current_user => {
            if(current_user){
                console.log("old user");
                done(null, current_user);
            }else{
                console.log("new user");
                const img = profile._json.image.url.split('?');

                const user = new User({
                    google_id: profile.id,
                    email: profile.emails[0].value,
                    profile_pic: img[0],
                    display_name: profile.displayName,
                    first_name: profile.name.givenName,
                    last_name: profile.name.familyName,
                    role: "user"
                });
        
                user.save().then(new_user => {
                    done(null, new_user);
                }).catch(err => {
                    done(err, null);
                });
            }
        }).catch(err => {
            done(err, null);
        });
    })
);

passport.use(
    new apiStrategy({}, function(apiToken, done){
        API.findOne({
            api_token: apiToken
        }).then(api => {
            if(!api){
                return done(null, false);
            }else{
                return done(null, api);
            }
        }).catch(err => {
            done(err)
        })
    })
);