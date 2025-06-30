var jwt = require('jsonwebtoken');

function authenticateTokenFromSession(req, res, next) {
  const token = req.session.token;
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err)
      return res.sendStatus(403);
    next();
  });
}

function authenticateTokenFromHeaders(req, res, next) {
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

// Middleware to verify JWT token
const authenticateSocketIoToken = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('No token provided'));
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    socket.user = decoded; // Store user info in socket
    next();
  } catch (err) {
    next(new Error('Invalid token'));
  }
};

function generateAccessToken(user) {
  let {email, password, user_id, first_name} = user;
  console.log(process.env.TOKEN_SECRET);
  var token = jwt.sign({ email, password, user_id, first_name }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  return token;
}

module.exports = {
  authenticateTokenFromSession,
  authenticateTokenFromHeaders,
  authenticateSocketIoToken,
  generateAccessToken
}