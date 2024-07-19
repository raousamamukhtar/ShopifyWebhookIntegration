// app/api/webhooks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { Order } from '../../../lib/types';

const SHOPIFY_SECRET = 'e975f20f5d42dbbabd0ecf273d62480f0e0f339e4459964b444f82331ac565bb';

function verifyHmac(header: string, body: string) {
  const digest = crypto
    .createHmac('sha256', SHOPIFY_SECRET)
    .update(Buffer.from(body, 'utf8'))
    .digest('base64');
  console.log(`Calculated HMAC: ${digest}`);
  console.log(`Header HMAC: ${header}`);
  return digest === header;
}

// Simple in-memory store
let orderData: Order[] = [];

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., use Gmail service
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

async function sendCompletionEmail(email: string) {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Order Completed - Please Give Your Review',
    text: 'Your order has been completed. Please give your review on this link: [review link]'
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    console.log('Webhook received with raw body:', rawBody);

    const hmacHeader = request.headers.get('x-shopify-hmac-sha256');
    console.log(`HMAC Header: ${hmacHeader}`);

    if (!hmacHeader) {
      console.log('HMAC header missing.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!verifyHmac(hmacHeader, rawBody)) {
      console.log('Unauthorized: HMAC verification failed.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = JSON.parse(rawBody);
    const order: Order = body;
    orderData.push(order);

    console.log('Order received and stored:', order);

    // Check if the order status is completed
    if (order.status === 'completed') {
      await sendCompletionEmail(order.customer.email);
    }

    return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(orderData);
}
