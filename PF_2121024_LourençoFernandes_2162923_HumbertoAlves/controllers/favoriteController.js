const Favorite = require('../db_sequelize.js').Favorite;

async function getFavorites(req,res){

  try {
    var id = req.user.user_id;

    fav = await Favorite.findAll({where: {user_id : id}});
  if (fav.length == 0)
      res.send("No favorites added yet!");
  else
      res.send(fav);
  } catch (error) {

    res.status(500).send(error);
  }
}


async function addFavorite(req, res) {
  try {
    const u_id = req.user.user_id;
    const p_id = req.params.id;

    const fav = await Favorite.create({ user_id: u_id, product_id: p_id });

    res.status(201).send(fav);
  } catch (error) {

    res.status(500).send(error);
  }
}

async function removeFavorite(req,res){

  try {
    const u_id = req.user.user_id;
    const p_id = req.params.id;

    const del = await Favorite.destroy({ where :{user_id: u_id, product_id: p_id }});
    if(del == 0)
        res.status(404).send("ID not found!");
    else 
        res.status(200).send('Deleted!');

} catch (error) {

    res.status(500).send(error);
  }
}





module.exports = {
  removeFavorite,
  addFavorite,
  getFavorites
}