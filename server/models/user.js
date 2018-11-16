const mongoose = require('mongoose')

const user = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: String,
  email: String,
  gender: String,
  picture: String,
  pastRides: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Ride'}],
  currentRide: {type: mongoose.SchemaTypes.ObjectId, ref: 'Ride'},
  outstandingAmount: Number
})

const Model = mongoose.model('User', user)

exports.Model = Model
exports.updateUser = (id, updateObj, callback) => Model.findOneAndUpdate({_id: id}, {$set: updateObj}, callback)
