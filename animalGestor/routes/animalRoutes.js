const express = require('express');
const controladorAnimal = require('../controllers/animalController.js');

const router = express.Router();

// Obtener todos los animales
router.get('/animales', controladorAnimal.obtenerTodosLosAnimales);

// Crear un nuevo animal
router.post('/animales', controladorAnimal.crearAnimal);

// Actualizar un animal existente
router.put('/animales/:id', controladorAnimal.actualizarAnimal);

// Eliminar un animal existente
router.delete('/animales/:id', controladorAnimal.eliminarAnimal);

//obtener animal por id
router.get('/animales/:id', controladorAnimal.obtenerAnimalPorId);

module.exports = router;
