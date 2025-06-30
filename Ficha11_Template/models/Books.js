const DataTypes = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const Book = sequelize.define('books', {

        book_id : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        title: {
            type: DataTypes.STRING,
            allowNull : false
        },
        author: {
            type: DataTypes.STRING,
            allowNull : false
        },
        publication_date : {
            type: DataTypes.DATE,
            allowNull : false
        },
        genre : {
            type: DataTypes.STRING,
            allowNull: false
        },
        available_copies : {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        tableName: 'books',
        timestamps: true
    }
);

    return Book
}
