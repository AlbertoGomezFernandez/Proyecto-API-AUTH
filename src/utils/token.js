const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  if (!user) {
    throw new Error('User is missing');
  }
  delete user.password;
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY, { expiresIn: '30d' });
};

const verifyToken = (token) => {
  if (!token) {
    throw new Error('Token is missing');
  }

  return jwt.verify(token, process.env.JWT_KEY);
};


module.exports = {
  generateToken,
  verifyToken
};