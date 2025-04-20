const VeterinarianRequest = require('../model/veterinarioSolicitud');
const Usuario = require('../../auth/model/usuario');

const createRequest = async ({ userId, vetMatricula }) => {
    try {
        const existingRequest = await VeterinarianRequest.findOne({ where: { userId, status: 'pending' } });
        if (existingRequest) {
            throw new Error('Ya tienes una solicitud pendiente');
        }

        const request = await VeterinarianRequest.create({ userId, vetMatricula });
        return request;
    } catch (error) {
        throw new Error('Ya tienes una solicitud pendiente');
    }
};

const getRequests = async () => {
    try {
        const requests = await VeterinarianRequest.findAll();
        return requests;
    } catch (error) {
        throw new Error('Error al obtener las solicitudes de veterinario');
    }
};

const approveRequest = async (userId) => {
    try {
        const request = await VeterinarianRequest.findOne({ where: { userId, status: 'pending' } });

        if (!request || request.status !== 'pending') {
            throw new Error('Solicitud no encontrada o ya procesada');
        }

        const user = await Usuario.findByPk(request.userId);
        user.role = 'veterinario';
        user.vetMatricula = request.vetMatricula;
        await user.save();

        request.status = 'approved';
        await request.save();
    } catch (error) {
        throw new Error('Error al aprobar la solicitud');
    }
};

const rejectRequest = async (userId) => {
    try {
        const request = await VeterinarianRequest.findOne({ where: { userId, status: 'pending' } });

        if (!request || request.status !== 'pending') {
            throw new Error('Solicitud no encontrada o ya procesada');
        }

        request.status = 'rejected';
        await request.save();
    } catch (error) {
        throw new Error('Error al rechazar la solicitud');
    }
};

module.exports = { createRequest, getRequests, approveRequest, rejectRequest };
