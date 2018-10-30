require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const server = app.listen(port, () => console.log(`UberClone server running on port ${port}`))
const io = require('socket.io').listen(server)

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

app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/user', express.static(path.join(__dirname, '..', 'dist')))
app.use('/driver', express.static(path.join(__dirname, '..', 'dist')))
app.use('/api/user', userRoutes)
app.use('/api/driver', driverRoutes)
app.use('/api/ride', rideRoutes)
// save socket for each user/driver in DB, delete it on disconnect
// When a user wants a ride, fetch array of drivers in the vicinity from DB. Now you have each driver's socket
// send 'rideAssigned' event on the 1st guy's socket. If he declines, emit it on the next driver's socket...
io.on('connection', socket => {
  console.log('Socket connection estbilished...')
  socketioCb(socket)
})

app.use((req, res, next) => {
  let error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json(error.message)
})
