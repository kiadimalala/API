const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    lastname: {
        type: String,
        required: [true, 'Please add a lastname']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please add a valid email'
        ],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        maxlength: 10
    },
    role: {
        type: String,
        enum: ['adm', 'ccl'],
        default: 'ccl'
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})


//encrypt password
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// Sign JWT and return

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

//Match user password to hashed

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};

//generate and hash password token
UserSchema.methods.getResetPasswordtoken = function () {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex')
    // hash token and set to resetPassword field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    //set expire
    this.resetPasswordToken = Date.now() + 10 * 60 * 1000
    return resetToken
}

module.exports = mongoose.model('User', UserSchema)