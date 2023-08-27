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

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://source.unsplash.com/random/600x400?sig=${Math.random()}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam reiciendis, voluptate aliquid quos dolor dolore quod quae est sed molestiae consequuntur unde. Eaque cum error doloremque, iure corporis necessitatibus? Modi?',
            price: 15
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})