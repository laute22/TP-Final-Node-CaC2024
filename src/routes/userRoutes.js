const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/usuarios', userController.createUser);
router.get('/usuarios', userController.getUsers);
router.get('/usuarios/:id', userController.getUserById);
router.put('/usuarios/:id', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser);
router.post('/usuarios/multiples', userController.createMultipleUsers);

// Obtener todas las películas
router.get('/peliculas', userController.getAllPeliculas);
// Obtener una película por ID
router.get('/peliculas/:id', userController.getPeliculaById);
// Crear una nueva película
router.post('/peliculas', userController.createPelicula);
// Actualizar una película por ID
router.put('/peliculas/:id', userController.updatePelicula);
// Eliminar una película por ID
router.delete('/peliculas/:id', userController.deletePelicula);

module.exports = router;