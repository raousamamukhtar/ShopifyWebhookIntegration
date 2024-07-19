// lib/types.ts
export interface Customer {
  first_name: string;
  last_name: string;
  email: string;
}

export interface Order {
  id: string;
  customer: Customer;
  total_price: string;
  status: string; // Add the status property
}
