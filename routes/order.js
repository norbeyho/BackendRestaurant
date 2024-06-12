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

router.get('/find-order', async (req, res) => {
    const { tableName, progress } = req.query;
  
    // Crear un objeto de filtro dinámico
    let filter = { tableName };
    if (progress) {
      filter.progress = progress;
    }  
    try {
      const pedidos = await orderSchema.find(filter);
      if (pedidos.length === 0) {
        return res.status(404).json({ msg: 'No se encontraron pedidos para esta mesa con el estado especificado' });
      }
      res.json(pedidos);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
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

  //Recuperar mesas
router.get('/orders', cors(), (req, res)=>{
  orderSchema
      .find()
      .then((data)=> res.json(data))
      .catch((error)=> res.json({message: error}))
})

// Actualizar estado de la orden
router.put('/orders/:id', cors(), (req, res) => {
  const { id } = req.params;
  const { progress } = req.body; // Cambia newStatus a progress
  orderSchema.findByIdAndUpdate(id, { progress: progress }) // Actualiza el campo progress
      .then(() => res.json({ message: 'Estado de la orden actualizado correctamente' }))
      .catch((error) => res.json({ message: error }));
})

module.exports = router;