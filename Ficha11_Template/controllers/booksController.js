const Product = require('../db_sequelize.js').Product;
const User = require('../db_sequelize.js').User;
const auth = require('../utils/auth');

async function getAllProducts(req,res){
    
    var product = await Product.findAll();
    res.send(product);
}

async function getProductById(req,res) {
    
    var id = req.params.id;
    var product = await Product.findAll({where: {product_id:id}});
    if (product.length == 0)
        res.status(404).send("ID not found")
    else
        res.send(product);
    
}

async function getProductUser(req,res) {

    var id = req.params.id;
    var user = await User.findByPk(id); 
    if (user.lenght == 0)
        res.status(404).send("ID not found!");
    else{
        const products = await Product.findAll({where: {user_id : id}})
        if (products.lengt == 0)
            res.send("User has no products for sale");
        else
            res.send(products);
    }
    
}

async function searchProduct(req,res) {

    var text = req.body.text;
    var product = await Product.findAll({where: {product_name : {
        [Op.like] : '%'+{text}+'%'}
    }
    })
    if(product.lengt == 0)
        res.send("Não foram encontrados produtos");
    res.send(product);
}

async function createProduct(req,res){
    
    
    const product = await Product.create(req.body);
    res.status(201).send(product);
}

async function deleteProduct(req,res) {
    
  
    var id = req.params.id;
    const del = await Product.destroy({where: {product_id:id}});
    if (del === 0)
        res.status(404).send("ID not found");
    else
        res.status(200).send('Deleted');
}

async function updateProduct(req,res) {
    

    var id = req.params.id
    var details = req.body;
    const product = await Product.update(details,{where : {product_id:id}});
    if (product[0] === 0)
        res.status(404).send("ID not found");
    else
        res.status(200).send('Updated');
}





module.exports = {
  getAllProducts,
  getProductById,
  getProductUser,
  searchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};