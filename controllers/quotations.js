const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Quotation = require('../models/Quotation')



//@desc     Get all quotation
//@route    GET /api/v1/quotations
//@access   Private
exports.getQuotations = asyncHandler(async (req, res, next) => {
    const quotations = await Quotation.find()
    res.status(200).json({
        success: true, data: quotations
    })
})

//@desc     Get a signle quotation
//@route    GET /api/v1/quotations/:id
//@access   Private
exports.getQuotation = asyncHandler(async (req, res, next) => {
    const quotation = await Quotation.findById(req.params.id)
    if (!quotation) {
        return next(
            new ErrorResponse(`Quotation not found with id of ${req.params.id}`, 404)
        )
    }
    res.status(200).json({
        success: true, data: quotation
    })
})

//@desc     Create a quotation
//@route    POST /api/v1/quotations
//@access   Private
exports.createQuotation = asyncHandler(async (req, res, next) => {
    const quotation = await Quotation.create(req.body)
    res.status(200).json({
        success: true, data: quotation
    })
})

//@desc     Update a quotation
//@route    PUT /api/v1/quotations/:id
//@access   Private
exports.updateQuotation = asyncHandler(async (req, res, next) => {

    const quotation = await Quotation.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!quotation) {
        return next(
            new ErrorResponse(`Quotation not found with id of ${req.params.id}`, 404)
        )
    }
    res.status(200).json({
        success: true, data: quotation
    })
})

//@desc     Delete a quotation
//@route    DELETE /api/v1/quotations/:id
//@access   Private
exports.deleteQuotation = asyncHandler(async (req, res, next) => {

    const quotation = await Quotation.findByIdAndDelete(req.params.id)

    if (!quotation) {
        return next(new ErrorResponse(`Quotation not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true, data: {}
    })
})