const express = require('express')
const router = express.Router()
const rideController = require('../controllers/ride')

router.post('/', rideController.createRide)

module.exports = router
