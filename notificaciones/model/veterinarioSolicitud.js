const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/config');

const VeterinarianRequest = sequelize.define('VeterinarianRequest', {
    userId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    },
    vetMatricula: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = VeterinarianRequest;
