

import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import ecomRouter from './routes/ecomRoutes.js';
import productRouter from './routes/productRoutes.js';
import cookieParser from 'cookie-parser';

// CORS Options Configuration
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Fix the typo here
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const PORT = process.env.PORT || 8000;
const app = express();

// Middleware
app.use(cors(corsOptions)); // Corrected CORS setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use('/api', ecomRouter);
app.use('/api/product', productRouter);

// MongoDB Connection and Server Start
try {
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.au3my.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(PORT, () => console.log(`SERVER STARTED AT PORT ${PORT}`));
  })
  .catch((err) => console.log('MongoDB Connection Error: ', err));
} catch (err) {
  console.log('Server Error: ', err);
}


app.use((err, req,res,next)=>{
  console.log(err.message);
  res.status(500).json({error : "Internal Server Error"});
  
})
