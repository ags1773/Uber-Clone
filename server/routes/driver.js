const express = require('express')
const router = express.Router()
const driverController = require('../controllers/driver')

router.post('/', driverController.createDriver)
router.patch('/:id', driverController.updateDriver)
router.delete('/:id', driverController.deleteDriver)
router.post('/find', driverController.findDrivers)

module.exports = router
