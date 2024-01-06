const jwt = require('jsonwebtoken');
const SECRET_KEY =  'your_default_secret_key'; // Use an environment variable

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.userId;
    next();
  });
}

module.exports = verifyToken;
