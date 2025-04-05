import { NextResponse, NextRequest } from "next/server";
import { connectToDB } from "@/app/api/lib/dbConnect";
import User from "../models/User";
import { IUser } from "../models/User";

export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const users: IUser[] = await User.find();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}