// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var snippetElement = mongoose.Schema({
        id       : Number,
        type     : String,
        style    : String,
        text     : String
});


var snippet = mongoose.Schema({
        id          : Number,
        titleText   : String,
        isDeleted   :Boolean,
        elements    : [snippetElement],
        comments    : []
});



var snippetGroup = mongoose.Schema({
        id        : Number,
        group     : String,
        groupName : String,
        shortDescription: String,
        snippets : [snippet],
        isDeleted: Boolean
});


snippetGroup.methods.nextId = function(model) {
        
};
snippetGroup.methods.nextGroup = function() {
    var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

// create the model for users and expose it to our app
module.exports = mongoose.model('SnippetGroup', snippetGroup);
