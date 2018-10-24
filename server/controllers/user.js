const passport = require('passport')

exports.login = passport.authenticate('google', {
  scope: ['profile']
})

exports.logout = (req, res) => {
  res.send('Logging out!')
}

exports.redirectUser = (passport.authenticate('google'), (req, res) => {
  console.log('USER PASSPORT', req.user)
  res.send('logged in')
})
