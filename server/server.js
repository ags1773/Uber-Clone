require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const riderRoutes = require('./routes/rider')
const driverRoutes = require('./routes/driver')

app.listen(port)

mongoose.connect(`mongodb+srv://uber:${process.env.mongoPwd}@cluster0-reuoy.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })

app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/api/rider', riderRoutes)
app.use('/api/driver', driverRoutes)

app.use((req, res, next) => {
  let error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json(error.message)
})
