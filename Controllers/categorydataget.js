import expense from "../model/expense.model.js";
import moment from "moment-timezone"

const findExpensesByMonth = async (req,res) => {

  const {year, month} = req.params;
  const monthMap = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12,
  };
  const monthNumber = monthMap[month];
    try {
      const startOfMonth = new Date(year, monthNumber - 1, 1); 
      const endOfMonth = new Date(year, monthNumber, 0); 
  
      const expenses = await expense.find({
        date: { $gte: startOfMonth, $lte: endOfMonth }
      });

       let Monthrecords = {
        Salary: 0,
        Travelling: 0,
        Hotel: 0,
        Others : 0
      };
  
      // Calculate total amount for each category
      expenses.forEach(expense => {
        expense.categories.forEach(category => {
          if (category === "Salary") {
            Monthrecords.Salary += expense.amount;
          } else if (category === "Travelling") {
            Monthrecords.Travelling += expense.amount;
          } else if (category === "office") {
            Monthrecords.Hotel += expense.amount;
          } else if (category === "more") {
            Monthrecords.Others += expense.amount;
          }
        });
      });
        res.status(201).json({
          sucess: true,
          expense : expenses,
          total : Monthrecords
        })
    } catch (err) {
      console.error('Error fetching expenses by month:', err);
    }
  };
  
  const findExpensesByYear = async (req, res) => {
    try {
      const { id } = req.params;
      const year = id;
  

      if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
        return res.status(400).json({ message: 'Invalid year parameter' });
      }

      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);
  
      const expenses = await expense.find({
        date: { $gte: startOfYear, $lte: endOfYear }
      });
      
      let Yearrecords = {
        Salary: 0,
        Travelling: 0,
        Hotel: 0,
        Others : 0
      };
  
      expenses.forEach(expense => {
        expense.categories.forEach(category => {
          if (category === "Salary") {
            Yearrecords.Salary += expense.amount;
          } else if (category === "Travelling") {
            Yearrecords.Travelling += expense.amount;
          } else if (category === "office") {
            Yearrecords.Hotel += expense.amount;
          } else if (category === "more") {
            Yearrecords.Others += expense.amount;
          }
        });
      });
  
      res.status(200).json({
        expense: expenses,
        totalAmount: Yearrecords
      });

  
    } catch (err) {
      console.error('Error fetching expenses by year:', err);
      res.status(500).json({ message: 'Failed to fetch expenses', error: err.message });
    }
  };
  

  const findExpensesByweek = async (req, res) => {
    try {

      const today = new Date();
  
      const currentDayOfWeek = today.getDay();
    
      

      const daysToSubtract = (currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1);  
      const startOfWeek = new Date(today);
      
      startOfWeek.setDate(today.getDate() - daysToSubtract);  
  
      
      const endOfWeek = new Date(startOfWeek);
      
      endOfWeek.setDate(startOfWeek.getDate() + 6);  
   
      const expenses = await expense.aggregate([
        {
          $match: {
            date: {
              $gte: startOfWeek, 
              $lte: endOfWeek   
            }
          }
        }
      ]); 


      
      let Weekrecords = {
        Salary: 0,
        Travelling: 0,
        Hotel: 0,
        Others : 0
      };
  
      // Calculate total amount for each category
      expenses.forEach(expense => {
        expense.categories.forEach(category => {
          if (category === "Salary") {
            Weekrecords.Salary += expense.amount;
          } else if (category === "Travelling") {
            Weekrecords.Travelling += expense.amount;
          } else if (category === "office") {
            Weekrecords.Hotel += expense.amount;
          } else if (category === "more") {
            Weekrecords.Others += expense.amount;
          }
        });
      });
        res.status(201).json({
          sucess: true,
          expense : expenses,
          total : Weekrecords
        })
  
    } catch (err) {
      console.error('Error fetching current week expenses (Monday to Sunday):', err);
      res.status(500).json({ message: 'Error fetching current week expenses', error: err.message });
    }
  };


  const findExpensesByDate = async (req, res) => {
    const { dateparm } = req.params;
  
    try {
  
      const parsedDate = moment.tz(dateparm, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zz)', 'Asia/Karachi')
                              .set({ hour: 12, minute: 0, second: 0, millisecond: 0 });

      const startOfDay = parsedDate.clone().startOf('day').toDate(); // Start of the day (00:00:00)
      const endOfDay = parsedDate.clone().endOf('day').toDate();   // End of the day (23:59:59)
  

      const data = await expense.aggregate([
        {
          $match: {
            date: {
              $gte: startOfDay, 
              $lte: endOfDay   
            }
          }
        }
      ]);

  
      if (data.length === 0) {
        return res.status(404).json({ success: false, message: 'No records found for this date' });
      }
  
      res.status(200).json({
        success: true,
        data: data,
      });
  
    } catch (err) {
      console.error('Error retrieving expenses:', err.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
 
  




  export{findExpensesByMonth,findExpensesByYear,findExpensesByweek,findExpensesByDate}
  
  //  Rashid Khalique (Mern Stack Modification ProjectCategoryDataGet (Cluster0 Database)) 
  // All are Modified of Project CategoryDataGet Folder