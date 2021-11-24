const mongoose = require('mongoose')
const slugify = require('slugify')
const ProductSchema = new mongoose.Schema({
    lRef: { type: String, required: true },
    vRef: { type: String, required: true },
    type: { type: String, enum: ['alarme', 'video'], default: 'alarme' },
    name: {
        type: String,
        required: [true, 'Please add name'],
        unique: true,
        trim: true
    },
    slug: String,
    rp: { type: Number, required: true },
    sp: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//Create product slug from the name
ProductSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {
        lower: true
    })
    next()
})

module.exports = mongoose.model('Products', ProductSchema)