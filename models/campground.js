const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String, 
    price: String,
    description: String,
    location: String
});

mongoose.model.exports = mongoose.model('Campground', CampgroundSchema)