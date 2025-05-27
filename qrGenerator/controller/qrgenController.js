const qrgenService = require('../service/qrgenService');

const validateQueryId = (id) => {
    if (!id) {
        const error = new Error('Se necesita una id');
        error.statusCode = 400;
        throw error;
    }
};

const generateQRCode = async (req, res) => {
    try {
        const { id } = req.query;
        validateQueryId(id);

        const buffer = await qrgenService.getQRCodeBuffer(id);

        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);
    } catch (error) {
        const status = error.statusCode || 500;
        console.error('Error generando código QR en el controlador:', error);
        res.status(status).json({ message: error.message });
    }
};

module.exports = { generateQRCode };


