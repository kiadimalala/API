const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Client = require('../models/Client')


//@desc     Get all Clients
//@route    GET /api/v1/Clients
//@access   Private
exports.getClients = asyncHandler(async (req, res, next) => {
    const clients = await Client.find()
    res.status(200).json({
        success: true, data: clients
    })
})

//@desc     Get a signle Client
//@route    GET /api/v1/clients/:id
//@access   Private
exports.getClient = asyncHandler(async (req, res, next) => {
    const client = await Client.findById(req.params.id)
    if (!client) {
        return next(
            new ErrorResponse(`Client not found with id of ${req.params.id}`, 404)
        )
    }
    res.status(200).json({
        success: true, data: client
    })
})


//@desc     Create a Client
//@route    POST /api/v1/clients
//@access   Private
exports.createClient = asyncHandler(async (req, res, next) => {
    const client = await Client.create(req.body)
    res.status(200).json({
        success: true, data: client
    })
})

//@desc     Update a Client
//@route    PUT /api/v1/clients/:id
//@access   Private
exports.updateClient = asyncHandler(async (req, res, next) => {

    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!client) {
        return next(
            new ErrorResponse(`Client not found with id of ${req.params.id}`, 404)
        )
    }
    res.status(200).json({
        success: true, data: client
    })
})

//@desc     Delete a Client
//@route    DELETE /api/v1/clients/:id
//@access   Private
exports.deleteClient = asyncHandler(async (req, res, next) => {

    const client = await Client.findByIdAndDelete(req.params.id)

    if (!client) {
        return next(new ErrorResponse(`Client not found with id of ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true, data: {}
    })
})