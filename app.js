const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

//I had an error trying to conect trough this path: localhost:27017
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
//Next lines have been deprecated
    // useNewUrlParser: true,
    // // useCreateIndex: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB conection error:"));
db.once("open", () => {
    console.log("Database conected");
})


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))  //when we want request info of the body to post


app.get('/', (req, res) => {
    res.render('home')
})


app.get('/campgrounds', async (req, res) =>{
   const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
})

app.get('/campgrounds/:id', async (req, res) =>{
    const campgrounds = await Campground.findById(req.params.id);
     res.render('campgrounds/show', { campgrounds });
 })
 

app.listen(3000, () => {
    console.log("Serving in port 3000")
})