const User = require('../db_sequelize').User;
const auth = require('../utils/auth');


async function getAllUsers(req,res){
try {
    var users = await User.findAll();
    res.send(users);

} catch (error) {
    res.status(500).send(error);
}

}

async function getUserById(req,res) {

    try {
    var id = req.params.id;
    var user = await User.findByPk(id);
    if (user.lenght == 0)
        res.status(404).send("ID not found!");
    else
        res.send(user);

    } catch (error) {
       res.status(500).send(error);
    }

}



async function deleteUser(req,res) {
    try {

        var id = req.params.id;
    const del = await User.destroy({where: {user_id:id}});
    if (del === 0)
        res.status(404).send("ID not found!");
    else
        res.status(200).send('Deleted');

    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateUser(req,res) {

    try {
           var id = req.params.id;
    var details = req.body;
    const [user] = await User.update(details,{where : {user_id:id}});
    if (user === 0)
        res.status(404).send("Id not found!");
    else
        res.send('Updated');
    } catch (error) {
        res.status(500).send(error);
    }

 
}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser
};