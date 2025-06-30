const { Model, DataTypes } = require('sequelize');

class Product extends Model {}

module.exports = (sequelize) => {
  Product.init({
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_sold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    listed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    info: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'product',
    timestamps: false
  });

  return Product;
};
