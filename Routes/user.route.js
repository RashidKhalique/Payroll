import Signup from "../Controllers/Signup.js";
import login from "../Controllers/login.js";
import express from "express";

const Router = express.Router();
Router.post('/login', login);
Router.post('/signup', Signup);
export default Router;
