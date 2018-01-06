var express = require('express')
var app = express()
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var passport = require("passport")
var LocalStrategy = require("passport-local")
var Campground = require("./models/campground")
var Comment = require("./models/comment")
var User = require("./models/user")
var seedDB = require("./seeds")

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
seedDB()

app.get('/', function( req, res){
    res.render('landing')
})

//Index route
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds})
        }
    })
})

//CREATE add new campground to daatabase
app.post("/campgrounds", function(req, res){
    //get data from the form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image
    var desc = req.body.description
    var newCampground = {
        name: name,
        image: image,
        description: desc
    }
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else {
            res.redirect("/campgrounds")
        }
    })
})

//NEW - show for to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new")
})

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
    req.params.id
    //render show template with that campground
    
})

//=======================
//         comments routes
//=======================

app.get("/campgrounds/:id/comments/new", function(req, res){
        //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground})
        }
    })
})

app.post("/campgrounds/:id/comments", function(req, res){
    //look up campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
            res.redirect("/campgrounds")
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                    campground.comments.push(comment)
                    campground.save()
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
    //create new comment
    //connet new comment to campground
    //redirect to campground showpage
})

app.listen(3000, function(){
    console.log('listening on localhost 3000')
})