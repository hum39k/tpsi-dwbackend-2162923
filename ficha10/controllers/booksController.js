const Book = require('../db_sequelize.js').Book;

async function getAllBooks(req,res){
    var books = await Book.findAll();
    res.send(books);
}

async function getBookById(req,res) {
    var id = req.params.id;
    var book = await Book.findAll({where: {book_id:id}});
    if (book.length == 0)
        res.status(404).send("ID not found")
    else
        res.send(book);
    
}

async function createBook(req,res){
    var {title, author, publication_date,genre,available_copies} = req.body;
    const book = await Book.create({title: title, author: author, publication_date: publication_date, genre: genre, available_copies : available_copies});
    res.send(book);
}

async function deleteBook(req,res) {
    var id = req.params.id;
    const del = await Book.destroy({where: {book_id:id}});
    if (del === 0)
        res.status(404).send("ID not found");
    else
        res.status(200).send('Deleted');
}

async function updateBook(req,res) {
    var id = req.params.id
    var details = req.body;
    const book = await Book.update(details,{where : {book_id:id}});
    if (book[0] === 0)
        res.status(404).send("ID not found");
    else
        res.send('Updated');
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    deleteBook,
    updateBook
};