const mongoose = require('mongoose')

const rider = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: String,
  pastRides: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Ride'}],
  currentRide: {type: mongoose.SchemaTypes.ObjectId, ref: 'Ride'},
  location: {
    type: {type: String},
    coordinates: [Number]
  }
})

module.exports = mongoose.Model('Rider', rider)
