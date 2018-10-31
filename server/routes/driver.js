const express = require('express')
const router = express.Router()
const driverController = require('../controllers/driver')
const {authenticateDriver} = require('../middlewares/authenticate')

router.get('/loginUrl', driverController.getLoginUrl)
router.get('/oauthCb', driverController.handleAuth)

router.post('/', authenticateDriver, driverController.createDriver)
router.patch('/:id', authenticateDriver, driverController.updateDriver)
router.delete('/:id', authenticateDriver, driverController.deleteDriver)
router.post('/find', authenticateDriver, driverController.findDrivers)

module.exports = router
