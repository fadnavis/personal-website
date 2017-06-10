var express = require("express");
var router = express.Router();
var Blogpost = require("../models/blogpost");

router.post("/",function(req,res){
  var postsperpage = 4;
  var page = req.body.index_count;
  var pageInt = parseInt(page);
  Blogpost.find({}).sort({timestamp: -1}).skip(postsperpage*page).limit(postsperpage).exec(function(err,posts){
    if(err) {
      res.send(null);
    } else {
      var htmlstring = "";
      posts.forEach(function(post){
        htmlstring += "<div class=\"post-preview\"><a href=\"/blogposts/";
        htmlstring += post.id;
        htmlstring += "\"><h2 class=\"post-title\">";
        htmlstring += post.title;
        htmlstring += "</h2><h3 class=\"post-subtitle\"><p>";
        htmlstring += post.fulltext.substring(0,100);
        htmlstring += "...</p></h3></a>";
        htmlstring += "<p class=\"post-meta\">Posted on";
        htmlstring += post.timestamp.toDateString();
        htmlstring += "</p></div><hr>";
      });
      var responseObject = {index_count: String(pageInt+1),htmlstring: htmlstring, count: posts.length};
      res.send(responseObject);
    }
  });
});

module.exports = router
