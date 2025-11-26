import cros from 'cors'
import auth from './controller/Auth.controller'
import admin from './controller/Admin.controller'
import movies from './controller/movie.controller';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { Application } from 'express';
dotenv.config();

const APP:Application = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;


/*** MiddleWare ***/ 
APP.use(express.json())
APP.use(cros({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE',],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

APP.get('/', (req, res) => {
  res.send('Hello, TypeScript + Node.js + Express + Mongo!');
});

APP.use('/api/movie',movies)
APP.use('/api/admin', admin)
APP.use('app/login',auth)




/*** Validate environment variables ***/ 
if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in your .env file');
  process.exit(1);
}

/*** Connect to MongoDB ***/ 
const connectDB = async () => {
    await mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
}


/*** Start the Server ***/ 
const startServer = async () => {
    await connectDB()

     // Start listening for requests
    APP.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
}



startServer()






