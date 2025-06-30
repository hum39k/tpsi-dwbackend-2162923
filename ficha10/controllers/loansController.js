const Loan = require('../db_sequelize').Loan;
const User = require('../db_sequelize').User;
const Book = require('../db_sequelize').Book;


async function getAllLoansFull(req,res){
    var loans = await Loan.findAll({include: [{model : User},{model : Book}]});
    res.send(loans);
}

async function getLoanFullbyID(req,res){
    var id = req.params.id
    var loan = await Loan.findAll({where :{loan_id : id},include: [{model : User},{model : Book}]});
    if (!loan || loan.length == 0)
        res.status(404).send("ID not found!")
    else   
        res.send(loan)
}

async function createLoan(req,res){
    var {user_id,book_id,loan_date,return_date} = req.body;
    console.log(userid);
    console.log(bookid);
    console.log(loandate);
    console.log(returndate);
    const loan = await Loan.create({user_id : user_id, book_id : book_id, loan_date : loan_date, return_date : return_date});
    res.send(loan);
}

async function deleteLoan(req,res) {
    var id = req.params.id;
    const del = await Loan.destroy({where: {loan_id:id}});
    if(del == 0)
        res.status(404).send("ID not found!");
    else
        res.status(200).send('Deleted');
}

async function updateLoan(req,res) {
    var id =req.params.id;
    var details = req.body;
    const [loan] = await Loan.update(details,{where : {loan_id:id}}); // stores the first element of array(number of affected rows)
    if (loan === 0) // or loan[0] if not [loan]
        res.status(404).send("ID not found!");
    else
        res.send('Updated');
    
}

async function getAllLoans(req,res){
    var loans = await Loan.findAll();
    res.send(loans);
}

module.exports = {
    getAllLoans,
    getAllLoansFull,
    getLoanFullbyID,
    createLoan,
    deleteLoan,
    updateLoan
}