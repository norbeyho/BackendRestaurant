const express = require('express');
const cors = require('cors')
// importar el esquema de models
const employeesSchema = require('../models/employees');

const router = express.Router();
// Middleware
router.use(cors());
// Rutas
// Agregar empleado
router.post('/employees',cors(),(req, res)=>{
    const employees = employeesSchema(req.body);
    employees
        .save()
        .then((data) => res.json(data))
        .catch((error) =>res.json({message: error}))
})
// Recuperar todos los users
router.get('/employees',cors(),(req, res)=>{
   employeesSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) =>res.json({message: error}))
})

// Recuperar user por id
router.get('/employees/:id',cors(),(req, res)=>{
    const { id } = req.params;
    employeesSchema
         .findById(id)
         .then((data) => res.json(data))
         .catch((error) =>res.json({message: error}))
 })

 //Buscar por email
router.get('/employees/byemail/:email',cors(),async(req, res)=>{
  const { email } = req.params;
  await employeesSchema
        .findOne({email:email})
        .then(data => res.json(data))
        .catch(error => res.json(error))  
  });
  
//Buscar por userneme
router.post("/employees/byusername", cors(), async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await employeesSchema.findOne({ username, password });
    if (user) {
      res.json({
        username: user.username,
        role: user.role,
      });
    } else {
      res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    console.error("Error al autenticar:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

 // Actualizar user por id
router.put('/employees/:id',cors(),(req, res)=>{
    const { id } = req.params;
    const {username,fullname, email,password, role} = req.body;
    employeesSchema
         .updateOne({_id:id},{$set: {username,fullname, email,password, role}})
         .then((data) => res.json(data))
         .catch((error) =>res.json({message: error}))
 })

  // Eliminar user por id
router.delete('/employees/:id',cors(),(req, res)=>{
    const { id } = req.params;
    employeesSchema
         .deleteOne({_id:id})
         .then((data) => res.json(data))
         .catch((error) =>res.json({message: error}))
 })


module.exports = router;