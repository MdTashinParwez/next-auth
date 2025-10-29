import {connectDB} from "@/app/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextResponse, NextRequest} from "next/server";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";

connectDB();

export async function POST(request: NextRequest) {
    /// data extarction 
     const userId = await getDataFromToken(request)
      const user = await User.findOne({_id:userId}).select("-password");
      // check if user exists
      if (!user) {
        return NextResponse.json({
          message: "User not found",
          success: false
        })
      }
      return NextResponse.json({
        message: "User data fetched successfully",
        success: true,
        data : user
      })
    
}