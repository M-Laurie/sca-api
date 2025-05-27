const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/usuario');

const generateToken = (user) => {
    return jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const registerUser = async ({ nombre, apellido, email, password, role }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await Usuario.create({ nombre, apellido, email, password: hashedPassword, role });
    } catch (error) {
        throw new Error('Error al crear el usuario');
    }
};

const authenticate = async (identifierField, identifierValue, password, invalidMessage) => {
    try {
        const user = await Usuario.findOne({ where: { [identifierField]: identifierValue } });
        if (!user) throw new Error(invalidMessage);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error(invalidMessage);

        return generateToken(user);
    } catch (error) {
        throw new Error('Error al autenticar usuario');
    }
};

const authenticateUser = ({ email, password }) =>
    authenticate('email', email, password, 'Correo electrónico o contraseña inválidos');

const authenticateVet = ({ vetMatricula, password }) =>
    authenticate('vetMatricula', vetMatricula, password, 'Matrícula o contraseña inválidos');

module.exports = { registerUser, authenticateUser, authenticateVet };