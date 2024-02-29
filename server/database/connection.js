import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default connect;
