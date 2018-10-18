const mongoose = require('mongoose')
const Rides = require('../models/ride')

exports.createRide = (req, res) => {
  let ride = new Rides({
    _id: new mongoose.Types.ObjectId(),
    origin: req.body.origin,
    destination: req.body.destination,
    user: req.body.user,
    status: 'Open'
  })
  ride.save()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}
