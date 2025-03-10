import express from 'express';
import { errorHandler } from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config({})
const app = express();



app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials: true,  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization', 'AuthorizationRef']  
}));


app.use(cookieParser());
app.use(express.json({ limit: "16kb" })); 
app.use(express.urlencoded({ extended: true, limit: "16kb" }));  



    
     
    
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});
    
    
  
import itemRouter from './Routes/item.routes.js'

app.use('/api/v1/item', itemRouter);



app.use(errorHandler);




    
  

export default app;










