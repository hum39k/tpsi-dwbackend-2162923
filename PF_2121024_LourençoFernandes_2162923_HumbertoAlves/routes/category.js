const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require("../utils/auth");


router.delete('/:id', auth.authenticateToken, auth.authenticateAdmin, categoryController.removeCategory);
router.post('/', auth.authenticateToken, auth.authenticateAdmin, categoryController.addCategory);

module.exports = router;
