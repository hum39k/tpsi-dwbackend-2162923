const User = require("../db_sequelize").User;

async function getAllUsers(req, res) {
    var users = await User.findAll();
    res.send(users);
}

function getUserById(req, res) {

}

function createUser(req, res) {

}

function deleteUser(req, res) {

}

function updateUser(req, res) {

}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
};

