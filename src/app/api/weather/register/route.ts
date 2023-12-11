import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongo";
import User from "../../../../../models/user";
const bcrypt = require("bcrypt");

export async function POST(req: any)
{
    try
    {
        const { email, password } = await req.json();
        const hashedPasword = await bcrypt.hash(password, 10);

        // console.log("WE did it");
        await connectMongoDB();
        await User.create({ email, password: hashedPasword });
        return NextResponse.json({message: "User Registered!"}, {status: 201} );
    }
    catch(error)
    {
        return NextResponse.json({message: "Error occured while registering the user."}, {status: 500});
    }
}