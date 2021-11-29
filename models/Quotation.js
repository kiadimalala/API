const mongoose = require('mongoose')
const product = require('./Product')
const getYear = require('date-fns/getYear')

const QuotationSchema = new mongoose.Schema({
    ref: {
        type: String,
        unique: true
    },
    clientId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['location alarme', 'vente alarme', 'location video', 'vente video', 'abonnement telesurveillance', 'fourniture'],
        default: 'location alarme',
        required: true
    },
    site: {
        type: String,
        required: true
    },
    content: {
        type: Array,
        required: true
    },
    pht: {
        type: Number,
        required: true
    },
    pttc: {
        type: Number,
        required: true
    },
    editorId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

QuotationSchema.pre('save', function (next) {
    const dCode = 'MJN'
    const dDate = getYear(Date.now())
    let type
    if (this.type === 'location alarme' || this.type === 'location video') {
        type = 'LOC'
    } else if (this.type === 'vente alarme' || this.type === 'vente video' || this.type === 'fourniture') {
        type = "VTE"
    } else if (this.type === 'abonnement telesurveillance') {
        type = "ABTS"
    }
    const year = dDate.toString().split(`${d[0] + d[1]}`).join('')
    const str = this.code.padStart(4, "0")
    const fCode = dCode + type + year + str
    this.code = fCode
    next()
})


module.exports = mongoose.model('Quotations', QuotationSchema)