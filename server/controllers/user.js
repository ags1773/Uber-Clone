const {loginUrl, oauth2Client, oauth2} = require('../OAuth')
const mongoose = require('mongoose')
const Users = require('../models/user')

exports.getLoginUrl = (req, res) => {
  res.status(200).json({url: loginUrl})
}

exports.handleAuth = (req, res) => {
  oauth2Client.getToken(req.query.code)
    .then(response => {
      oauth2Client.setCredentials(response.tokens)
      return getUserInfo()
    })
    .then(response => {
      let user = {
        name: response.data.name,
        email: response.data.email,
        gender: response.data.gender,
        picture: response.data.picture
      }
      handleUsers(user, res)
    })
}

let getUserInfo = () => {
  return new Promise((resolve, reject) => {
    oauth2.userinfo.v2.me.get((error, info) => {
      if (error) {
        reject(error)
      }
      resolve(info)
    })
  })
}

let handleUsers = (user, res) => {
  Users.find({email: user.email})
    .then(existingUser => {
      if (existingUser !== null) {
        res.user = existingUser
        res.redirect('/api/user/redirect')
        // res.status(200).json({
        //   user: existingUser,
        //   url: '/user'})
      }
      let newUser = new Users({
        _id: new mongoose.Types.ObjectId(),
        ...user
      })
      newUser.save()
        .then(result => {
          res.redirect('/api/user/redirect')
        })
        .catch(err => {
          res.status(500).json(err)
        })
    })
}

exports.redirectUser = (req, res) => {
  console.log('REQUEST', req)
  console.log('\n\n\n\n\n RESPONSE', res)
}
