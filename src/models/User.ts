import mongoose from "mongoose";


interface UserSchemaType {
    name: string;
    email: string;
    password: string;
}

const Userschema = new mongoose.Schema<UserSchemaType>({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})  

export const UserModel = mongoose.models.User || mongoose.model<UserSchemaType>('User', Userschema) 