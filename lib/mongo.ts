// lib/mongodb.ts
import { MongoClient, Db } from "mongodb";
import mongoose, { mongo } from "mongoose";

const uri = process.env.MONGODB_URI as string;
export const connectMongoDB = async () =>
{
  try 
  {
    await mongoose.connect(uri);
    console.log("Connected to DB");
  } 
  catch (error) 
  {
    console.log("Error connecting to MongoDB: ", error);  
  }
}

// let cachedDb: Db | null = null;

// if (!uri) {
//   throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

// async function connectToDatabase() {
//   if (cachedDb) {
//     console.log("Using cached database instance");
//     return cachedDb;
//   }

//   const client = await MongoClient.connect(uri);
//   const db = client.db();

//   console.log("New database instance created!");
//   cachedDb = db;
//   return db;
// }

// export default connectToDatabase;