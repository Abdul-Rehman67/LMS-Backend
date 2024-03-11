const express = require('express');
const { addBookController, getAllBookController, CheckOutController, CheckInController, getSingleBookController } = require('../controller/books');
const { userChecker } = require('../middlewares/tokenVerofication');
const { validateCheckoutPayload } = require('../util/payload-validator');
const router = express.Router()


router.post('/add-book', userChecker, addBookController)
router.get('/get-book', userChecker, getAllBookController)
router.post('/check-out/:id', userChecker, CheckOutController)
router.get('/check-in/:id', userChecker, CheckInController)
router.get('/get-single-book/:id', userChecker, getSingleBookController)

module.exports = router

