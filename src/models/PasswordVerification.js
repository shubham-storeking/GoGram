const mongoose = require('mongoose')

// Model used to verify password. During the verification process it is temporarily stored in the database
const PasswordVerification = mongoose.Schema({
    email: String,
    code: String,
    isVerified: Boolean
})

module.exports = mongoose.model("recovery", PasswordVerification)
