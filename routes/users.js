const express = require('express')
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/users')
const router = express.Router({ mergeParams: true })

const User = require('../models/User')

const advancedResults = require('../middleware/advancedResults')

const { protect, authorize } = require('../middleware/auth')

router.use(protect)
router.use(authorize('adm'))

router.route('/')
    .get(advancedResults(User), getUsers)
    .post(createUser)

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router