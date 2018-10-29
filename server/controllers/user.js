const {loginUrl, oauth2Client} = require('../OAuth')

exports.getLoginUrl = (req, res) => {
  res.status(200).json({url: loginUrl})
}

exports.handleAuth = (req, res) => {
  oauth2Client.getToken(req.query.code)
    .then(response => {
      oauth2Client.setCredentials(response.tokens)
    })
}
