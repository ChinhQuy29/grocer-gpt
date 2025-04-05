import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { prompt } = body;

        // Validate required fields
        if (!prompt) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });

        return NextResponse.json(response.text, { status: 200 });
    } catch (error) {
        console.error("Error generating response:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
