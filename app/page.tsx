"use client";
import { useEffect, useState } from 'react';

interface Customer {
  first_name: string;
  last_name: string;
}

interface Order {
  id: string;
  customer: Customer;
  total_price: string;
}

export default function Home() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch('/api/webhooks');
      const data: Order[] = await response.json();
      setOrders(data);
    }

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">Order Details</h1>
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-6">
              <div className="text-xl font-semibold text-gray-800 mb-4">Order ID: {order.id}</div>
              <div className="text-lg text-gray-600">
                <p><span className="font-medium">Customer:</span> {order.customer.first_name} {order.customer.last_name}</p>
                <p><span className="font-medium">Total Price:</span> {order.total_price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
