import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { text } = await req.json();

  const chat = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a summarizer of text of a blog writer. make the contents short, and to the point. make the summary not too long, and make it concise and more engaging.",
      },
      { role: "user", content: text },
    ],
  });

  return NextResponse.json({ summary: chat.choices[0].message.content });
}
