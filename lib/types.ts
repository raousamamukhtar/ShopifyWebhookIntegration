// types.ts

export interface Customer {
    first_name: string;
    last_name: string;
  }
  
  export interface Order {
    id: string;
    customer: Customer;
    total_price: string;
  }
  