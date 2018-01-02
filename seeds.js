var mongoose = require("mongoose")
var Campground = require("./models/campground")

var data = [
    {
        name: "Cloud's Rest",
        image: "https://www.decathlon.co.uk/ecuk/static/wedze/assets/img/camping/camping-background.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Sand",
        image: "https://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/06/main/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg?itok=cQMlidOg",
        description: "blah blah blah"
    },
    {
        name: "Forest Hill",
        image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?dpr=1&auto=format&fit=crop&w=376&h=251&q=60&cs=tinysrgb",
        description: "blah blah blah"
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err)
        }
        console.log("Removed campgrounds!")
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("Added a campground")
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err)
                            } else {
                                campground.comments.push(comment)
                                campground.save()
                                console.log("Created new comment")
                            }
                        })
                }
            })
        })
    })
}

module.exports = seedDB