const Product = require('../db_sequelize.js').Product;
const User = require('../db_sequelize.js').User;
const Category = require('../db_sequelize.js').Category;
const auth = require('../utils/auth.js');
const { Op } = require('sequelize');

exports.getAllProducts = async function (req,res){

    try {
        var product = await Product.findAll();
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getProductById = async function (req,res) {
    
    try {
        var id = req.params.id;
        var product = await Product.findAll({where: {product_id:id}});
    if (product.length == 0)
        res.status(404).send("ID not found")
    else
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
    
}

exports.getProductUser = async function (req,res) {

    try {
        var id = req.params.id;
        var user = await User.findByPk(id); 
    if (user.lenght == 0)
        res.status(404).send("ID not found!");
    else{
        products = await Product.findAll({where: {user_id : id}})
        if (products.lengt == 0)
            res.send("User has no products for sale");
        else
            res.send(products);
    }
    } catch (error) {
        res.status(500).send(error);
    }
    
}

exports.searchProduct = async function (req,res) {
    try {
        var text = req.body.text;
        var product = await Product.findAll({
            where: {
                product_name: {
                    [Op.like]: `%${text}%`
                }
            }
        });
        if(product.length == 0)
            res.send("Não foram encontrados produtos");
        else
            res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.createProduct = async function (req,res){

    try {
        const product = await Product.create(req.body);
        res.status(201).send(product);

    } catch (error) {
        res.status(500).send(error);
    }
    
}

exports.deleteProduct = async function (req,res) {
    
    try {
        var id = req.params.id;
        const del = await Product.destroy({where: {product_id:id}});
    if (del === 0)
        res.status(404).send("ID not found");
    else
        res.status(200).send('Deleted');
    } catch (error) {
        res.status(500).send(error);
    }

}

exports.updateProduct = async function (req,res) {
  
    try {
        var id = req.params.id
        var details = req.body;
        const product = await Product.update(details,{where : {product_id:id}});
        if (product[0] === 0)
            res.status(404).send("ID not found");
    else
        res.send('Updated');
    } catch (error) {
        res.status(500).send(error);  
    }
}

exports.getProductByCategory = async function (req, res) {
    try {
      const categoryName = req.params.categoryName;
      
    
      const category = await Category.findOne({
        where: { category_name: categoryName }
      });
  
  
      if (!category) {
        console.log('Category not found');
        return res.status(404).json({ message: 'Category not found' });
      }
  
      
      const products = await Product.findAll({
        where: { category_id: category.category_id },
        include: [
          { model: Category },
          { model: User, attributes: ['user_id', 'username', 'avatar_path'] }
        ]
      });
      res.send(products);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };