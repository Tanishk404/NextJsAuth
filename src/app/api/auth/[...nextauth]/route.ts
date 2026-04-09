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


interface SessionType {
    name: string | undefined;
    email: string | undefined;
    password: string | undefined;
    id: string | undefined;
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

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image
}
            }
        })
    ],

    callbacks:{
        async signIn({user, account}) {
            if(account?.provider === 'google'){
                await ConnectionDB()

                const existingUser = await UserModel.findOne({email: user.email})


                if(!existingUser) {
                   const newUser = await UserModel.create({
                        email: user.email,
                        name: user.name,
                        image: user?.image
                    })
                    user.id = newUser._id.toString()
                }else{
                user.id = existingUser._id.toString()
                }
            }
            return true
        },

        async jwt({token, user, trigger, session}){
            if(user){
                token.id=user.id
            token.name=user.name
            token.email=user.email
            token.image=user.image
            }  
        if(trigger === "update"){
        token.name = session?.name
        token.image = session?.image
    }
            return token
        },

        async session({session, token}:  any){
            console.log(session)
            if(session.user){
                session.user.id = token.id as string
                session.user.name=token.name
                session.user.email=token.email
                session.user.image=token.image as string
            }
            return session
        }
    },

    pages: {
        signIn : "/login"
    },

    session: {
        strategy: "jwt",
        maxAge: 7*24*60*60
    },


    secret: process.env.NEXTAUTH_SECRET 
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}