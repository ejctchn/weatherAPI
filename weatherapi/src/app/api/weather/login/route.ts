import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongo";
import User from "../../../../../models/user";

const bcrypt = require("bcrypt");

export async function POST(req: any)
{
    try 
    {
        await connectMongoDB();
        const { email } = await req.json();
        const user = await User.findOne({email}).select("email");
        console.log("user: ", user);
        
        return NextResponse.json({ user });
    } 
    catch (error) 
    {
        console.log(error);
    }
}