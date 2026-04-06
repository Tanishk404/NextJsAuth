import NextAuth from 'next-auth'
import CredentialsProvider  from 'next-auth/providers/credentials'
import { ConnectionDB } from '../../../../lib/Db'
import { UserModel } from '@/models/User'
import bcrypt from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'
import Google from 'next-auth/providers/google'



interface creden {
    email: string
    password:  string
}

export const authOptions:NextAuthOptions = {
    providers:[
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SCERET!
        }),
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

    callbacks:{
        async signIn({user, account}) {
            if(account?.provider === 'google'){
                await ConnectionDB()

                const existingUser = await UserModel.findOne({email: user.email})


                if(!existingUser) {
                    await UserModel.create({
                        email: user.email,
                        name: user.name,
                        image: user?.image
                    })
                }
            }
            return true
        }
    },

    pages: {
        signIn : "/login"
    },

    session: {
        strategy: "jwt",
    },


    secret: process.env.NEXTAUTH_SECRET 
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}