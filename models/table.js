const mongoose = require('mongoose');

const tableSchema = mongoose.Schema({
    tableId: {
        type: String,
        required: true
    },
    tableName: {
        type: String,
        required: true
    },    
    estate:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Table',tableSchema);