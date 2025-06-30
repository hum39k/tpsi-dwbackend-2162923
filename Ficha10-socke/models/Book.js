const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Book = sequelize.define('Book', {
      book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      publication_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: true
      },
      available_copies: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    }, {
      tableName: 'books',
      timestamps: true
    });
  
    return Book;
  };