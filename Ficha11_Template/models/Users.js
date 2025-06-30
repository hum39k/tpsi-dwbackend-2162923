const DataTypes = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('users', {

        user_id : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull : false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull : false
        },
        email : {
            type: DataTypes.STRING,
            allowNull : false
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false
        },
        adress : {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number : {
            type: DataTypes.STRING,
            allowNull: true
        }
    },{
        tableName: 'users',
        timestamps: true
    }
);

    return User
}
