const mongoose = require("mongoose")

var DCSchema = new mongoose.Schema({
    name: String,
    status: String,
    origin: String,
    image: String,
    price: String,
    material: String

})

var DCModel = mongoose.model('DC', DCSchema, 'dc')
module.exports = DCModel