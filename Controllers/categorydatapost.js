import expense from "../model/expense.model.js";
import dotenv from "dotenv";
dotenv.config();


const categoriespost = async (req, res) => {
    const { name, amount, date, categories} = req.body;
    const usertoken = req.user.role;
       
    

    if (!name || !amount || !date || !categories ) {
        return res.status(400).json({ error: 'Missing required fields. Please provide name, amount, date, and categories.' });
    }
    if(usertoken !== "admin")
    {
      return res.status(400).json({message:"YOu Don't have Allow to add Asset"})
    }
    try {

        const newExpense = await expense.create({
            name,
            amount,
            date: new Date(date),
            categories,
        });

        res.status(201).json({ message: 'Expense created successfully', expense: newExpense });

    } catch (error) {
        res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.',error });
}};



const updateExpense = async (req, res) => {
    const {id} = req.params;
    const updateData = req.body; 
  
    try {
   
      for (const key in updateData) {
        if (Object.prototype.hasOwnProperty.call(updateData, key)) {
          const element = updateData[key];
          
          const updateQuery = { [key]: element };
          
          console.log(`${key} : ${element}`);
          
        
         await expense.updateOne(
          {_id : id}, 
           { $set: updateQuery } // Set the value of the specified field
          );
        }
      }
  
      res.status(200).json({ message: "Project updated successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating project", error: error.message });
    }
  };
  
  const DeleteExpense = async (req, res) => {
    const { id } = req.params;
    const { role } = req.user;
    
    try {
        if (!id) {
            return res.status(400).json({
                message: "User Id is missing"
            });
        }

        if (role !== "admin") {
            return res.status(401).json({ message: "You are unauthorized" });
        }

        const existexpense = await expense.findByIdAndDelete({ _id: id });

        if (!existexpense) {
            return res.status(400).json({ message: "Expense record not found" });
        }

        return res.status(200).json({
            success: true, 
            message: "Expense deleted successfully"
        });
        
    } catch (error) {
        console.error("Error found", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

  
 

export default {categoriespost ,updateExpense,DeleteExpense};
