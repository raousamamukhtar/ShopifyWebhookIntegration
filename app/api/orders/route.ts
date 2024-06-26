// app/api/orders/route.ts
import { NextResponse } from 'next/server';
import { Order } from '../../../lib/types';

// Reuse the same in-memory store
let orderData: Order[] = [];

export async function GET() {
  console.log('Fetching orders:', orderData);
  return NextResponse.json(orderData);
}
