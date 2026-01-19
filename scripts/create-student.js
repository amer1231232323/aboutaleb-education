const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// User Schema (matching the model)
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            default: "",
        },
        role: {
            type: String,
            enum: ["student", "admin"],
            default: "student",
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function createStudent() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Check if student already exists
        const existingStudent = await User.findOne({ email: 'amer@gmail.com' });

        if (existingStudent) {
            console.log('⚠️  Student with email amer@gmail.com already exists!');
            console.log('Student details:');
            console.log({
                id: existingStudent._id,
                name: existingStudent.name,
                email: existingStudent.email,
                role: existingStudent.role,
                createdAt: existingStudent.createdAt
            });

            // Ask if we should update the password
            console.log('\n🔄 Updating password to: 100200300');
            const hashedPassword = await bcrypt.hash('100200300', 10);
            existingStudent.password = hashedPassword;
            await existingStudent.save();
            console.log('✅ Password updated successfully!');

            await mongoose.connection.close();
            return;
        }

        // Hash the password
        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash('100200300', 10);
        console.log('✅ Password hashed');

        // Create the student user
        console.log('Creating student user...');
        const student = new User({
            name: 'Amer',
            email: 'amer@gmail.com',
            password: hashedPassword,
            phone: '',
            role: 'student'
        });

        await student.save();
        console.log('✅ Student created successfully!');
        console.log('\n📋 Student Details:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`ID:       ${student._id}`);
        console.log(`Name:     ${student.name}`);
        console.log(`Email:    ${student.email}`);
        console.log(`Role:     ${student.role}`);
        console.log(`Created:  ${student.createdAt}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n🔐 Login Credentials:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Email:    amer@gmail.com');
        console.log('Password: 100200300');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n🌐 Login URL: http://localhost:3000/student/login');

        // Close connection
        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');

    } catch (error) {
        console.error('❌ Error creating student:', error);
        process.exit(1);
    }
}

// Run the script
createStudent();
