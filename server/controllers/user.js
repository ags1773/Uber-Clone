const {userLoginUrl, oauth2UserClient, oauth2User} = require('../OAuth')
const mongoose = require('mongoose')
const Users = require('../models/user')
const Drivers = require('../models/driver')

exports.getLoginUrl = (req, res) => {
  res.status(200).json({url: userLoginUrl})
}

exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect('/')
}

exports.handleAuth = (req, res) => {
  oauth2UserClient.getToken(req.query.code)
    .then(response => {
      oauth2UserClient.setCredentials(response.tokens)
      return getUserInfo()
    })
    .then(response => {
      let user = {
        name: response.data.name,
        email: response.data.email,
        gender: response.data.gender,
        picture: response.data.picture
      }
      handleUsers(user, req, res)
    })
}

exports.findDrivers = (req, res) => {
  console.log('USERLOC', req.body.userLoc)
  Drivers.findDriversWithin(req.body.userLoc, 50000)
    .then(drivers => res.status(200).json(drivers))
    .catch(err => res.status(500).json(err))
}

let getUserInfo = () => {
  return new Promise((resolve, reject) => {
    oauth2User.userinfo.v2.me.get((error, info) => {
      if (error) {
        reject(error)
      }
      resolve(info)
    })
  })
}

let handleUsers = (user, req, res) => {
  Users.find({email: user.email})
    .then(existingUser => {
      if (existingUser.length !== 0) {
        req.session.user = existingUser
        res.redirect('/user')
        return
      }
      let newUser = new Users({
        _id: new mongoose.Types.ObjectId(),
        ...user
      })
      newUser.save()
        .then(result => {
          req.session.user = result
          res.redirect('/user')
        })
        .catch(err => {
          res.status(500).json(err)
        })
    })
}
