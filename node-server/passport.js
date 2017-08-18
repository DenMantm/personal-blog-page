var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

var userModel = require('./database/models/user');
  
  
module.exports = function() {
  passport.use(new LocalStrategy(
    function(username, password, done) {
             userModel.findOne({ 'username' :  username }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);
            // if no user is found, return the message
            if (!user)
                return done(null, false); // req.flash is the way to set flashdata using connect-flash
            return done(null, user);
        });
     
    }
  ));

  passport.serializeUser(function(user, done) {
    if(user) {
      done(null, user.id);
    }
  });

  passport.deserializeUser(function(id, done) {
        userModel.findOne({ 'id' :  id }, function(err, user) {
          done(err, user);
        });
  });
  
      passport.use('signup', new LocalStrategy(
        {
        // usernameField: 'user.username',
        // passwordField: 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req,username, password, done) {
      console.log('Working...');
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        userModel.findOne({ 'username' :  username }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err,null,{status:"error"});

            // check to see if theres already a user with that email
            if (user) {
                return done(null,null, {status:"exists"});
            } else {

				// if there is no user with that email
                // create the user
                var newUser            = new userModel();

                // set the user's local credentials
                newUser.username    = username;
                newUser.email = req.body.user.email;
                newUser.password = newUser.generateHash(password); // use the generateHash function in our user model

				// save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null,newUser, {status:"created"});
                });
            }

        });

    }));
  

}