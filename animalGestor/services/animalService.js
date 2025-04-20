const Animal = require('../model/animalModel.js');

class ServicioAnimal {
  async crearAnimal(datos) {
    try {
      const nuevoAnimal = await Animal.create(datos);
      return nuevoAnimal;
    } catch (error) {
      throw error;
    }
  }

  async obtenerTodosLosAnimales() {
    try {
      const animales = await Animal.findAll();
      return animales;
    } catch (error) {
      throw error;
    }
  }

  async obtenerAnimalPorId(id) {
    try {
      const animal = await Animal.findByPk(id);
      if (!animal) {
        throw new Error('Animal no encontrado');
      }
      return animal;
    } catch (error) {
      throw error;
    }
  }

  async actualizarAnimal(id, datos) {
    try {
      const animal = await Animal.findByPk(id);
      if (!animal) {
        throw new Error('Animal no encontrado');
      }
      await animal.update(datos);
      return animal;
    } catch (error) {
      throw error;
    }
  }

  async eliminarAnimal(id) {
    try {
      const animal = await Animal.findByPk(id);
      if (!animal) {
        throw new Error('Animal no encontrado');
      }
      await animal.destroy();
      return animal;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ServicioAnimal();