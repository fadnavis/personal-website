var express = require("express");

var app = express();


app.get("/",function(req,res){
  res.send("This is a home page...WIP");
});


app.listen(process.env.PORT,process.env.IP,function(){
  console.log("app has started listening");
});
