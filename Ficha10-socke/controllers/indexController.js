const User = require("../db_sequelize").User;
const auth = require("../utils/auth");

exports.signup = function (req, res) {
    

    User.findOne({ where: { email: email } })
        .then(result => {
            if (result == null) {
                User.create(req.body)
                    .then(user => {
                        var token = auth.generateAccessToken(user);
                        req.session.user = user;
                        req.session.token = token;
                        res.redirect('/profile');
                    });
            }
            else {
                req.flash('signupMessage', 'That e-mail is already taken.'); // req.flash is the way to set flashdata using connect-flash                   
                res.redirect('/signup');
            }
        }).catch(function (err) {
            // handle error;
            req.flash('signupMessage', err); // req.flash is the way to set flashdata using connect-flash                   
            res.redirect('/signup');
        });
}


exports.login = function (req, res) {
    var { email, password } = req.body;
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user == null) {
            res.status(401).json({ message: 'No user found with that e-mail.' });
        }
        else if (user.password != password) {
            res.status(401).json({ message: 'Wrong password.' });
        } else {
            const token = auth.generateAccessToken(user);
            res.json({bearer_token: token });

        }
    }).catch(function (err) {
        // handle error;
        res.status(500).json({ message: err });;
    });
}