const mongoose = require('mongoose')
const Riders = require('../models/rider')

exports.createRider = (req, res) => {
  let newRider = new Riders({
    _id: new mongoose.Types.ObjectId(),
    ...req.body
  })
  newRider.save()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}
