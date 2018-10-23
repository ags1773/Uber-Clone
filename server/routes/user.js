const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/login', userController.login)
router.get('/login/redirect', userController.redirectUser)
router.get('/logout', userController.logout)

module.exports = router
