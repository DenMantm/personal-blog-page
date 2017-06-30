var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

var userModel = require('./database/userModel');
  
  
module.exports = function() {
  passport.use(new LocalStrategy(
    function(username, password, done) {
             userModel.findOne({ 'userName' :  username }, function(err, user) {
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

}