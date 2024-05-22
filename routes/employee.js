const express = require('express');
const cors = require('cors');

const employeeSchema = require('../models/employee');

const router = express.Router();

router.use(cors());

//Agregar empleado
router.post('/employees', cors(),(req, res)=>{
    const employee = employeeSchema(req.body);
    employee
        .save()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//Recuperar empleado
router.get('/employees', cors(), (req, res)=>{
    employeeSchema
        .find()
        .then((data)=> res.json(data))
        .catch((error)=> res.json({message: error}))
})

// busqueda por username
router.get('/users/:username',cors(),(req, res)=>{
    const { username } = req.params;
    userSchema
         .findById(username)
         .then((data) => res.json(data))
         .catch((error) =>res.json({message: error}))
 })

module.exports = router;