const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'sleepora_jwt_secret_key_2026_xYz';
  return jwt.sign({ id }, secret, {
    expiresIn: '30d'
  });
};

// @desc    Authenticate admin & generate JWT token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        success: true,
        token: generateToken(user._id),
        user: {
          id: user._id,
          email: user.email
        }
      });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update admin profile credentials
// @route   PUT /api/auth/update
// @access  Private (Admin)
const updateAdminCredentials = async (req, res) => {
  const { email, password } = req.body;

  try {
    // req.user is populated by protect middleware
    const user = await User.findById(req.user._id);

    if (user) {
      if (email) user.email = email;
      if (password) user.password = password; // Schema pre('save') hashes password automatically

      const updatedUser = await user.save();

      return res.json({
        success: true,
        message: 'Credentials updated successfully',
        token: generateToken(updatedUser._id),
        user: {
          id: updatedUser._id,
          email: updatedUser.email
        }
      });
    } else {
      return res.status(404).json({ success: false, message: 'Admin account not found' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  loginUser,
  updateAdminCredentials
};
