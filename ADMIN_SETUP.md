# Admin Setup Guide

This guide explains how to manually set up the admin user for your portfolio.

## Prerequisites

- MongoDB connection configured in `.env.local`
- Node.js installed

## Setup Instructions

### 1. Configure Admin Credentials

Open `scripts/setup-admin.js` and update the following variables with your desired credentials:

```javascript
const ADMIN_EMAIL = 'admin@example.com';      // Change this
const ADMIN_PASSWORD = 'Admin@123';            // Change this
const ADMIN_NAME = 'Admin';                    // Change this
```

### 2. Run the Setup Script

Execute the following command from the project root:

```bash
node scripts/setup-admin.js
```

### 3. Verify Setup

You should see output similar to:

```
🔌 Connecting to MongoDB...
✅ Connected to MongoDB
🔐 Hashing password...
👤 Creating admin user...
✅ Admin user created successfully!

📧 Email: admin@example.com
🔑 Password: Admin@123

⚠️  IMPORTANT: Change these credentials in production!
🔌 Database connection closed
```

### 4. Login

Navigate to `/admin` and login with your configured credentials.

## Important Notes

- ⚠️ **Security**: Never commit the `setup-admin.js` file with real credentials to version control
- 🔒 **Production**: Use strong passwords in production environments
- 🔄 **Reset**: If you need to reset the password, delete the user from MongoDB and run the script again
- 📝 **One-time**: This script only needs to be run once to create the admin user

## Troubleshooting

### "Admin user already exists"

If you see this message, an admin with that email already exists. To reset:

1. Connect to your MongoDB database
2. Delete the existing user: `db.users.deleteOne({ email: 'admin@example.com' })`
3. Run the setup script again

### Connection Error

Ensure your `MONGODB_URI` environment variable is correctly set in `.env.local`:

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
```

Or update the connection string directly in the script for testing.
