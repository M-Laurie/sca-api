const { DataTypes } = require('sequelize');
const sequelize = require('../../Config/config.js');

const Animal = sequelize.define('Animal', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  especie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  raza: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tamano: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  domesticado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  imagenURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desparasitado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  listaVacunas: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [
      { vacuna: 'Antirrabica', estado: false },
      { vacuna: 'Sextuple', estado: false },
      { vacuna: 'Triple', estado: false },
      { vacuna: 'Parvovirus', estado: false }
    ]
  },
});

module.exports = Animal;
