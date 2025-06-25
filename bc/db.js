const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
  try 
  {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log();
    console.log(`MongoDB done ✨⚡️: ${conn.connection.host}`);
  } 

  catch (error) 
  {
    console.error('------------------------------------------------');
    console.error('Database connection error:', error);
    console.error('------------------------------------------------');

    process.exit(1);
  }
};

module.exports = connectDB;