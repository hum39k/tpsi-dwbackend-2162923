const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const auth = require("../utils/auth");

router.get('/', auth.authenticateToken, auth.authenticateAdmin, usersController.getAllUsers);
router.get('/:id', auth.authenticateToken, auth.authenticateAdmin, usersController.getUserById);
router.delete('/:id', auth.authenticateToken, usersController.deleteUser);
router.put('/:id', auth.authenticateToken, usersController.updateUser);


module.exports = router;
