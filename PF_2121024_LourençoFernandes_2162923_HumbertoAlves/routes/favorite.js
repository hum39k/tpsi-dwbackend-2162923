const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const auth = require("../utils/auth");


router.get('/', auth.authenticateToken, favoriteController.getFavorites);
router.post('/:id', auth.authenticateToken, favoriteController.addFavorite);
router.delete('/:id', auth.authenticateToken, favoriteController.removeFavorite);


module.exports = router;

