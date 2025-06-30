var Loan = require('../db_sequelize').Loan;
var User = require('../db_sequelize').User;
var Book = require('../db_sequelize').Book;

async function getAllLoansFull(req, res, next){    
    var loans = await Loan.findAll({include: [{model: User}, {model: Book}]});
    res.send(loans);
}

async function getAllLoans(req, res, next){    
    var loans = await Loan.findAll();
    res.send(loans);
}

module.exports = {
    getAllLoans,
    getAllLoansFull
};