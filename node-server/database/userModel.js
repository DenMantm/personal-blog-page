
// Connectiong t othe database
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    id:Number,
    userName:String,
    firstName:String,
    lastName:String,
    appSettings:{colourScheme:String,
                 navbarColourScheme:{class:String,color:String},
                 stayAlive:Boolean},
    babySettings:{babyName:String,
                  babyBirthDate:Date}
}
);


// the schema is useless so far
// we need to create a model using it
var user = mongoose.model('user', userSchema);

// make this available to our users in our Node applications
module.exports = user;