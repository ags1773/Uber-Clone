const router = require('express').Router()
const userController = require('../controllers/user')

router.get('/loginUrl', userController.getLoginUrl)
router.get('/oauthCb', userController.handleAuth)
router.get('/logout', userController.logout)
router.get('/userDetails', userController.getUserDetails)
router.post('/findDrivers', userController.findDrivers)

module.exports = router
