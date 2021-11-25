const mongoose = require('mongoose')


const ClientSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Please add name'],
        trim: true
    },
    contact: {
        type: String,
        required: [true, 'Please add contact number']
    },
    nif: {
        type: String
    },
    stat: {
        type: String
    },
    rcs: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//create default client code
ClientSchema.pre('save', function (next) {
    const code = "CP"
    const prefix = this.name.charAt(0)
    const def = code + prefix
    const str = this.code.padStart(3, "0")
    this.code = def + str
    next()
})

module.exports = mongoose.model('Clients', ClientSchema)