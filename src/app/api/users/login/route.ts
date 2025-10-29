import {connectDB} from "@/app/dbConfig/dbConfig";
import User from '@/models/userModel'
import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest} from "next/server";
import { sendEmail } from "@/app/helpers/mailer";
import jwt from "jsonwebtoken"

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        
        const {username,email,password} = reqBody
        console.log(reqBody);

        const  user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User does not Exits"}, {status: 500});

        }
         console.log("user exits")

         const validPassword = await bcryptjs.compare(password, user.password)
         
        if(!validPassword){
            return NextResponse.json( {error: "Check your password  "}, {status: 500});
        }

        const tokenData  ={
            id:user._id,
            username:user.username,
            email: user.email
        }

         const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn: '1d'})

          const response = NextResponse.json({
            message: "Logged In successfully",
            success: true
         })

         response.cookies.set("token", token,{
            httpOnly: true,

         })
         return response;



    } catch (error:any) {
                return NextResponse.json({message: error.message}, {status: 500});

        
    }
}