const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Employee', employeeSchema)