const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const seedAdmin = async (req, res) => {
  try {
    // Use existing database connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ 
        message: "Database not connected", 
        error: "Please ensure database connection is established" 
      });
    }

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
