var io = require('./objects/json-io');



exports.readSnippets = function(req,res){
    var resp = io.readJson('/snippets.json');
    res.json(resp);
}
exports.writeSnippets = function(req,res){
    try{
        io.writeJson(req.body,'/snippets.json');
    }
    catch(e){
        console.log(e);
    }
}