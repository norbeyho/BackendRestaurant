const express = require('express');
const http = require('http');
const socketIo = require('socket.io')
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const tableRoutes = require('./routes/table');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const employeeRoutes = require('./routes/employee');
const { error } = require('console');
const order = require('./models/order');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());
//Rutas
app.use('/api', tableRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', orderRoutes);
app.use('/api', employeeRoutes);


app.get('/',(req, res)=>{
    res.send("API funcionando")
});

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("Conectado a la base de datos Mongo"))
    .catch(()=> console.error("Error de conexion a la base de datos",error))

// Configuración de Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected');
  
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

app.listen(port, ()=>{
    console.log(`Servidor iniciado en http://localhost:${port}`);
});