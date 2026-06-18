const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'timewell_jwt_secret_key_2026_xYz';
      const decoded = jwt.verify(token, secret);
      
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized, admin account not found' });
      }
      return next();
    } catch (error) {
      console.error('JWT verification error:', error);
      return res.status(401).json({ success: false, message: 'Not authorized, session expired or invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, login required' });
  }
};

module.exports = { protect };
