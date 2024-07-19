// app/api/webhooks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
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

    return NextResponse.json({ message: 'Webhook received' }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(orderData);
}
