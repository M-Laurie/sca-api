const qrgenService = require('../service/qrgenService');

const generateQRCode = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: 'Se necesita una id' });
        }

        const base64Data = await qrgenService.generateQRCode(id);

        const buffer = Buffer.from(base64Data, 'base64');
        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);
    } catch (error) {
        console.error('Error generando código QR en el controlador:', error);
        res.status(500).json({ message: 'Error generando código QR', error: error.message });
    }
};

module.exports = { generateQRCode };
