import express from "express";
import authroute from "./Routes/user.route.js";
import cors from "cors";
import dbConnect from "./DbConnect/dbConnect.js";
import hrexpensiveroute from "./Routes/Hrexpensive.route.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

// Use CORS middleware once
app.use(cors({
    origin: "*",   
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
}));

dbConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define routes
app.use('/api', authroute);
app.use('/api', hrexpensiveroute);


app.post('*',(req,res)=>{
    res.status(400).json({ message: "Root Route not found" });
})

app.get('*', (req, res) => {
    res.status(404).json({
        message: "404 Route not Found"
    });
  });

// Test route
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: "Root Route Works in serious" });
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
