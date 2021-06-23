const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EventSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    date: String
})

module.exports = new mongoose.model('Event', EventSchema)