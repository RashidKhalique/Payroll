import expense from "../model/expense.model.js";
import jwt from 'jsonwebtoken';

const categoriespost = async (req, res) => {
    const { name, amount, date, categories, usertoken, email } = req.body;

    if (!name || !amount || !date || !categories ) {
        return res.status(400).json({ error: 'Missing required fields. Please provide name, amount, date, and categories.' });
    }

    try {
        const decoded = jwt.verify(usertoken, process.env.JWT_SECRET || '@#(^#^@#');

        console.log(decoded);
        

        if (decoded.email !== email) {
            return res.status(401).json({ success: false, message: "Token email does not match provided email" });
        }
        // else if(!decoded)
        // {
        //   res.status(403).json({success:false,message:"Token is Not Valid"})
        // }

        const newExpense = await expense.create({
            name,
            amount,
            date: new Date(date),
            categories,
        });

        res.status(201).json({ message: 'Expense created successfully', expense: newExpense });

    } catch (error) {

      if (error instanceof jwt.JsonWebTokenError) {
        res.status(403).json({ success: false, message: "Token is Not Valid or expired" });
    }  else {
    
        res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
    }
}};

export default categoriespost;
