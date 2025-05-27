const { validationResult } = require('express-validator');
const authService = require('../service/authService');

const handleAuthentication = async (authFn, credentials, res, successStatus, successMessage) => {
  successStatus = successStatus || 200;
  try {
    const token = await authFn(credentials);
    if (successMessage) {
      res.status(successStatus).json({ message: successMessage, token });
    } else {
      res.status(successStatus).json({ token });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, apellido, email, password, role } = req.body;

  try {
    await authService.registerUser({ nombre, apellido, email, password, role });
    await handleAuthentication(authService.authenticateUser, { email, password }, res, 201, 'Usuario creado exitosamente');
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: error.message });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;
  return handleAuthentication(authService.authenticateUser, { email, password }, res);
};

const loginVet = (req, res) => {
  const { vetMatricula, password } = req.body;
  return handleAuthentication(authService.authenticateVet, { vetMatricula, password }, res);
};

module.exports = { register, login, loginVet };
