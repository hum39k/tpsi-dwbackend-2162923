const express = require('express');
const router = express.Router();
const searchHistoryController = require('../controllers/searchHistoryController');
const auth = require("../utils/auth");



router.get('/', auth.authenticateToken, searchHistoryController.getHistory);
router.delete('/', auth.authenticateToken, searchHistoryController.clearHistory);
router.post('/', auth.authenticateToken, searchHistoryController.addHistory);

module.exports = router;
