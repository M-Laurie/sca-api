const animalServicio = require('../services/animalService.js');

class ControladorAnimal {
  async crearAnimal(req, res) {
    try {
      const animal = await animalServicio.crearAnimal(req.body);
      res.status(201).json(animal);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }

  async obtenerTodosLosAnimales(req, res) {
    try {
      const animales = await animalServicio.obtenerTodosLosAnimales();
      res.status(200).json(animales);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }

  async obtenerAnimalPorId(req, res) {
    try {
      const animal = await animalServicio.obtenerAnimalPorId(req.params.id);
      res.status(200).json(animal);
    } catch (error) {
      res.status(404).json({ mensaje: error.message });
    }
  }

  async actualizarAnimal(req, res) {
    try {
      const animal = await animalServicio.actualizarAnimal(req.params.id, req.body);
      res.status(200).json(animal);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }

  async eliminarAnimal(req, res) {
    try {
      await animalServicio.eliminarAnimal(req.params.id);
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }
}

module.exports = new ControladorAnimal();
