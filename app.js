var express = require("express");

var app = express();
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));


app.get("/",function(req,res){
  res.render("landing");
});

app.get("/about",function(req,res){
  res.render("about");
});

app.get("/contact", function(req,res){
  res.render("contact");
});

app.listen(process.env.PORT,process.env.IP,function(){
  console.log("app has started listening at port");
});
