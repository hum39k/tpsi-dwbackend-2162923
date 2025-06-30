const User = require("../db_sequelize").User;
const auth = require("../utils/auth");

exports.signup = function (req, res) {
    var { email, password } = req.body;   
    
    User.findOne({where: {email: email}})
    .then(result => {
        if (result == null) {
            User.create(req.body)
                .then(user => {
                    //var token = auth.generateAccessToken(email, password);
                    //req.session.user = user;
                    //req.session.token = token;
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
            req.flash('loginMessage', 'No user found with that e-mail.'); // req.flash is the way to set flashdata using connect-flash
            res.redirect('/login');
        }
        else if (user.password != password) {
            req.flash('loginMessage', 'Oops! Wrong password.'); // create the loginMessage and save it to session as flashdata{
            res.redirect('/login');
        } else {
            const token = auth.generateAccessToken(email, password);
            req.session.user = user;
            req.session.token = token;            
            res.cookie('access_token', token, {
                expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
            }).redirect('/profile');
        }
    }).catch(function (err) {
        // handle error;
        req.flash('loginMessage', err); // req.flash is the way to set flashdata using connect-flash    
        console.log(err);               
        res.redirect('/login');
    });
}