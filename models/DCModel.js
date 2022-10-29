const mongoose = require("mongoose")

var DCSchema = new mongoose.Schema({
    name: String,
    status: String,
    origin: String,
    image: String,
    price: Number,
    material: String,
    Year: Date
})

var DCModel = mongoose.model('DC', DCSchema, 'dc')
module.exports = DCModel