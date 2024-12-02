import express from "express";
import role from "../Controllers/role.js"
import categoriespost from "../Controllers/categorydatapost.js";
import {findExpensesByDate, findExpensesByMonth,findExpensesByYear,findExpensesByweek} from "../Controllers/categorydataget.js"

const Router = express.Router();


Router.post('/hr-expensive/category',categoriespost)
Router.get('/hr-expensive/category/year/:id',findExpensesByYear)
Router.get('/hr-expensive/category/month/:year/:month', findExpensesByMonth);
Router.get('/hr-expensive/category/date/:dateparm', findExpensesByDate);
Router.get('/hr-expensive/category/week',findExpensesByweek)
Router.post('/role',role)

export default Router;
