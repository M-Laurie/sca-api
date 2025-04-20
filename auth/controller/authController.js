const { validationResult } = require('express-validator');
const authService = require('../service/authService');

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, apellido, email, password, role } = req.body;

  try {
    const user = await authService.registerUser({ nombre, apellido, email, password, role });

    const token = await authService.authenticateUser({ email, password });

    res.status(201).json({ message: 'Usuario creado exitosamente', token });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.authenticateUser({ email, password });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: error.message });
  }
};

const loginVet = async (req, res) => {
  const { vetMatricula, password } = req.body;

  try {
    const token = await authService.authenticateVet({ vetMatricula, password });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, loginVet };
