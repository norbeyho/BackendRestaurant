const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
        categoryId: {
            type: String,
            required: true
        },
        categoryName: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        }
})

module.exports = mongoose.model('Category', categorySchema);