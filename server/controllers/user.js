const mongoose = require('mongoose')
const Users = require('../models/user')

exports.createRider = (req, res) => {
  let newRider = new Users({
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
