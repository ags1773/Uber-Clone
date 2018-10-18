const express = require('express')
const router = express.Router()
const riderController = require('../controllers/rider')

router.post('/', riderController.createRider)

module.exports = router
