import { NextResponse } from 'next/server';

const WHATSAPP_NUMBER = '254725310112';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || 'Hello, I am interested in your services.';
  const encodedText = encodeURIComponent(text);

  return NextResponse.redirect(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`,
    { status: 302 }
  );
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, phone, service, location, name } = body;

    const whatsappMessage = `Hello, I am ${name || 'a visitor'} interested in ${service || 'your services'} in ${location || 'Kenya'}. ${message || ''}`;
    const encodedText = encodeURIComponent(whatsappMessage);

    return NextResponse.json({
      url: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`,
      message: whatsappMessage,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}