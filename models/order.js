const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    comment: {
        type: String,
        required: false
    },
    price: { 
        type: Number, 
        required: true 
    }
  });

  const orderSchema = new mongoose.Schema({
    tableName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now, 
        required: true 
    },
    items: [orderItemSchema],
    totalValue: { 
        type: Number, 
        required: true 
    },
    progress: {
        type: String,
        default: "Pendiente",
        required: true
    }
  });

  

module.exports = mongoose.model('Order',orderSchema);