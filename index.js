const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const tableRoutes = require('./routes/table')

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api', tableRoutes);
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