import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_DB_URI as string

let isConnected:boolean = false;

export async function ConnectionDB(){
    try {

        if(mongoose.connection.readyState >= 1 || isConnected){
            return;
        }

        if(!MONGO_URL){
            throw new Error("Please define the MONGO_URL environment variable")
        }   


        await mongoose.connect(MONGO_URL);

        isConnected = true

        console.log("Connection sucess🟢")
        return mongoose
        
    } catch (error) {

        console.log("Connection faild with DataBase🔴 :", error)
        
    }
}

