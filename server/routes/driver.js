const express = require('express')
const router = express.Router()
const driverController = require('../controllers/driver')

router.post('/', driverController.findDrivers)
// router.post('/', driverController.createDriver)
router.patch('/:id', driverController.updateDriver)
router.delete('/:id', driverController.deleteDriver)

module.exports = router
