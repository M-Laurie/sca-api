const Notificacion = require('../model/notificacion');
const notificacionService = require('../services/notificacionService');

const createNotification = async (req, res) => {
  try {
    const { ubicacion, descripcion, animalId } = req.body;
    const userId = req.user.userId;

    const notification = await notificacionService.createNotification({ ubicacion, descripcion, userId, animalId });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la notificación' });
  }
};

const getNotifications = async (req, res) => {
  try {
    const notificaciones = await Notificacion.findAll();
    res.status(200).json(notificaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las notificaciones' });
  }
};

module.exports = { createNotification, getNotifications };
