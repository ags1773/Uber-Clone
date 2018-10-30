const router = require('express').Router()
const userController = require('../controllers/user')

router.get('/loginUrl', userController.getLoginUrl)
router.get('/oauthCb', userController.handleAuth)

router.get('/redirect', userController.redirectUser)

module.exports = router
