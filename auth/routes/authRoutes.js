const express = require('express');
const { body } = require('express-validator');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/register', [
  body('nombre').notEmpty().withMessage('El campo "nombre" es obligatorio.'),
  body('apellido').notEmpty().withMessage('El campo "apellido" es obligatorio.'),
  body('email').isEmail().withMessage('Debe proporcionar un correo electrónico válido.'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
], authController.register);

router.post('/login', [
  body('email').isEmail().withMessage('Debe proporcionar un correo electrónico válido.'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria.')
], authController.login);

router.post('/loginVet', [
  body('Matricula').notEmpty().withMessage('Debe proporcionar un número de matricula válido.'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria.')
], authController.loginVet);

module.exports = router;
