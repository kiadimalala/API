const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Product = require('../models/Product')

//@desc     Get all products
//@route    GET /api/v1/products
//@access   Private
exports.getProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.find()
    res.status(200).json({
        success: true, data: products
    })
})

//@desc     Get a signle product
//@route    GET /api/v1/products/:id
//@access   Private
exports.getProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(
            new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
        )
    }
    res.status(200).json({
        success: true, data: product
    })
})

//@desc     Create a product
//@route    POST /api/v1/products
//@access   Private
exports.createProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.create(req.body)
    res.status(200).json({
        success: true, data: product
    })
})

//@desc     Update a product
//@route    PUT /api/v1/products/:id
//@access   Private
exports.updateProduct = asyncHandler(async (req, res, next) => {

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!product) {
        return next(
            new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
        )
    }
    res.status(200).json({
        success: true, data: product
    })
})

//@desc     Delete a product
//@route    DELETE /api/v1/products/:id
//@access   Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {

    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
        return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true, data: {}
    })
})