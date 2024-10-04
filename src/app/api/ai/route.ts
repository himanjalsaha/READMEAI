import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json(); // Only expecting prompt

    // Validate required field
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required.' },
        { status: 400 }
      );
    }

    // Send the prompt to the Groq API
  
    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.1-70b-versatile',
        temperature: 0.4, // Further reduced temperature for more consistent output
        max_tokens: 2048, // Increased max tokens to allow for more complex responses
        top_p: 1,
        stream: false,
      });

    const readmeContent = chatCompletion.choices[0].message.content;

    // Return the generated README.md content
    return NextResponse.json({ readme: readmeContent });
  } catch (error) {
    console.error('Error generating README:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'This endpoint does not support GET requests.' }, { status: 405 });
}
