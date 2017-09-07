var blogPost = require('../database/models/blog-post');
var snippetGroup = require('../database/models/snippet-group')



// ~~~~~~~~~~~~~~~~~ BLOG POSTS SECTION

exports.createNewBlogPost = function(req,res){
    var newBlogPost  = new blogPost();
    
        //mapping the values=
        newBlogPost.title        = req.body.title;
        newBlogPost.description  = req.body.description;
        newBlogPost.date         = Date();
        newBlogPost.author       = req.user.username;
        newBlogPost.blogElements = req.body.blogElements;
        newBlogPost.isPosted     = false;
        newBlogPost.isDeleted    = false;
        
                newBlogPost.save(function(err,blog) {
                    if (err)
                        return res.send(2, { error: err });
                    else
                        res.json(blog);
                });
        
}
exports.getBlogPostList = function(req,res){
    
        //logic that specifies if user is logged in or not and then returning drafts or not..
    
        blogPost.find({isDeleted:false}).select({ title: 1,date : 1, author: 1,description:1 }).sort('-date').exec(function(err,blogList){
            if(!err)
                res.json(blogList);
            else {
                return res.send(500, { error: err });
            }
        });

}
exports.getBlogPost = function(req,res){
        blogPost.findOne({ '_id' :  req.query.blogId }, function(err, blog) {
            
            if(err) {
                return res.send(2, { error: err });
            }
            else if(!blog) {
                res.status(1)
                res.send('Error, blog post does not exist');
            }
            else res.json(blog);
           
            
        });
}
exports.editBlogPost = function(req,res){
    //delete req.body._id;
    
    var query = {'_id':req.body._id};
    delete req.body._id;
    delete req.body.author;
    

blogPost.findOneAndUpdate(query, req.body, {upsert:true}, function(err, doc){
    if (err) 
        return res.send(2, { error: err });
    else if(!doc) {
            res.status(1);
            res.send('Error, blog post does not exist');
            }
    else return res.send("succesfully saved");
});
    
}



//~~~~~~~~~~~~~~~~~~~~~~~~ SNIPPETS SECTION
// /snippetGroup
exports.createSnippetGroup = function(req,res){
    var tmpId;
        snippetGroup.findOne({}).sort('-id').exec( function(err, doc) {
        if(!doc){tmpId = 0}
        else tmpId = doc.id+1;
        console.log(doc);
    var newSnippetGroup                 = new snippetGroup();
    newSnippetGroup.id                  = tmpId;
    newSnippetGroup.group               = newSnippetGroup.nextGroup();
    newSnippetGroup.groupName           = req.body.groupName;
    newSnippetGroup.shortDescription    = req.body.shortDescription;
    newSnippetGroup.snippets            = [];
    newSnippetGroup.isDeleted           = false;
    
    newSnippetGroup.save(function(err,blog) {
                    if (err)
                        res.send(err);
                    else
                        res.json(blog);
                });
        
        
        
        
        
     });

};
exports.getSnippetGroupList = function(req,res){
            snippetGroup.find({isDeleted:false}).select({ id: 1, group : 1, groupName: 1, snippetCounter: 1 }).sort('id').exec(function(err,snippetList){
            if(!err)
                res.json(snippetList);
            else {
                return res.send(500, { error: err });
            }
        });
};
exports.saveSnippetGroup = function(req,res){
        var query = {'_id':req.body._id};
    delete req.body._id;
    
    //adding snippet counter here for convenience
    if(req.body.snippets){
        req.body.snippetCounter = req.body.snippets.length;
    }
    
    
snippetGroup.findOneAndUpdate(query, req.body, {upsert:true}, function(err, doc){
    if (err) 
        return res.send(2, { error: err });
    else if(!doc) {
            res.status(1);
            res.send('Error, blog post does not exist');
            }
    else return res.send(doc);
});
    
    
};

exports.getSnippetGroup = function(req,res){
    
            snippetGroup.findOne({ 'id' :  req.query.snippetId }, function(err, sGroup) {
            
            if(err) {
                return res.send(2, { error: err });
            }
            else if(!sGroup) {
               // res.status(404)
               // res.send('Error, blog post does not exist');
                  res.send({});
            }
            else res.json(sGroup);
           
        });
    
};


exports.deleteSnippetGroup = function(req,res){};
exports.moveUpSnippetGroup = function(req,res){};
exports.moveDownSnippetGroup = function(req,res){};

