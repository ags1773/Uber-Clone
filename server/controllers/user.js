const passport = require('passport')

exports.login = passport.authenticate('google', {
  scope: ['profile']
})

exports.logout = (req, res) => {
  req.logout()
  res.send('Logging out!')
}

exports.redirectUser = (passport.authenticate('google'), (req, res) => {
  res.send('logged in')
})
