var auth = require('./auth'),
  path = require('path');

var fs = require('fs');
var db = require('./database/database-simulator');

var dbIO = require('./service/database-io.service');



module.exports = function(app) {

  //Custom paths
    app.get('/projects', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });
  
  
  
  
  //Blog Post Section
  
      app.get('/blog-posts', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });
  
        app.get('/blog-posts/*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });
  
    app.post('/api/createNewBlogPost', dbIO.createNewBlogPost);
    app.post('/api/editBlogPost', dbIO.editBlogPost);
    app.get('/api/getBlogPostList', dbIO.getBlogPostList);
    app.get('/api/getBlogPost', dbIO.getBlogPost);
  
  
  //Snippet section
    app.post('/api/createSnippetGroup', dbIO.createSnippetGroup);
    app.post('/api/saveSnippetGroup', dbIO.saveSnippetGroup);
    app.get('/api/getSnippetGroupList', dbIO.getSnippetGroupList);
    app.get('/api/getSnippetGroup', dbIO.getSnippetGroup);
  
  

  //snippet-repository
    app.get('/snippet-repository', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });
      app.get('/snippet-repository/*', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });
  
    app.get('/home', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });


  //API
  //USER LOGIN
  app.post('/api/login', auth.authenticate);
  app.get('/api/currentIdentity', auth.getCurrentIdentity);
  
  //USER SIGNUP
  app.post('/api/signup', auth.signup);
  
  app.get('/api/logout', function(req, res) {
    req.logout();
    res.end();
  });

  //GETING DATA FROM THE db
  app.get('/api/snippets', db.readSnippets);
  app.post('/api/snippets',db.writeSnippets);

  app.get('/app/*', function(req, res) {
    res.sendStatus(404);
  });
  
  app.get('/node_modules/*', function(req, res) {
    res.sendStatus(404);
  });

    app.get('/node-server/*', function(req, res) {
    res.sendStatus(404);
  });

  app.get('*', function(req, res) {
    console.log('404 error', req.path);
    res.sendStatus(404);
  });


  app.get('/404', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
  });



}


// route middleware to make sure
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.send({error:"You are not logged in"});
}