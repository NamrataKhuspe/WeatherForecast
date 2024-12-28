import { NextResponse } from "next/server";
import User from "../../../models/user"
import { connectMongoDB } from "../../../lib/mongodb"

export async function POST(req) {
    try {
        const { email } = await req.json();
        console.log("email == >", email);
        await connectMongoDB();
        let data = await User.findOne({ email });
        console.log("data == >", data);
    
        if (!data) {
            return NextResponse.json({ message: "User not found"}, { status: 404 });
        }
    
        return NextResponse.json({ message: "User Exist", data : data }, { status: 201 });
    } catch (error) {
        console.error("Error occurred while logging in:", error);
        return NextResponse.json({ message: "Error occurred while logging in", error: error.message }, { status: 500 });
    }
    
}