const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    categoryId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema);