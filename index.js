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
const employeeRoutes = require('./routes/employees');
const { error } = require('console');


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

const orders = {}    
// Configuración de Socket.IO
io.on('connection', (socket) => {
    console.log('Cliente conectado: ');
  
    //Mesa desocupada
    socket.on('clear_table', (table) => {
      // Emitir el evento a todos los clientes
      io.emit('table_free', table);
      console.log(`Table ${table} libre`);
    });

    //Mesa ocupada
    socket.on('use_table', ({ table, color }) => {
      // Emitir el evento a todos los clientes
      io.emit('table_busy', {table, color});
      console.log(`Color de la mesa ${table} cambiado a ${color}`);
    });
    // Recepción de nuevas órdenes desde el cliente
    socket.on('newOrder', (orderData) => {
      console.log('Orden recibida en el back:', JSON.stringify(orderData));
      
      io.emit('newOrder', orderData);
    });

    //Cancelar una orden
    socket.on('cancel_order', (tableName) => {
      
      io.emit('cancel_order', tableName)
    })

    socket.on('update_order', ({table, order}) => {
      
      // Emitir el evento a todos los clientes conectados
      io.emit('update_order', {table, order});
  });      
      
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });  

server.listen(port, ()=>{
    console.log(`Servidor iniciado en http://localhost:${port}`);
});