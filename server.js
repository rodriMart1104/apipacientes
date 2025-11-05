const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//SERVIDOR HTTPS
const app = express();

//CONFIG A SERVIDOR HTTPS
app.use(bodyParser.json());
app.use(cors());

//CONEXION A BASE DE DATOS
mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log("Conexion a MongoDB exitosa"))
    .catch(err => console.error("Error al conectar a MongoDB: ", err));

//RUTAS DE LA API
//Rutas para pacientes
const pacienteRoutes = require('./routes/paciente');
app.use('/api/pacientes', pacienteRoutes);

//Rutas para autentificacion
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//CONFIGURAR PUERTO PARA BACKEND
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor ejecutandose en el puerto ${port}`);

});

