const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    icon: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Table',tableSchema);