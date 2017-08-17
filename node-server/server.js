var express = require('express');
var bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var  port = process.env.PORT || 8808

var app = express();

//database connection

var mongoose = require('mongoose');
var configDB = 'mongodb://personal-blog-page:personal-blog-pageqwerty@ds145303.mlab.com:45303/personal-blog-page'
mongoose.connect(configDB); // connect to our database


require('./expressConfig')(app);

require('./passport')();

require('./routes')(app);

app.listen(port);
console.log('Listening on port ' + port + '...');