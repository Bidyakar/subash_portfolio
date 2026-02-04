/**
 * Manual Admin Setup Script
 * 
 * This script creates an admin user in the database.
 * Update the credentials below before running.
 * 
 * Usage: node scripts/setup-admin.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ========================================
// CONFIGURE YOUR ADMIN CREDENTIALS HERE
// ========================================
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'Admin@123';
const ADMIN_NAME = 'Admin';

// MongoDB Connection String
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

// User Schema (matching your model)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function setupAdmin() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists with email:', ADMIN_EMAIL);
            console.log('   If you want to reset the password, delete the user first.');
            process.exit(0);
        }

        // Hash the password
        console.log('🔐 Hashing password...');
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

        // Create admin user
        console.log('👤 Creating admin user...');
        await User.create({
            name: ADMIN_NAME,
            email: ADMIN_EMAIL,
            password: hashedPassword,
        });

        console.log('✅ Admin user created successfully!');
        console.log('');
        console.log('📧 Email:', ADMIN_EMAIL);
        console.log('🔑 Password:', ADMIN_PASSWORD);
        console.log('');
        console.log('⚠️  IMPORTANT: Change these credentials in production!');

    } catch (error) {
        console.error('❌ Error setting up admin:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
        process.exit(0);
    }
}

setupAdmin();
