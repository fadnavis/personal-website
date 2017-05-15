var express = require("express");
var mongoose = require("mongoose");
var seedDB = require("./seed");
var bodyParser = require("body-parser");
var expressSanitizer = require("express-sanitizer");
var passport = require("passport");
var LocalStrategy = require("passport-local");
//var Comment = require("./models/comment");
var BlogPost = require("./models/blogpost");
var User = require("./models/user");

var blogpostRoutes = require("./routes/blogpost");
var loadpostRoutes = require("./routes/loadposts");

var dburl = process.env.DATABASEURL;
mongoose.connect(dburl);

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(expressSanitizer());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is a secret string",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentuser = req.user;
    next();
});


//seedDB();

app.use("/blogposts/",blogpostRoutes);
app.use("/loadposts/",loadpostRoutes);

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

app.get("/register",function(req,res){
  res.render("register");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.post("/register",function(req,res){
  User.register(new User({username: req.body.username}),req.body.password,function(err,user){
        if(err) {
            console.log(err);
            res.render("register");
        } else {
            passport.authenticate("local")(req,res,function(){
                res.redirect("/");
            });
        }
    });
});

app.get("/logout",function(req,res){
  req.logout();
  console.log("Logging out");
  res.redirect("/");
});

app.post("/login",passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login"

    }),function(req,res){

});

app.get("/contact", function(req,res){
  res.render("contact");
});

app.listen(8080,process.env.IP,function(){
  console.log("app has started listening at port");
});
