const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const mongoose = require('mongoose')
const Users = require('../server/models/user')

passport.use(new GoogleStrategy({
  clientID: process.env.googleClientId,
  clientSecret: process.env.googleClientSecret,
  callbackURL: '/api/user/login/redirect'
}, (accessToken, refreshToken, profile, done) => {
  let newRider = new Users({
    _id: new mongoose.Types.ObjectId(),
    name: profile.displayName,
    googleId: profile.id
  })
  newRider.save()
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })
}))
