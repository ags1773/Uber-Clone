require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

require('./passport-config')
const cookieSession = require('cookie-session')
const passport = require('passport')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')
const driverRoutes = require('./routes/driver')
const rideRoutes = require('./routes/ride')

app.listen(port)

mongoose.connect(`${process.env.dbURI}`, { useNewUrlParser: true })

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: process.env.cookieKey
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/api/user', userRoutes)
app.use('/api/driver', driverRoutes)
app.use('/api/ride', rideRoutes)

app.use((req, res, next) => {
  let error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json(error.message)
})
