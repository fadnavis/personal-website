var express = require("express");
var mongoose = require("mongoose");
var seedDB = require("./seed");
//var Comment = require("./models/comment");
var BlogPost = require("./models/blogpost");

var dburl = "mongodb://harsh:harsh@ds137101.mlab.com:37101/harsh-blog"
mongoose.connect(dburl);

var app = express();
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

app.get("/",function(req,res){
  BlogPost.find({},function(err,posts){
    if(err) {
      console.log("Some error ocurred fetching data");
    } else {
      res.render("landing",{blogposts: posts});
    }
  });
});

app.get("/about",function(req,res){
  res.render("about");
});

app.get("/contact", function(req,res){
  res.render("contact");
});

app.listen(8080,process.env.IP,function(){
  console.log("app has started listening at port");
});
