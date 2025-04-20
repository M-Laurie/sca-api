const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/usuario');

const registerUser = async ({ nombre, apellido, email, password, role }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Usuario.create({ nombre, apellido, email, password: hashedPassword, role });
        return user;
    } catch (error) {
        throw new Error('Error al crear el usuario');
    }
};

const authenticateUser = async ({ email, password }) => {
    try {
        const user = await Usuario.findOne({ where: { email } });

        if (!user) {
            throw new Error('Correo electrónico o contraseña inválidos');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Correo electrónico o contraseña inválidos');
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return token;
    } catch (error) {
        throw new Error('Error al autenticar usuario');
    }
};

const authenticateVet = async ({ vetMatricula, password }) => {
    try {
        const user = await Usuario.findOne({ where: { vetMatricula } });

        if (!user) {
            throw new Error('Matricula o contraseña inválidos');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Matricula o contraseña inválidos');
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return token;
    } catch (error) {
        throw new Error('Error al autenticar usuario');
    }
};




module.exports = { registerUser, authenticateUser, authenticateVet };
