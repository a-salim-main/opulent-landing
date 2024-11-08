import { NextResponse } from 'next/server';

// Replace this URL with your actual n8n webhook URL
const WEBHOOK_URL = 'https://opulent.app.n8n.cloud/webhook/add-client';
// or something like: 'https://n8n.yourdomain.com/webhook/xxxxx-xxxxx-xxxxx'

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Sending data to n8n:', data);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Opulent-Form/1.0',
      },
      body: JSON.stringify(data),
    });

    console.log('n8n response status:', response.status);
    const responseText = await response.text();
    console.log('n8n response text:', responseText);
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      console.log('Failed to parse response as JSON:', parseError);
      responseData = responseText;
    }

    if (!response.ok) {
      const errorMessage = typeof responseData === 'object' 
        ? JSON.stringify(responseData) 
        : responseData.toString();
      throw new Error(`n8n webhook error (${response.status}): ${errorMessage}`);
    }

    return NextResponse.json({ 
      success: true, 
      data: responseData 
    });
    
  } catch (error) {
    console.error('API Route Error Details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error
    });

    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
} 