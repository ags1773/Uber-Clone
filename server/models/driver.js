const mongoose = require('mongoose')

const driverSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: String,
  car: {
    model: String,
    color: String
  },
  location: {
    type: {type: String},
    coordinates: [Number]
  },
  currentRide: {type: mongoose.SchemaTypes.ObjectId, ref: 'Ride'}
})

module.exports = mongoose.model('Driver', driverSchema)
