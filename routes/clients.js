const express = require('express')
const { getClients, getClient, createClient, updateClient, deleteClient } = require('../controllers/clients')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults')

router.route('/').get(protect, getClients).post(protect, authorize('adm'), createClient)

router.route('/:id').get(protect, getClient).put(protect, authorize('adm'), updateClient).delete(protect, authorize('adm'), deleteClient)
module.exports = router