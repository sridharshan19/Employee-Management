const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: __dirname + '/.env' });

const User = require('./models/User');

const createDefaultAdmin = async () => {
  try {
    // Connect to database directly
    await mongoose.connect('mongodb://localhost:27017/employee-management');
    console.log('✅ MongoDB Connected');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@company.com' });
    if (existingAdmin) {
      console.log('✅ Default admin already exists!');
      console.log('📧 Email: admin@company.com');
      console.log('🔑 Password: admin123');
      process.exit(0);
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

    console.log('✅ Default admin created successfully!');
    console.log('📧 Email: admin@company.com');
    console.log('🔑 Password: admin123');
    console.log('⚠️  Please change the password after first login for security.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating default admin:', error);
    process.exit(1);
  }
};

createDefaultAdmin();
