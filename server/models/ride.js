const mongoose = require('mongoose')

const rideSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  origin: String,
  destination: String,
  user: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
  driver: {type: mongoose.SchemaTypes.ObjectId, ref: 'Driver'},
  status: String
})

module.exports = mongoose.model('Ride', rideSchema)
