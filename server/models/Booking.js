const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookingSchema = new Schema({
    event: { type: Schema.Types.ObjectId },
    user: { type: Schema.Types.ObjectId }
    }, 
    { timestamps: true }
)

module.exports = new mongoose.model('Booking', BookingSchema)