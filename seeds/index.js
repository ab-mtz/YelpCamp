const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');



//I had an error trying to conect trough this path: localhost:27017
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB conection error:"));
db.once("open", () => {
    console.log("Database conected");
})

const sample = array => Math.floor(Math.random() * 1000);


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})