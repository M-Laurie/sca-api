const animalService = require('../services/animalService.js');

const manejarErrores = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

class ControladorAnimal {

  crearAnimal = manejarErrores(async (req, res) => {
    const animal = await animalService.crearAnimal(req.body);
    res.status(201).json(animal);
  });

  obtenerTodosLosAnimales = manejarErrores(async (req, res) => {
    const animales = await animalService.obtenerTodosLosAnimales();
    res.status(200).json(animales);
  });

  obtenerAnimalPorId = manejarErrores(async (req, res) => {
    const animal = await animalService.obtenerAnimalPorId(req.params.id);
    res.status(200).json(animal);
  });

  actualizarAnimal = manejarErrores(async (req, res) => {
    const animal = await animalService.actualizarAnimal(req.params.id, req.body);
    res.status(200).json(animal);
  });

  eliminarAnimal = manejarErrores(async (req, res) => {
    await animalService.eliminarAnimal(req.params.id);
    res.status(204).json();

  });
}

module.exports = new ControladorAnimal();