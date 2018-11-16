const {google} = require('googleapis')

const oauth2UserClient = new google.auth.OAuth2(
  process.env.googleUserClientId,
  process.env.googleUserClientSecret,
  'http://localhost:8000/api/user/oauthCb'
)

const oauth2DriverClient = new google.auth.OAuth2(
  process.env.googleDriverClientId,
  process.env.googleDriverClientSecret,
  'http://localhost:8000/api/driver/oauthCb'
)
// const oauth2UserClient = new google.auth.OAuth2(
//   process.env.googleUserClientId,
//   process.env.googleUserClientSecret,
//   'https://chuha.herokuapp.com/'
// )

// const oauth2DriverClient = new google.auth.OAuth2(
//   process.env.googleDriverClientId,
//   process.env.googleDriverClientSecret,
//   'https://chuha.herokuapp.com/'
// )

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

const userLoginUrl = oauth2UserClient.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
})

const driverLoginUrl = oauth2DriverClient.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
})

const oauth2User = google.oauth2({
  version: 'v2',
  auth: oauth2UserClient
})

const oauth2Driver = google.oauth2({
  version: 'v2',
  auth: oauth2DriverClient
})

module.exports = {
  userLoginUrl,
  oauth2UserClient,
  oauth2User,
  driverLoginUrl,
  oauth2DriverClient,
  oauth2Driver
}
