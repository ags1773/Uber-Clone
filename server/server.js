require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const server = app.listen(port, () => console.log(`UberClone server running on port ${port}`))
const io = require('socket.io').listen(server)

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const socketioCb = require('./socketioCb')

const userRoutes = require('./routes/user')
const driverRoutes = require('./routes/driver')
const rideRoutes = require('./routes/ride')

mongoose.connect(`mongodb+srv://uber:${process.env.mongoPwd}@cluster0-reuoy.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })

if (process.env.MODE === 'development') {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}
app.use(bodyParser.json())

app.use('/api/rider', userRoutes)
app.use('/api/driver', driverRoutes)
app.use('/api/ride', rideRoutes)
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
