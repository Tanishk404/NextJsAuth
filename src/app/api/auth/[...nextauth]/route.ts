import NextAuth from 'next-auth'
import CredentialsProvider  from 'next-auth/providers/credentials'
import { ConnectionDB } from '../../../../lib/Db'
import { UserModel } from '@/models/User'
import bcrypt from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'



interface creden {
    email: string
    password:  string
}

export const authOptions:NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: "credentials",

            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials): Promise<any>{
                await ConnectionDB()

                const user = await UserModel.findOne({email: credentials?.email})

                if(!user){
                    console.log("User not found")
                    throw new Error("User not found");

                }

                const isPasswordCorrect = await bcrypt.compare(credentials?.password as string, user.password)

                if(!isPasswordCorrect){
                     console.log("❌ Invalid password")
                    throw new Error("Invalid credentials")
                }

                console.log("✅ Login successful")

                return user
            }
        })
    ],

    callbacks:{},

    pages: {
        signIn : "/login"
    },

    session: {
        strategy: "jwt",
    },


    secret: process.env.NEXT_AUTH_SECRET 
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}