import { NextResponse } from "next/server";
import User from "../../../models/user"
import { connectMongoDB } from "../../../lib/mongodb"

export async function POST(req) {
    try {
        const { email } = await req.json();
       
        await connectMongoDB();
        const user = await User.findOne({email}).select("_id");
        console.log("user -- > ", user);

        if(user){
            return NextResponse.json({data:user , message: "User is Already Exists"}, { status: 409 })
        }
        else{
            return NextResponse.json({user})
        }


    } catch (error) {
        return NextResponse.json({ message: "Error Occured while registering the user : " , error }, { status: 500 })

    }
}