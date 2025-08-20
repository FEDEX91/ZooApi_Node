const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

// Create a user
exports.register = async (req, res) => {

  try {

    const { userName, password, ...rest } = req.body;

    // Validate required fields
    if (!userName || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const userExists = await User.findOne({ userName });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, password: hashedPassword, ...rest });

    const userSave = await newUser.save();
    const user = userSave.toObject();

    // Remove sensitive information
    delete user.password;
    delete user.__v;
    delete user.createdAt;
    delete user.updatedAt;

    user.token = generateToken(user);
    res.status(201).json(user);

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({
      email: email
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const userObject = user.toObject();
    userObject.token = generateToken(userObject);

    // Remove sensitive information
    delete userObject.password;
    delete userObject.__v;
    delete userObject.createdAt;
    delete userObject.updatedAt;

    res.status(200).json(userObject);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
