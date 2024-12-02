import jwt from 'jsonwebtoken';

const role = (req, res) => {
    const { email, usertoken } = req.body;

    if (!usertoken) {
        return res.status(400).json({ message: "Token is required" });
    }

    try {
    
        const decoded = jwt.verify(usertoken, process.env.JWT_SECRET || '@#(^#^@#');


        if (decoded.email !== email) {
            return res.status(401).json({ success: false, message: "Token email does not match provided email" });
        }

        // If the token is valid, send a success message
        return res.status(200).json({ success: true, message: "Token is valid and matched" });

    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default role;
