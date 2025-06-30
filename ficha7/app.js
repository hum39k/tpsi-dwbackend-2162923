var mysql = require('mysql');
const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;
const http = require("http");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
const swaggerAutogen = require('swagger-autogen')();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerDocument));


var mysql = require('mysql');
const { throwDeprecation } = require('process');
const { json } = require('stream/consumers');
var pool = mysql.createPool({
    connectionLimit : 10,
    host : "127.0.0.1",
    user : "root",
    password : "password",
    database : "f7_node",
    debug : "false"
});


app.get("/users", (req, res) => {
    pool.query('SELECT * from users', function(error, results, fields){
        if(error) throw error;
        console.log('The solution is: ', results);
        res.send(results);
    
    })    
})


// app.post("/users", (req,res) => {
//     var {firstname,lastname,profession,age} =req.body;
//     pool.query('insert into users(firstname,lastname,profession,age) values(?,?,?,?)', 
//         [firstname,lastname,profession,age], function(error,results,fields){
//             if(error) throw error;
//             res.send("ID: " + results.insertId);
//         })

// })

app.post("/users", (req,res) => {
    var details = req.body;
    pool.query('insert users set ?', [details], function(error,results,fields){
        try {
            if(error) throw error;
            res.send("ID: " + results.insertId);
        }
        catch (error){
            res.status(500).send(error);
        }
    })



})


app.put("/products/discount", (req,res) => {

    var id = req.query.id;
    var discount = req.query.percent;
    
    if (isNaN(discount) || discount <= 0 || discount >= 100 )
        res.send(400);
    else{
        
        pool.query('select * from prducts where id = ?', [id],function(error,results,fields){
            if (error)
                res.send(500);
            if (results.length == 0)
                res.send(404);

            const produto = results[0];
            const preco = results.price;
            const newprice = preco * (1- discount/100);
            
            
        })
        
        
        pool.query('update Products set price = ? where id = ?',[newprice,id], function(error,results,fields){ 
            try {
                if(error) throw error;
                res.send("Atualizado com sucesso.");
            }
            catch (error){
                res.status(500).send(error);
            }
        })
    }

})


app.get("/list/keywords", (req,res) => {
    const keywords = req.body.keywords.split(',');
    const like = keywords.join('|');

    console.log(keywords);
    console.log(like);

    pool.query('Select * from Product where description regexp ?',[like], function(error,results,fields){
        if (error)
            res.status(500).send(error);
        else if (results.length == 0)
            res.status(404).send("No products matching that desciption where found.");
        else
            res.send(results);
    })

})




app.delete("/users", (req,res) =>{
    var id = req.body.id;
    pool.query('delete from users where id = ?', [id],function(error,results,fields){
        if(error) throw error;
        if (results.affectedRows != 0)
            res.send("ID: " + id + " deleted");
        else res.send("ID invalid!");
    })
})


app.delete("/users/:id", (req,res) =>{
    var id = req.params.id;
    pool.query('delete from users where id = ?', [id],function(error,results,fields){
        if(error) throw error;
        if (results.affectedRows != 0){
            res.send("Affected rows: " + results.affectedRows);
        }
        else res.send("ID invalid!");
    })
})

app.get("/users/:id", (req,res) => {
    var id = req.params.id;
    pool.query('select * from users where id = ?', [id],function(error,results,fields){
        if(error) throw error;
        if (results.length != 0)
            res.send(results);
        else res.send("ID invalid");        
    })
})

app.get("/users/:age/:profession", (req,res) => {
    var age = req.params.age;
    var profession = req.params.profession;
    pool.query('select * from users where age = ? and profession = ?', [age,profession],function(error,results,fields){
        if(error) throw error;
        if (results.length != 0)
            res.send(results);
        else res.send("ID invalid");
    })
})

app.put("/users/:id", (req,res) => {
    var id =req.params.id;
    var details = req.body;    
    pool.query('update users set ? where id = ?', [details,id], function(error,results,fields){
        if (error)
            res.status(500).send(error);
        if (results.affectedRows != 0)
            pool.query('SELECT * FROM users WHERE id = ?', [id], function(errors, result, fields){
                if(errors)
                    res.status(500).send(errors);
                res.send(result);
            })
        else res.send("ID invalid");
        })



})

app.put('/comment/:id', (req,res) => {
    var id = req.params.id;
    var details = req.body;
    pool.query('Select comment from product where id = ? '[id], function(error, results, fields){
        try{
            if(error) throw error;
            if(results.length == 0) res.status(404).send("That id doesnt exist.");
            else {
                const new_comment= results + JSON.stringify(details);
                pool.query('update product set comment = ? where id =?',[new_comment,id],function(error, results, fields){
                    if (error)
                        res.status(500).send(error);
                    else 
                        res.send('Updated')
                })
        }}
        catch (error){
            res.status(500).send(error)
        }
    })
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
  