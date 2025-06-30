var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController');
const { route } = require('.');


router.get('/',usersController.getAllUsers);
router.get('/:id',usersController.getUserById);
router.delete('/:id',usersController.deleteUser);
router.post('/',usersController.createUser);
router.put('/:id',usersController.updateUser);

module.exports = router;
