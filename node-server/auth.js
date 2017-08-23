var passport = require('passport');

// super important that you use "username" in the body.
exports.authenticate = function(req, res, next) {
  console.log(req.body);
  //req.body.username = req.body.username.toLowerCase();
  var auth = passport.authenticate('local', function(err, user) {
    if(err) {return next(err);}
    if(!user) { 
      return res.json({status:'failed'}); 
    }
    req.logIn(user, function(err) {
      if(err) {return next(err);}
      return res.send({status:'success', user: user});
    })
  })
  auth(req, res, next);
};
//exports.signup = passport.authenticate('signup')

exports.signup = function(req, res, next) {
  //req.body.username = req.body.username.toLowerCase();
  var auth = passport.authenticate('signup', function(err, user,info) {
      if(info.status == 'created'){
        req.logIn(user, function(err) {
       if(err) {return next(err);}
       return res.json(info);
     })
      }
      else{
        return res.json(info);
      }

     
  })
  auth(req, res, next);
};


exports.getCurrentIdentity = function(req, res, next) {
  console.log("Sending this value: ");
  console.log(req.user);
  res.status(200).send(req.user);
  res.end();
}

exports.requiresApiLogin = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.status(403);
    res.end();
  } else {
    next();
  }
};

exports.requiresRole = function(role) {
  return function(req, res, next) {
    if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  }
}