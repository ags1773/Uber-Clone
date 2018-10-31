const router = require('express').Router()
const userController = require('../controllers/user')

router.get('/loginUrl', userController.getLoginUrl)
router.get('/oauthCb', userController.handleAuth)
router.get('/logout', userController.logout)

module.exports = router
