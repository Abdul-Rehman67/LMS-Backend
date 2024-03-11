//this file provides routes for all auth method whete login and create user controller called. 
const express = require('express')
const { loginController } = require('../controller/auth')

const router = express.Router()
router.post('/login', loginController)

module.exports = router