var express = require('express')
var app = express()
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

var Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create({
//     name: "The Cloud",
//     image: "https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg",
//     description: "This is a huge granite hill, no bathrooms. No water. Beautful granite"
// }, function(err, campground){
//     if(err){
//         console.log(err)
//     }else {
//         console.log("Newly created campground")
//         console.log(campground)
//     }
// })


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
            res.render("index", {campgrounds: allCampgrounds})
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
    res.render("new.ejs")
})

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground})
        }
    })
    req.params.id
    //render show template with that campground
    
})

app.listen(3000, function(){
    console.log('listening on localhost 3000')
})