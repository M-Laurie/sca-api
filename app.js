require('dotenv').config();
const sequelize = require('./Config/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const qrgenRoutes = require('./qrGenerator/routes/qrgenRoutes');
const notificationRoutes = require('./notificaciones/routes/notificacionesRoutes');
const authRoutes = require('./auth/routes/authRoutes');
const animalRoutes = require('./animalGestor/routes/animalRoutes');
const { authenticateToken } = require('./auth/middleware/authMiddleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Rutas públicas (sin autenticación requerida)
app.use('/api/auth', authRoutes);

// Middleware para autenticación JWT
app.use('/api', authenticateToken);

// Rutas protegidas (requieren autenticación)
app.use('/api', notificationRoutes);
app.use('/api', qrgenRoutes);
app.use('/api', animalRoutes);


sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });
