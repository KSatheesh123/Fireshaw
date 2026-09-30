const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'fireshaw_safety_secret_key_2026';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// Register New User
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone = '',
      role = 'customer',
      address = '',
      city = '',
      pincode = '',
      companyName = '',
      gstNumber = '',
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      phone,
      role: role === 'admin' ? 'admin' : 'customer',
      address,
      city,
      pincode,
      companyName,
      gstNumber,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully!',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
        city: user.city,
        pincode: user.pincode,
        companyName: user.companyName,
        gstNumber: user.gstNumber,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
        city: user.city,
        pincode: user.pincode,
        companyName: user.companyName,
        gstNumber: user.gstNumber,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get current user profile
exports.getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Seed default users if none exists
exports.seedDefaultUsers = async () => {
  try {
    const adminEmail = 'admin@fireshaw.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: 'Fireshaw Admin',
        email: adminEmail,
        password: 'admin123',
        phone: '+91 98220 54321',
        role: 'admin',
        city: 'Pune',
      });
      console.log('[Auth Seed] Created default admin: admin@fireshaw.com / admin123');
    }

    const customerEmail = 'customer@fireshaw.com';
    const existingCustomer = await User.findOne({ email: customerEmail });
    if (!existingCustomer) {
      await User.create({
        name: 'Arjun Mehta',
        email: customerEmail,
        password: 'customer123',
        phone: '+91 98765 12345',
        role: 'customer',
        address: '404 Skyline Towers, MG Road',
        city: 'Mumbai',
        pincode: '400001',
        companyName: 'Apex Logistics Ltd',
        gstNumber: '27AABCA1234F1Z5',
      });
      console.log('[Auth Seed] Created default customer: customer@fireshaw.com / customer123');
    }
  } catch (err) {
    console.error('[Auth Seed Error]:', err.message);
  }
};
