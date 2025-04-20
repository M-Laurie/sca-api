const QRCode = require('qrcode');

const generateQRCode = async (id) => {
    try {
        const jsonObject = { id: id };
        const idJSON = JSON.stringify(jsonObject);

        const qrCodeDataURL = await QRCode.toDataURL(idJSON);
        const base64Data = qrCodeDataURL.replace(/^data:image\/png;base64,/, "");

        return base64Data;
    } catch (error) {
        console.error('Error generando código QR en el servicio:', error);
        throw new Error('Error generando código QR');
    }
};

module.exports = { generateQRCode };
