const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedAdmin = async (req, res) => {
  try {
    // Connect to database directly
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/employee-management');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@company.com' });
    if (existingAdmin) {
      return res.status(200).json({
        message: "Default admin already exists",
        admin: {
          email: "admin@company.com",
          password: "admin123"
        }
      });
    }

    // Create default admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const defaultAdmin = new User({
      name: 'System Administrator',
      email: 'admin@company.com',
      password: hashedPassword,
      role: 'admin',
      employeeType: 'Project Manager',
      mustChangePassword: false
    });

    await defaultAdmin.save();

    res.status(201).json({
      message: "Default admin created successfully",
      admin: {
        email: "admin@company.com",
        password: "admin123"
      }
    });
  } catch (error) {
    console.error('Error seeding admin:', error);
    res.status(500).json({ 
      message: "Error creating default admin", 
      error: error.message 
    });
  }
};

module.exports = { seedAdmin };
