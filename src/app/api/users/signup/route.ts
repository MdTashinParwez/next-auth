import {connectDB} from "@/app/dbConfig/dbConfig";
import User from '@/models/userModel'
import { request } from "https";
import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest} from "next/server";
import { sendEmail } from "@/app/helpers/mailer";

connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username,email,password} = reqBody


        //validation 
        console.log(reqBody);
        
        const user = await User.findOne({email});
        
        if(user){
        return NextResponse.json({message:'User already exists'}, {status: 400});
        }


       const salt = await bcryptjs.genSalt(10);
       const hashedPassword = await bcryptjs.hash(password, salt);// Store hash in your password DB 

       const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log("User saved:", savedUser);

        // verification email

        await sendEmail({email,emailType:"VERIFY", userId: savedUser._id});

        return NextResponse.json({message: 'User created successfully. Please check your email to verify your account.',
        success: true,
        savedUser,

        }, {status: 201});


    } catch (error: any) {
        
        return NextResponse.json({message: error.message}, {status: 500});

    }

}