const mongoose = require('mongoose')

const rideSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  origin: String,
  destination: String,
  rider: {type: mongoose.SchemaTypes.ObjectId, ref: 'Rider'},
  driver: {type: mongoose.SchemaTypes.ObjectId, ref: 'Driver'},
  status: String
})

module.exports = mongoose.model('Ride', rideSchema)
