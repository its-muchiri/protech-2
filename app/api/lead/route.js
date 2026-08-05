import { NextResponse } from 'next/server';

const WHATSAPP_NUMBER = '254700000000';
const ADMIN_EMAIL = 'sales@yourdomain.co.ke';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.sendgrid.net';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@yourdomain.co.ke';
const FROM_NAME = process.env.FROM_NAME || 'Kenya Consultancy';

function formatPhone(phone) {
  let cleaned = phone.replace(/[\s\-()]/g, '');
  if (cleaned.startsWith('07') || cleaned.startsWith('01')) {
    cleaned = '+254' + cleaned.slice(1);
  } else if (cleaned.startsWith('254') && !cleaned.startsWith('+254')) {
    cleaned = '+' + cleaned;
  }
  return cleaned;
}

function buildEmailHTML(data) {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #102a43;">New Lead Inquiry from Kenya Consultancy</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 16px 0;">
          <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
          <p><strong>Phone:</strong> ${formatPhone(data.phone || 'N/A')}</p>
          <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
          <p><strong>Service:</strong> ${data.service || 'N/A'}</p>
          <p><strong>Location:</strong> ${data.location || 'N/A'}</p>
          <p><strong>Project Details:</strong> ${data.details || 'N/A'}</p>
          <p><strong>Budget:</strong> ${data.budget || 'Not specified'}</p>
          <p><strong>Page:</strong> ${data.page || 'Unknown'}</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString('en-KE')}</p>
        </div>
        <p style="color: #666; font-size: 14px;">This is an automated notification from Kenya Consultancy lead capture system.</p>
      </body>
    </html>
  `;
}

async function sendEmail(data) {
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: ADMIN_EMAIL }],
            subject: `New Lead: ${data.service || 'General Inquiry'} from ${data.name}`,
          },
        ],
        from: { email: FROM_EMAIL, name: FROM_NAME },
        reply_to: { email: data.email || FROM_EMAIL, name: data.name || 'Lead' },
        content: [
          {
            type: 'text/html',
            value: buildEmailHTML(data),
          },
        ],
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, location, details, budget, page } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone number are required' },
        { status: 400 }
      );
    }

    const leadData = { name, phone, email, service, location, details, budget, page: page || request.headers.get('referer') || 'Direct' };

    const emailSent = await sendEmail(leadData);

    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      emailSent,
    });
  } catch (error) {
    console.error('Lead API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}