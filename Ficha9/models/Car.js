const {Model} = require('sequelize');

class Car extends Model{}

module.exports = function (sequelize, Model, DataTypes) {
    // class Car extends Model {}
    Car.init(
        {
            brand: DataTypes.STRING,
            model:DataTypes.STRING,
            licensePlate: DataTypes.STRING,
            color: DataTypes.STRING,
            year: DataTypes.INTEGER,
            power: DataTypes.INTEGER,
            displacement: DataTypes.FLOAT
        },
        {sequelize, modelName: 'Car'}
    );
    return Car;
}