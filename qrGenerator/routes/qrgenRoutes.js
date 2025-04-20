const express = require('express');
const router = express.Router();
const qrgenController = require('../controller/qrgenController');
const { authorizeRole } = require('../../auth/middleware/authMiddleware');


router.get('/generate', authorizeRole(['veterinario']), qrgenController.generateQRCode);

module.exports = router;
