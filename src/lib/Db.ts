import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODB_URI as string;

if (!MONGO_URL) {
  throw new Error("Please define MONGODB_URI");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function ConnectionDB() {

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;

  console.log("Connection success 🟢");

  return cached.conn;
}