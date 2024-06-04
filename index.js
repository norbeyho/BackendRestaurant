const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const tableRoutes = require('./routes/table');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const employeesRoutes = require('./routes/employees');
const { error } = require('console');

 const app = express();
 const httpServer = createServer(app);
 const io = new Server(httpServer);


const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());
//Rutas
app.use('/api', tableRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', orderRoutes);
app.use('/api', employeesRoutes);


app.get('/',(req, res)=>{
    res.send("API funcionando")
});

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("Conectado a la base de datos Mongo"))
    .catch(()=> console.error("Error de conexion a la base de datos",error))

// Configuración de Socket.IO
io.on('connection', (socket) => {
    console.log('Cliente conectado: ');
  
    // Recepción de nuevas órdenes desde el cliente
    socket.on('newOrder', (order) => {
      console.log('Order received:', order);
      
      io.emit('orderStatusUpdate', { orderId: order.id, status: 'En proceso' });
    });
  
    // Recepción de notificación de estado desde la cocina
    socket.on('orderStatusUpdate', (statusUpdate) => {
      console.log('Status update received:', statusUpdate);
      // Emitir la actualización de estado a todos los clientes
      io.emit('orderStatusUpdate', statusUpdate);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });  

server.listen(port, ()=>{
    console.log(`Servidor iniciado en http://localhost:${port}`);
});