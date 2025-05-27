const Animal = require('../model/animalModel.js');

class ServicioAnimal {
  async crearAnimal(datos) {
    return await Animal.create(datos);
  }

  async obtenerTodosLosAnimales() {
    return await Animal.findAll();
  }

  async obtenerAnimalPorId(id) {
    const animal = await Animal.findByPk(id);
    if (!animal) {
      throw new Error('Animal no encontrado');
    }
    return animal;
  }

  async actualizarAnimal(id, datos) {
    const animal = await Animal.findByPk(id);
    if (!animal) {
      throw new Error('Animal no encontrado');
    }
    await animal.update(datos);
    return animal;
  }

  async eliminarAnimal(id) {
    const animal = await Animal.findByPk(id);
    if (!animal) {
      throw new Error('Animal no encontrado');
    }
    await animal.destroy();
    return animal;
  }
}

module.exports = new ServicioAnimal();
