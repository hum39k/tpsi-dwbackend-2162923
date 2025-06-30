const {Sequelize, Model, DataTypes} = require('sequelize');
const http = require('http');
var fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
//var mysql = require('mysql');
const sequelize = new Sequelize('ficha9_node', 'root', 'password', {dialect : 'mysql'});
sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established");
    })
    .catch(err => {
        console.error("Unable to connect", err);
    });




const Car = require('./models/Car.js')(sequelize, Sequelize, DataTypes);


(async () => {
    await sequelize.sync({ force:false })
    // const car = await Car.create({});
    console.log(Car.toJSON)
//     Car.bulkCreate([
//     {brand : 'Mercedes-Benz', model : 'Mercedes C Class', licensePlate : '438 1297', color : 'White', year : 2005, power : 500},
//     {brand : 'Seat', model : 'Leon', licensePlate : '3NU 804', color : 'Red', year : 2008, power : 450},
//     {brand : 'Toyota', model : 'RAV4', licensePlate : 'T04 1FK', color : 'Blue', year : 2015, power : 300},
//     {brand : 'Kia', model : 'Ceed', licensePlate : 'QAR-6463', color : 'Cyan', year : 2025, power : 700}
// ])
})();

//------------------------------------------------------------------Exercício 5---------------------------------------------------------------------------------------

//a
app.get("/select", async (req, res) => {
    try {
        const car = await Car.findAll();
        res.json(car);
    }catch(error){
        res.status(500).send(error);
    }
});

//b
app.post("/insert", async(req, res) => {
    var {brand, model, licensePlate, color, year, power} = req.body;
    try {
        const car = await Car.create({brand : brand, model : model, licensePlate : licensePlate, color : color, year : year, power : power});
        res.json(car);
    }catch(error){
        res.status(500).send(error);
    }
});

//c
app.delete("/delete", async(req, res) => {
    var {id} = req.body;
    try {
        const Delete = await Car.destroy({where: {id : id}});
        res.status(200).send("Car with " + id + "id deleted successfully.")
    } catch(error){
        res.status(500).send(error)
    }
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});