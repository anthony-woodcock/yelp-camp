var express = require('express')
var app = express()

app.set("view engine", "ejs")

app.get('/', function( req, res){
    res.render('landing')
})

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "The Roaches", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
        {name: "The Cloud", image: "https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg"},
        {name: "Macclesfield Forest", image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"}
    ]
    res.render("campgrounds", {campgrounds: campgrounds})
})

app.listen(3000, function(){
    console.log('listening on localhost 3000')
})