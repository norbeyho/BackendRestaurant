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

// Actualizar una orden
router.patch('/orders/:id', cors(), async (req, res) => {
    try {
      const updatedOrder = await orderSchema.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Retorna el documento actualizado
      );
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Orden no encontrada' });
      }
      res.json(updatedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;