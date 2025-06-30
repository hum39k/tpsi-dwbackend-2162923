const User = require("../db_sequelize").User;
const auth = require('../utils/auth');

exports.signup = function (req, res) {
  var email = req.body;
  User.findOne({ where: { email: email } }).then((result) => {
    if (result == null) {
      User.create(req.body);
    } else {
      res.status(401).send("That email already exists");
    }
  });
};

exports.login = function (req, res) {
  var { email, password } = req.body;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user == null) res.status(401).json({ message: "Email not found" });
      else if (user.password != password)
        res.status(401).json({ message: "Invalid password!" });
      else {
        const token = auth.generateAccessToken(email, password);
        res.json({ bearer_token: token });
      }
    })
    .catch(function (err) {
      res.status(500).json({ message: err });
    });
};
