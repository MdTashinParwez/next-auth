import {connectDB} from "@/app/dbConfig/dbConfig";
import User from '@/models/userModel'
import { request } from "https";
import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest} from "next/server";
import { sendEmail } from "@/app/helpers/mailer";
import jwt from "jsonwebtoken"

connectDB();

export async function POST(request: NextRequest) {
    try {
         const response = NextResponse.json({
            message: "Logged Out successfully",
            success: true
         })

            response.cookies.set("token", "",{
               httpOnly: true,
               expires: new Date(0)
            })

            return response;

    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
        
    }
}