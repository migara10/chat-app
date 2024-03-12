import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      writeConcern: {
        w: 'majority', // or another valid write concern mode
        j: true,        // specify if you want acknowledgment from the journal
      },
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default connect;
