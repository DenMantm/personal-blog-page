var fs = require('fs');

//SImple IO Module

exports.writeJson = function(josn,filename){
    var json = JSON.stringify(josn,null, 4);
    console.log('debug - save');
    fs.writeFile(__dirname + filename, json);
}
exports.readJson = function(filename){
    var obj = JSON.parse(fs.readFileSync(__dirname + filename, 'utf8'));
    return obj;
}