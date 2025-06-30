var jwt = require('jsonwebtoken');
const User = require('../db_sequelize').User;

async function authenticateAdmin(req,res,next) {
    id = req.user.user_id;
    var check = await User.findOne({where: {user_id : id}})
    if (check.privilege == 0)
      return res.status(403).send("Not enough privileges!");
    next();
  
}


function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 
  // Unauthorized
  if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err)
      return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
}

function generateAccessToken(user) {
  let {email, password, user_id, first_name} = user;
  var token = jwt.sign({ email, password, user_id, first_name }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  return token;
}

module.exports = {
    authenticateToken,
    generateAccessToken,
    authenticateAdmin 
}