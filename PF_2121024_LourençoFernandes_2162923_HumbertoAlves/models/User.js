const { Model, DataTypes } = require('sequelize');

class User extends Model {}

module.exports = (sequelize) => {
  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    phonenumber: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    passwd: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    privilege: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    avatar_path: {
      type: DataTypes.STRING(250),
      defaultValue: 'C:\\Users\\humbe\\Documents\\uma\\IMG_8596.jpg'
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: false
  });

  return User;
};
