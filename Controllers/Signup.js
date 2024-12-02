import User from '../model/User.model.js';
import bcrypt from 'bcrypt';

const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email ||!password)
        {
            return res.status(403).json({ message: 'All Field are Rquired' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user using the create method
        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default Signup;
