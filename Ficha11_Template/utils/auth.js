var jwt = require('jsonwebtoken');

// function authenticateTokenFromSession(req, res, next) {
//   const token = req.session.token;
//   if (token == null) return res.sendStatus(401);
//   jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
//     if (err)
//       return res.sendStatus(403);
//     //req.user = user;
//     next();
//   });
// }

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
  console.log(process.env.TOKEN_SECRET);
  var token = jwt.sign({ email, password, user_id, first_name }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  return token;
}


function authenticateAdmin(req,res,next) {
  
  if (req.user.privilege == 0) {
    return res.status(403).send("Access denied");
  }
  next();

}

module.exports = {
    // authenticateTokenFromSession,
    authenticateToken,
    generateAccessToken,
    authenticateAdmin
}
