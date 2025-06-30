const { Model, DataTypes } = require('sequelize');

class Favorite extends Model {}

module.exports = (sequelize) => {
  Favorite.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Favorite',
    tableName: 'favorite',
    timestamps: false
  });

  return Favorite;
};
