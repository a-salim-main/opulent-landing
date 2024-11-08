import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Check if password matches environment variable
    const isValid = password === process.env.FORM_ACCESS_PASSWORD;

    return NextResponse.json({ 
      success: isValid 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Invalid request'
      },
      { status: 400 }
    );
  }
} 