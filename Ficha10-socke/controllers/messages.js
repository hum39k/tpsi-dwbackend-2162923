const Messages = require('../db_sequelize.js').Messages;

async function saveMessage(req, res) {
  try {
    
    

    const cat = await Favorite.create( req.body );

    res.status(201).send(cat);
  } catch (error) {
   
    res.status(500).send(error);
  }
}