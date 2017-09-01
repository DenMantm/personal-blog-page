var blogPost = require('../database/models/blog-post');



// ~~~~~~~~~~~~~~~~~ BLOG POSTS SECTION

exports.createNewBlogPost = function(req,res){
    var newBlogPost  = new blogPost();
    
        //mapping the values=
        newBlogPost.title        = req.body.title;
        newBlogPost.date         = Date();
        newBlogPost.author       = req.user.username;
        newBlogPost.blogElements = req.body.blogElements;
        newBlogPost.isPosted     = false;
        
                newBlogPost.save(function(err,blog) {
                    if (err)
                        res.send(err);
                    else
                        res.json(blog);
                });
        
}
exports.getBlogPostList = function(req,res){
        blogPost.find({}).select({ title: 1,date : 1, author: 1 }).exec(function(err,blogList){
            res.json(blogList);
        });
}
exports.getBlogPost = function(req,res){
        blogPost.findOne({ '_id' :  req.query.blogId }, function(err, blog) {
            
            if(err) {
                res.status(400);
                res.send('Error, cannot retrieve data from DB');
            }
            else if(!blog) {
                res.status(404)
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
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
});
    
}



//~~~~~~~~~~~~~~~~~~~~~~~~ SNIPPETS SECTION