const { Model, DataTypes } = require('sequelize');

class Images extends Model {}

module.exports = (sequelize) => {
  Images.init({
    image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    img_path: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Images',
    tableName: 'images',
    timestamps: false
  });

  return Images;
};
