const {google} = require('googleapis')

const oauth2Client = new google.auth.OAuth2(
  process.env.googleClientId,
  process.env.googleClientSecret,
  'http://localhost:8000/api/user/oauthCb'
)

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

const loginUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
})

const oauth2 = google.oauth2({
  version: 'v2',
  auth: oauth2Client
})

module.exports = {
  loginUrl,
  oauth2Client,
  oauth2
}
