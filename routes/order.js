const express = require('express');
const cors = require('cors');

const orderSchema = require('../models/order');

const router = express.Router();

router.use(cors());

//Agregar orden
router.post('/orders', cors(),(req, res)=>{
    const order = orderSchema(req.body);
    order
        .save()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//Recuperar ordenes
router.get('/orders', cors(), (req, res)=>{
    orderSchema
        .find()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message: error}))
});

// Recuperar orden por mesa y estado
router.get('/orders', async (req, res) => {
    const { tableName, progress } = req.query;

    try {
        const order = await orderSchema.findOne({ tableName, progress });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Actualizar una orden
router.put('/orders/:id', cors(), (req, res) => {
    const { id } = req.params;
    const { username, date, items, totalValue, progress } = req.body;
    orderSchema
        .updateOne({_id:id},{$set: {username, date, items, totalValue, progress }})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
  });

module.exports = router;