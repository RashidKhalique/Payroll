import express from "express";
import authroute from "./Routes/user.route.js";
import cors from "cors";
import dbConnect from "./DbConnect/dbConnect.js";
import  hrexpensiveroute from "./Routes/Hrexpensive.route.js"

import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

dbConnect();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
}));


app.use('/api', authroute);
app.use('/api', hrexpensiveroute);


app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: "Root Route Works Fine " });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
