const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false) // gets rid of DeprecationWarning: collection.findAndModify is deprecated

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

driverSchema.index({location: '2dsphere'})

const Model = mongoose.model('Driver', driverSchema)
exports.model = Model

exports.createDriver = body => Model.create(body)
exports.saveDriver = driver => driver.save()
exports.findDriversWithin = (userLoc, distance) => Model.find({
  location: {
    $nearSphere: {
      $geometry: {
        type: 'point',
        coordinates: userLoc
      },
      $maxDistance: distance
    }
  }
})
exports.updateDriver = (id, updateObj, callback) => {
  console.log('Inside driver model >>', id, updateObj)
  Model.findOneAndUpdate(id, {$set: updateObj}, callback)
}
exports.deleteDriver = id => Model.remove({_id: id})
