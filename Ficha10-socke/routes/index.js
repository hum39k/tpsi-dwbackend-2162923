var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');
const auth = require("../utils/auth");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { message: req.flash('loginMessage') });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { message: req.flash('signupMessage') });
});

router.get('/profile', auth.authenticateTokenFromSession, function (req, res) {
  res.render('profile', {
      user: req.session.user,
      token: req.session.token
  });
});

router.post('/signup', indexController.signup);
router.post('/login', indexController.login);

module.exports = router;
