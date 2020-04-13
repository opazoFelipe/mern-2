const express = require('express');
const router = express.Router();
const cUsers = require('./../controllers/user.controller');

router.get('/', cUsers.getAllUsers);
router.get('/:id', cUsers.getOneUser);

// Logica
router.post('/', cUsers.createUser);
router.put('/:id', cUsers.updateUser);
router.delete('/:id', cUsers.deleteUser);
 
module.exports = router;