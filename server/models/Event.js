const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EventSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    date: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = new mongoose.model('Event', EventSchema)