const express = require('express')
const { login, register, getMe,
    forgotPassword, resetPassword, updateDetails, updatePassword, logout } = require('../controllers/auth')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')

router.route('/register').post(protect, authorize('adm'), register)
router.route('/login').post(login)
router.route('/logout').get(protect, logout)
router.route('/me').get(protect, getMe)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:resettoken').put(resetPassword)
router.route('/updatedetails').put(protect, updateDetails)
router.route('/updatepassword').put(protect, updatePassword)
module.exports = router