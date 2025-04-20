const VeterinarianRequest = require('../model/veterinarioSolicitud');
const veterinarianRequestService = require('../services/veterinarioSolicitudService');

const createRequest = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { vetMatricula } = req.body;

        const request = await veterinarianRequestService.createRequest({ userId, vetMatricula });
        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({ error: 'Ya tienes una solicitud pendiente' });
    }
};

const getRequests = async (req, res) => {
    try {
        const requests = await VeterinarianRequest.findAll();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las solicitudes de veterinario' });
    }
};

const approveRequest = async (req, res) => {
    const { userId } = req.body;

    try {
        await veterinarianRequestService.approveRequest(userId);
        res.status(200).json({ message: 'Solicitud aprobada y rol actualizado' });
    } catch (error) {
        console.error('Error al aprobar la solicitud:', error);
        res.status(500).json({ error: 'Error al aprobar la solicitud' });
    }
};

const rejectRequest = async (req, res) => {
    const { userId } = req.body;

    try {
        await veterinarianRequestService.rejectRequest(userId);
        res.status(200).json({ message: 'Solicitud rechazada' });
    } catch (error) {
        console.error('Error al rechazar la solicitud:', error);
        res.status(500).json({ error: 'Error al rechazar la solicitud' });
    }
};

module.exports = { createRequest, getRequests, approveRequest, rejectRequest };
