const mongoose = require("mongoose")

var MarvelSchema = new mongoose.Schema({
    name: String,
    status: String,
    origin: String,
    image: String,
    price: String,
    material: String

})

var MarvelModel = mongoose.model('marvel', MarvelSchema, 'marvel')
module.exports = MarvelModel