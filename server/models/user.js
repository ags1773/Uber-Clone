const mongoose = require('mongoose')

const user = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: String,
  email: String,
  gender: String,
  picture: String,
  pastRides: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Ride'}],
  currentRide: {type: mongoose.SchemaTypes.ObjectId, ref: 'Ride'}
})

module.exports = mongoose.model('User', user)
