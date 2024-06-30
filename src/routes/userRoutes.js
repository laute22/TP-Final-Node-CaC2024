const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/usuarios', userController.createUser);
router.get('/usuarios', userController.getUsers);
router.get('/usuarios/:id', userController.getUserById);
router.put('/usuarios/:id', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser);
router.post('/usuarios/multiples', userController.createMultipleUsers);
module.exports = router;