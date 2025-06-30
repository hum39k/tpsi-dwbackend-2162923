const Product = require('../db_sequelize.js').Product;
const User = require('../db_sequelize.js').User;
const Favorite = require('../db_sequelize.js').Favorite;
const auth = require('../utils/auth');



async function getFavorites(req,res){
    
    var id = req.user.user_id;

    const fav = await Favorite.findAll({where: {user_id : id}});
    if (fav.length == 0)
        res.send("No favorites added yet!");
    else
        res.send(fav);
}


async function addFavorite(req, res) {
  try {
    const u_id = req.user.id;  
    const p_id = req.params.id;

    const fav = await Favorite.create({ user_id: u_id, product_id: p_id });

    res.status(201).send(fav);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao adicionar favorito');
  }
}

async function removeFavorite(req,res){

  try {
    const u_id = req.user.id;  
    const p_id = req.params.id;

    const del = await Favorite.create({ user_id: u_id, product_id: p_id });
    if(del == 0)
        res.status(404).send("ID not found!");
    else 
        res.status(200).send('Deleted!');
    
} catch (error) {
    console.error(error);
    res.status(500).send('Erro ao adicionar favorito');
  }
}





module.exports = {
  removeFavorite,
  addFavorite,
  getFavorites
}