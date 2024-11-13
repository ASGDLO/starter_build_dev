import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/email';
import { rateLimiter } from '@/utils/rateLimiter';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('remote-addr') || 'unknown';
  const limit = 2; // Allow 2 requests
  const windowMs = 60 * 1000; // 1 minute window
  const blockMs = 5 * 60 * 1000; // Block for 5 minutes

  if (!rateLimiter(ip, limit, windowMs, blockMs)) {
    return NextResponse.json({ message: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const body = await request.json();
  const { fullName, email, phone, message } = body;

  try {
    await sendEmail({
      to: 'hoon337101@gmail.com',
      subject: 'Contact Form Submission',
      html: `
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email.' }, { status: 500 });
  }
}