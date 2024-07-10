const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
//usuarios
router.post('/usuarios', userController.createUser);
router.get('/usuarios', userController.getUsers);
router.get('/usuarios/:id', userController.getUserById);
router.put('/usuarios/:id', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser);
router.post('/usuarios/multiples', userController.createMultipleUsers);
//Peliculas
router.get('/peliculas', userController.getAllPeliculas);
router.get('/peliculas/:id', userController.getPeliculaById);
router.post('/peliculas', userController.createPelicula);
router.put('/peliculas/:id', userController.updatePelicula);
router.delete('/peliculas/:id', userController.deletePelicula);
//Comentarios
router.post('/comentarios', userController.createComentario);
router.get('/comentarios', userController.getComentarios);
router.get('/comentarios/:id', userController.getComentarioById);
router.put('/comentarios/:id', userController.updateComentario);
router.delete('/comentarios/:id', userController.deleteComentario);
//Directores:
router.post('/directores', userController.createDirector);
router.get('/directores', userController.getDirectores);
router.get('/directores/:id', userController.getDirectorById);
router.put('/directores/:id', userController.updateDirector);
router.delete('/directores/:id', userController.deleteDirector);

module.exports = router;