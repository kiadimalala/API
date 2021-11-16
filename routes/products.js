const express = require('express')
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/products')
const router = express.Router()

const { protect, authorize } = require('../middleware/auth')
const advancedResults = require('../middleware/advancedResults')

router.route('/').get(protect, getProducts).post(protect, authorize('adm'), createProduct)

router.route('/:id').get(protect, getProduct).put(protect, authorize('adm'), updateProduct).delete(protect, authorize('adm'), deleteProduct)
module.exports = router