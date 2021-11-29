const express = require('express')
const router = express.Router()
const { getQuotations, getQuotation, createQuotation, updateQuotation, deleteQuotation } = require('../controllers/quotations')


const { protect, authorize } = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults')

router.route('/').get(protect, getQuotations).post(protect, authorize('adm'), createQuotation)

router.route('/:id').get(protect, getQuotation).put(protect, authorize('adm'), updateQuotation).delete(protect, authorize('adm'), deleteQuotation)

module.exports = router