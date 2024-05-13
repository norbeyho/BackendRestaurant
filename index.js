const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const tableRoutes = require('./routes/table');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const employeeRoutes = require('./routes/employee');

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
//Rutas
app.use('/api', tableRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', orderRoutes);
app.use('/api', employeeRoutes);
app.use(cors());

app.get('/',(req, res)=>{
    res.send("API funcionando")
});

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("Conectado a la base de datos Mongo"))
    .catch(()=> console.error("Error de conexion a la base de datos"))

app.listen(port, ()=>{
    console.log(`Servidor iniciado en http://localhost:${port}`);
});