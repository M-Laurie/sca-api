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

const handleRequestAction = async (req, res, action, successMessage, errorMessage) => {
    const { userId } = req.body;
    try {
        await veterinarianRequestService[action](userId);
        res.status(200).json({ message: successMessage });
    } catch (error) {
        console.error(`${errorMessage}:`, error);
        res.status(500).json({ error: errorMessage });
    }
};

const approveRequest = (req, res) =>
    handleRequestAction(req, res, 'approveRequest', 'Solicitud aprobada y rol actualizado', 'Error al aprobar la solicitud');

const rejectRequest = (req, res) =>
    handleRequestAction(req, res, 'rejectRequest', 'Solicitud rechazada', 'Error al rechazar la solicitud');


module.exports = { createRequest, getRequests, approveRequest, rejectRequest };
