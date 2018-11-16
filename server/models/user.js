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

const Model = mongoose.model('User', user)

exports.Model = Model
