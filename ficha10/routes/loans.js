var express = require('express');
var router = express.Router();
const loansController = require('../controllers/loansController');

router.get('/', loansController.getAllLoansFull);
router.get('/:id', loansController.getLoanFullbyID);
router.post('/', loansController.createLoan);
router.delete('/:id', loansController.deleteLoan);
router.put('/:id', loansController.updateLoan);

module.exports = router;
