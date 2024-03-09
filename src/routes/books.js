const express = require('express');
const { addBookController, getAllBookController, CheckOutController, CheckInController } = require('../controller/books');
const { userChecker } = require('../middlewares/tokenVerofication');
const { validateCheckoutPayload } = require('../util/schema-validator');
const router = express.Router()


router.post('/add-book', userChecker, addBookController)
router.get('/get-book', userChecker, getAllBookController)
router.post('/check-out/:id', userChecker, validateCheckoutPayload, CheckOutController)
router.get('/check-in/:id', userChecker, CheckInController)

module.exports = router

