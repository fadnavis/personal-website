var express = require("express");
var router = express.Router();
var Blogpost = require("../models/blogpost");

//NEW ROUTE
router.get("/new",function(req,res){
  res.render("blogpost/new");
});

//SHOW ROUTE
router.get("/:id",function(req,res){
  var id = req.params.id;
  Blogpost.findById(id,function(err,post){
    if(err) {
      console.log("Some error ocurred while showing");
    } else {
      res.render("blogpost/show",{blogpost: post});
    }
  });
});

router.post("/",function(req,res){

  var title = req.body.blogtitle;
  var imageurl = req.body.blogimage;
  var fulltext = req.body.blogfulltext;
  fulltext = req.sanitize(fulltext);
  var newBlogPost = {title: title,image: imageurl, fulltext: fulltext};
  Blogpost.create(newBlogPost,function(err,post){
    if(err) {
      console.log("error creating a new blog post");
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router
