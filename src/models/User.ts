import mongoose from "mongoose";


interface UserSchemaType {
    id: string;
    name: string;
    image: string;
    email: string;
    password: string;
}

const Userschema = new mongoose.Schema<UserSchemaType>({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
        select: false
    }
})  

export const UserModel = mongoose.models.User || mongoose.model<UserSchemaType>('User', Userschema) 