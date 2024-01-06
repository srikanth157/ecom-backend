const jwt = require('jsonwebtoken');

const SECRET_KEY ='your_default_secret_key'; // Use an environment variable

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '48h' });
  return token;
};

const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.userId;
};
// jwt.js

function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
}


module.exports = {
  generateToken,
  getUserIdFromToken,
  verifyToken
};
