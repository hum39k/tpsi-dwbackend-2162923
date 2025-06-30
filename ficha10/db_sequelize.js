const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = new Sequelize('mysql://adminsql:Password1@ficha10teste.mysql.database.azure.com/ficha10',{
    dialectOptions: {
    ssl:{
        require : true
    }
    }
});

// const sequelize = new Sequelize('ficha10', 'adminsql', 'Password1', {
//   dialect: 'mysql',
//   dialectOptions: {
//     ssl:{
//         require : true
//     }
//   },
// });



// 'mysql://usernam:password@endereçobd/schema
// 'mysql://adminmysql:Password1@humbertoalves.../projeto' -- ligar ao azure

const User = require('./models/Users.js')(sequelize, Sequelize, DataTypes);
const Book = require('./models/Books.js')(sequelize, Sequelize, DataTypes);
const Loan = require('./models/Loans.js')(sequelize, Sequelize, DataTypes);

User.hasMany(Loan, {foreignKey: 'user_id'});
Loan.belongsTo(User, {foreignKey: 'user_id'});

Book.hasMany(Loan,{foreignKey: 'user_id'});
Loan.belongsTo(Book, {foreignKey: 'user_id'});

(async () => {
    await sequelize.sync({force : true});

    const user = await User.create({
        first_name: 'Pedro',
        last_name : '240',
        email: 'test@gmail.com',
        adress: 'Funchal',
        phone_number: '912345678'
    });

    const book = await Book.create ({
        title: 'Poop',
        author : 'Poop Face',
        publication_date: new Date('2025-1-15'),
        genre: 'Action',
        available_copies: 500
    });

    const loan = await Loan.create ({
        user_id: user.user_id,
        book_id: book.book_id,
        loan_date: new Date('2025-04-24'),
        return_date: new Date('2025-04-29')
    });

})();


module.exports = {
    Loan,
    Book,
    User
}