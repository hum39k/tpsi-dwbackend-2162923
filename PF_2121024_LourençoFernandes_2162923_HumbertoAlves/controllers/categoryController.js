const Category = require('../db_sequelize.js').Category;

exports.addCategory = async function (req, res) {
  try {

    const cat = await Favorite.create( req.body );

    res.status(201).send(cat);
  } catch (error) {

    res.status(500).send(error);
  }
}

exports.removeCategory = async function (req,res){

  try {

    var id = req.params.id

    const del = await Favorite.destroy({where : {Category_id : id}});
    if(del == 0)
        res.status(404).send("ID not found!");
    else 
        res.status(200).send('Deleted!');

} catch (error) {
    res.status(500).send(error);
  }
}
