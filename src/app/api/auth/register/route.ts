import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { UserModel } from "@/models/User";
import { ConnectionDB } from "@/lib/Db";



interface User {
    name: string
    email: string
    password: string
    image?: string
}

export async function POST(request:NextRequest){
    try {
        await ConnectionDB()
        const data:User = await request.json()

        const {name, email, password} = data;

        const hashpassword = await bcrypt.hash(data.password, 10)

        const userExisted = await UserModel.findOne({email})

        if(!userExisted) {
            await UserModel.create({
                name,
                email,
                password: hashpassword
            })

            return NextResponse.json({
                status:202,
                message: 'User registered sucessfully !'
            })
        }else{
            return NextResponse.json({
                status: 500,
                message: 'this email id already registered'
            })
        }

        
    } catch (error) {
    return NextResponse.json(
        {
            message: "Someting went wrong"
        },
        {
            status: 500
        }
    )
    }

}