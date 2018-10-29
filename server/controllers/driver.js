const Drivers = require('../models/driver')

exports.createDriver = (req, res) => {
  Drivers.createDriver(req.body)
    .then(created => Drivers.saveDriver(created))
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))
}

exports.updateDriver = (req, res) => {
  Drivers.updateDriver(req.params.id, req.body, (err, result) => {
    if (err) res.status(500).json(err)
    else res.status(200).json(result)
  })
}

exports.findDrivers = (req, res) => {
  console.log('USERLOC', req.body.userLoc)
  Drivers.findDriversWithin(req.body.userLoc, 50000)
    .then(drivers => res.status(200).json(drivers))
    .catch(err => res.status(500).json(err))
}

exports.deleteDriver = (req, res) => {
  Drivers.deleteDriver(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))
}

exports.findDriver = (req, res) => {
  Drivers.findDriver(req.params.id, (err, found) => {
    if (err) res.status(500).json(err)
    else res.status(200).json(found)
  })
}
