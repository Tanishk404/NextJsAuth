import { ConnectionDB } from "@/lib/Db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { UserModel } from "@/models/User";
import { CloudinaryConn } from "@/lib/Cloudinary";


interface SessionType {
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;
    id: string | undefined;
}

export async function GET(Request:NextRequest){
    try {
        await ConnectionDB()
        const userdata = await getServerSession(authOptions)
        const data = userdata?.user as SessionType
        const userExist = await UserModel.findOne({_id: data?.id})

        if(userExist){
            console.log('User hai bhai:', userExist)
            return NextResponse.json(
            {
                msg: 'Edit page',
                userExist
            }
        )
        
        }

        return(
            NextResponse.json(
            {
                msg: 'Edit page',
                body: userdata
            }
        )
        )

    } catch (error) {
            return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
    )
    }
}

export async function PUT(Request:NextRequest){
    try {
        await ConnectionDB()
        const formdata = await Request.formData()
        const name = formdata.get('name') as string
        const image = formdata?.get('image') as Blob 
        const userdata = await getServerSession(authOptions)
        const data = userdata?.user as SessionType
        
        let image_Url;
        let updateData:any = {}
        if(image){
            const upload =  await CloudinaryConn(image) as any
            image_Url = upload?.secure_url
        }

        if(name) {
                updateData.name = name
            }

        if(image_Url){
            updateData.image = image_Url
            }
        const userCheck = await UserModel.findByIdAndUpdate(data?.id,
        updateData
            , {new: true})
        
        

        console.log("CHECK USER HAI: ", userCheck)

        if(!userCheck){
                 return NextResponse.json(
                {message:"user not found"},
                {status:400}
            )
        }
        
        
        return NextResponse.json({
            userCheck,
            msg:"all good"
        })

    } catch (error) {
         return NextResponse.json(
                {message:`edit error ${error}`},
                {status:500}
            )
        console.log("server error", error)
    }
}