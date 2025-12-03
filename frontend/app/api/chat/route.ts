import { NextResponse } from "next/server";
import OpenAI from "openai";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const DEFAULT_MODEL = process.env.OPENAI_ASSISTANT_MODEL ?? "gpt-4o-mini";

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error: "OPENAI_API_KEY ontbreekt. Voeg deze toe aan je omgeving.",
      },
      { status: 500 }
    );
  }

  try {
    const { messages }: { messages?: ChatMessage[] } = await request.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "Geen berichten ontvangen om te verwerken." },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const assistantReply = response.choices[0]?.message?.content?.trim();

    if (!assistantReply) {
      return NextResponse.json(
        {
          error: "Het model gaf geen tekstuele output terug.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: assistantReply });
  } catch (error) {
    console.error("OpenAI chat error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Onbekende fout bij ophalen van AI-antwoord.",
      },
      { status: 500 }
    );
  }
}
