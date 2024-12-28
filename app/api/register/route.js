import { NextResponse } from "next/server";
import User from "../../../models/user"
import bcrypt from "bcryptjs";
import { connectMongoDB } from "../../../lib/mongodb"

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password,10);

        await connectMongoDB();
        await User.create({name,email,password:hashedPassword});

        return NextResponse.json({ mssage: "User registerd" }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: "Error Occured while registering the user : " , error }, { status: 500 })

    }
}