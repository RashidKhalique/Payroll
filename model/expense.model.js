import mongoose from "mongoose";
const expenseSchema = new mongoose.Schema({
     name:{
        type: String,
        required:true
     },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    categories: {
      type: [String],
      enum: ['Travelling', 'Hotel', 'Salary', 'Others'], // Define your possible categories here
      required: true,
    },
  });

  const expense = mongoose.model("expense", expenseSchema)
export default expense;