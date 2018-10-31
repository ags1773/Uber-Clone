const mongoose = require('mongoose')
const Drivers = require('../models/driver')
const {driverLoginUrl, oauth2DriverClient, oauth2Driver} = require('../OAuth')

exports.getLoginUrl = (req, res) => {
  res.status(200).json({
    url: driverLoginUrl
  })
}

exports.handleAuth = (req, res) => {
  oauth2DriverClient.getToken(req.query.code)
    .then(response => {
      oauth2DriverClient.setCredentials(response.tokens)
      return getDriverInfo()
    })
    .then(result => {
      let driver = {
        name: result.data.name,
        email: result.data.email,
        gender: result.data.gender,
        picture: result.data.picture
      }
      handleDriver(driver, req, res)
    })
}

let getDriverInfo = () => {
  return new Promise((resolve, reject) => {
    oauth2Driver.userinfo.v2.me.get((error, info) => {
      if (error) {
        reject(error)
      }
      resolve(info)
    })
  })
}

let handleDriver = (driver, req, res) => {
  Drivers.model.find({email: driver.email})
    .then(existingDriver => {
      if (existingDriver.length !== 0) {
        req.session.driver = existingDriver
        res.redirect('/driver')
        return
      }
      let newDriver = new Drivers.model({
        _id: new mongoose.Types.ObjectId(),
        location: {
          type: 'Point',
          coordinates: [77.5946, 12.9716]
        },
        ...driver
      })
      newDriver.save()
        .then(driver => {
          req.session.driver = driver
          res.redirect('/driver')
        })
        .catch(err => {
          console.log('ERROR WHILE MAKING NEW DRIVER ', err)
        })
    })
}

exports.createDriver = (req, res) => {
  Drivers.createDriver(req.body)
    .then(created => Drivers.saveDriver(created))
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err))
  // let newDriver = new Drivers({
  //   _id: new mongoose.Types.ObjectId(),
  //   ...req.body
  // })
  // newDriver.save()
  //   .then(result => {
  //     res.status(200).json(result)
  //   })
  //   .catch(err => {
  //     res.status(500).json(err)
  //   })
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
  // Drivers.remove({_id: req.params.id})
  //   .then(result => {
  //     res.status(200).json(result)
  //   })
  //   .catch(e => {
  //     res.status(500).json(e)
  //   })
}
