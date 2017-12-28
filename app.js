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
    image: String
})

var Campground = mongoose.model("Campground", campgroundSchema)

// Campground.create({
//     name: "The Cloud",
//     image: "https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg",
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

app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds})
        }
    })
})

app.post("/campgrounds", function(req, res){
    //get data from the form and add to campgrounds array
    var name = req.body.name
    var image = req.body.image
    var newCampground = {
        name: name,
        image: image
    }
    campgrounds.push(newCampground)
    //redirect back to campgrounds page
    res.redirect("/campgrounds")
})

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs")
})

app.listen(3000, function(){
    console.log('listening on localhost 3000')
})