const User = require('../db_sequelize').User;


async function getAllUsers(req,res){
    var users = await User.findAll();
    res.send(users);
}

async function getUserById(req,res) {
    var id = req.params.id;
    var user = await User.findByPk(id);
    if (user.lenght == 0)
        res.status(404).send("ID not found!");
    else
        res.send(user);
    
}

async function createUser(req,res){
    var {first_name,last_name,email,adress,phone_number} = req.body;
    const user = await User.create({first_name: first_name, last_name: last_name, email: email, adress: adress, phone_number: phone_number});
    res.send(user);
}

async function deleteUser(req,res) {
    var id = req.params.id;
    const del = await User.destroy({where: {user_id:id}});
    if (del === 0)
        res.status(404).send("ID not found!");
    else
        res.status(200).send('Deleted');
}

async function updateUser(req,res) {
    var id = req.params.id;
    var details = req.body;
    const [user] = await User.update(details,{where : {user_id:id}});
    if (user === 0)
        res.status(404).send("Id not found!");
    else
        res.send('Updated');
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
};