import User from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password)
        {
            return res.status(403).json({ message: 'All Field are Rquired' });
        }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const match = await bcrypt.compare(password, user.password);
        
        if (!match) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const { role } = user;

        const token = jwt.sign({ email,role},  process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ success : true , message: 'Login successful', user: { name: user.name, email: user.email, role }, token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default login;
