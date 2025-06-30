const auth = require("../utils/auth");
const User = require("../db_sequelize").User;

exports.login = function (req, res) {
    var { email, password } = req.body;
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user == null) {
            res.status(401).json({message: 'No user found with that e-mail.'});
        }
        else if (user.password != password) {
            res.status(401).json({message: 'Wrong password.'});
        } else {
            const token = auth.generateAccessToken(email, password);
            res.json({ bearer_token: token });
        }
    }).catch(function (err) {
        res.status(500).json({message: err});
    });
}

