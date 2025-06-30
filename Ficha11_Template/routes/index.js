var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/login', function(req, res, next) {
//   res.render('login', { message: req.flash('loginMessage') });
// });

// router.get('/signup', function(req, res, next) {
//   res.render('signup', { message: req.flash('signupMessage') });
// });



router.post('/signup', indexController.signup);
router.post('/login', indexController.login);


module.exports = router;
