const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const auth = require("../utils/auth");



router.post('/login', apiController.login);
router.post('/signup', apiController.signup);


module.exports = router;