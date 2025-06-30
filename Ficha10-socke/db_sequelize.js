const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root:password@localhost:3306/ficha10');

const User = require("./models/User")(sequelize);
const Book = require("./models/Book")(sequelize);
const Loan = require("./models/Loan")(sequelize);

User.hasMany(Loan, {foreignKey: 'user_id'});
Loan.belongsTo(User, {foreignKey: 'user_id'});

Book.hasMany(Loan, {foreignKey: 'book_id'});
Loan.belongsTo(Book, {foreignKey: 'book_id'});


(async () => {
    await sequelize.sync({ force: true });   

    const user = await User.create({
        first_name: 'Pedro',
        last_name: '240',
        email: 'test@gmail.com',
        password: 'test',
        address: 'Funchal',
        phone_number: '912945654'
    });

     const user1 = await User.create({
        first_name: 'David',
        last_name: '240',
        email: 'dada@gmail.com',
        password: 'test',
        address: 'Funchal',
        phone_number: '912945654'
    });

    const book = await Book.create({
        title: 'Alfaces',
        author_name: 'Pedro Chagas',
        publication_date: '2024-12-12',
        genre: 'Action',
        available_copies: 100
    });

    const loan = await Loan.create({
        user_id: user.user_id,
        book_id: book.book_id,
        loan_date: '2025-2-12',
        return_date: '2025-2-16',        
    });
})();

module.exports = {
    Loan,
    Book,
    User
}