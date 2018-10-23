const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const mongoose = require('mongoose')
const Users = require('../server/models/user')

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  Users.findById({_id: id})
    .then(user => {
      done(null, user)
    })
})

passport.use(new GoogleStrategy({
  clientID: process.env.googleClientId,
  clientSecret: process.env.googleClientSecret,
  callbackURL: '/api/user/login/redirect'
}, (accessToken, refreshToken, profile, done) => {
  Users.findOne({googleId: profile.id})
    .then(user => {
      if (user) {
        done(null, user)
      } else {
        let newRider = new Users({
          _id: new mongoose.Types.ObjectId(),
          name: profile.displayName,
          googleId: profile.id
        })
        newRider.save()
          .then(result => {
            done(null, result)
          })
      }
    })
}))
