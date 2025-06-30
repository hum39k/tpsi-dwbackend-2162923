var dotenv = require('dotenv');
// read .env file
dotenv.config();
const http = require('http');
var cors = require("cors");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session');
const swaggerDocument = require('./swagger_output.json');
const swaggerUi = require('swagger-ui-express');
const { Server } = require('socket.io');

const swaggerAutogen = require('swagger-autogen');

var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var productsRouter = require('./routes/products');
var favoriteRouter = require('./routes/favorite');
var categoryRouter = require('./routes/category');
var searchHistoryRouter = require('./routes/searchHistory');
var imageRouter = require('./routes/image');

var app = express();
const server = http.createServer(app);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.TOKEN_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/api', apiRouter);
app.use('/favorite', favoriteRouter);
app.use('/searchHistory', searchHistoryRouter);
app.use('/category', categoryRouter);
app.use('/images', imageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
