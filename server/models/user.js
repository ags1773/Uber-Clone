const mongoose = require('mongoose')

const user = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: String,
  googleId: String,
  pastRides: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Ride'}],
  currentRide: {type: mongoose.SchemaTypes.ObjectId, ref: 'Ride'},
  location: {
    type: {type: String},
    coordinates: [Number]
  }
})

module.exports = mongoose.model('User', user)
