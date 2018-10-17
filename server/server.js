require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

const morgan = require('morgan')
const bodyParser = require('body-parser')

app.listen(port)

app.use(morgan('dev'))
app.use(bodyParser.json())
