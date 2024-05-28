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

// Recuperar orden por id
 router.get('/orders/:id', cors(), (req, res)=>{
    const { id } = req.params;
    orderSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}))
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