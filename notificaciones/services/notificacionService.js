const Notificacion = require('../model/notificacion');

const createNotification = async ({ ubicacion, descripcion, userId, animalId }) => {
    try {
        const notification = await Notificacion.create({ ubicacion, descripcion, userId, animalId: animalId || null });
        return notification;
    } catch (error) {
        throw new Error('Error al crear la notificación');
    }
};

module.exports = { createNotification };
