var express = require('express');
var router = express.Router();
var loansController = require('../controllers/loansController');

/* GET home page. */
router.get('/', loansController.getAllLoansFull);

module.exports = router;
