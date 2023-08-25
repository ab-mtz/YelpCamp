const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

//I had an error trying to conect trough this path: localhost:27017
mongoose.connect('mongodb://127.0.0.1/yelp-camp', {
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

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
})


app.get('/makecampground', async (req, res) =>{
    const camp = new Campground({title: 'My backyard', price: 15, description: 'Cheep and ok camping'});
    await camp.save();
    res.send(camp)
})


app.listen(3000, () => {
    console.log("Serving in port 3000")
})