const { Model, DataTypes } = require('sequelize');

class Category extends Model {}

module.exports = (sequelize) => {
  Category.init({
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'category',
    timestamps: false
  });

  return Category;
};
