const express = require('express');
const { check } = require('express-validator');
const { authorizeRole } = require('../../auth/middleware/authMiddleware');

const notificacionesController = require('../controllers/notificacionesController');
const veterinarianRequestController = require('../controllers/veterinarioSolicitudController');

const router = express.Router();

// Rutas para Notificaciones
router.post('/notifications', notificacionesController.createNotification);
router.get('/get-notifications', notificacionesController.getNotifications);

// Rutas para Solicitudes de Veterinario
router.get('/get-vet-requests', veterinarianRequestController.getRequests);
router.post('/vet-requests', [
    check('vetMatricula', 'El número de matrícula debe ser más largo').isLength({ min: 10 })
], veterinarianRequestController.createRequest);
router.post('/vet-requests/approve', veterinarianRequestController.approveRequest);
router.post('/vet-requests/reject', authorizeRole(['veterinario']), veterinarianRequestController.rejectRequest);

module.exports = router;
