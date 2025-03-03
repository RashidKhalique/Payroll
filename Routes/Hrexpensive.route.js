import express from "express";
import categoriespost from "../Controllers/categorydatapost.js";
import {findExpensesByDate, findExpensesByMonth,findExpensesByYear,findExpensesByweek} from "../Controllers/categorydataget.js"
import verifyToken from "../Middlewear/auth.middlewear.js"
const Router = express.Router();


Router.post('/hr-expensive/category',verifyToken,categoriespost.categoriespost)
Router.get('/hr-expensive/category/year/:id',verifyToken,findExpensesByYear)
Router.get('/hr-expensive/category/month/:year/:month', verifyToken,findExpensesByMonth);
Router.get('/hr-expensive/category/date/:dateparm', verifyToken,findExpensesByDate);
Router.get('/hr-expensive/category/week',verifyToken,findExpensesByweek)
Router.put('/hr-expensive/updatecategory/:id',verifyToken,categoriespost.updateExpense)
Router.delete('/hr-expensive/deletecategory/:id',verifyToken,categoriespost.DeleteExpense)

export default Router;



