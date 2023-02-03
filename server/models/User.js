const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, reqired: true, unique: true
    },
    password: {
        type: String, required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("user", UserSchema)

module.exports = User