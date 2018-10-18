const mongoose = require('mongoose')
const Drivers = require('../models/driver')

exports.createDriver = (req, res) => {
  let newDriver = new Drivers({
    _id: new mongoose.Types.ObjectId(),
    ...req.body
  })
  newDriver.save()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

exports.updateDriver = (req, res) => {
  Drivers.update({_id: req.params.id}, {$set: req.body})
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

exports.findDrivers = (req, res) => {
  Drivers.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: 'point',
          coordinates: req.body.userLoc
        },
        $maxDistance: 50000
      }
    }
  })
    .then(drivers => {
      res.status(200).json(drivers)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

exports.deleteDriver = (req, res) => {
  Drivers.remove({_id: req.params.id})
    .then(result => {
      res.status(200).json(result)
    })
    .catch(e => {
      res.status(500).json(e)
    })
}
