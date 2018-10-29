require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const server = app.listen(port, () => console.log(`UberClone server running on port ${port}`))
const io = require('socket.io').listen(server)

require('./passport-config')
const cookieSession = require('cookie-session')
const passport = require('passport')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const socketioCb = require('./socketioCb')

const userRoutes = require('./routes/user')
const driverRoutes = require('./routes/driver')
const rideRoutes = require('./routes/ride')

mongoose.connect(`${process.env.dbURI}`, { useNewUrlParser: true })

if (process.env.MODE === 'development') {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}
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
io.on('connection', socket => socketioCb(socket))

app.use((req, res, next) => {
  let error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json(error.message)
})
