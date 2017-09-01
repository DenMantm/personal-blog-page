// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var blogElement = mongoose.Schema({
        id       : String,
        type     : String,
        style    : String,
        text     : String
});



var blogPost = mongoose.Schema({
        title        : String,
        date         : String,
        author       : String,
        blogElements : [blogElement],
        isPosted     : Boolean
});


blogPost.methods.nextId = function(obj) {
    //do something to get next one
};

// create the model for users and expose it to our app
module.exports = mongoose.model('BlogCollection', blogPost);
