require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const server = app.listen(port, () => console.log(`UberClone server running on port ${port}`))
const io = require('socket.io').listen(server)

const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const socketioCb = require('./socketioCb')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const {authenticateUser, authenticateDriver} = require('./middlewares/authenticate')

const userRoutes = require('./routes/user')
const driverRoutes = require('./routes/driver')
const rideRoutes = require('./routes/ride')

mongoose.connect(`${process.env.dbURI}`, { useCreateIndex: true, useNewUrlParser: true })

app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(bodyParser.json())

app.use(session({
  secret: process.env.secretKey,
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))

app.use('/public', express.static(path.join(__dirname, '..', 'public')))
app.use('/user', authenticateUser, express.static(path.join(__dirname, '..', 'dist')))
app.use('/driver', authenticateDriver, express.static(path.join(__dirname, '..', 'dist')))
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
