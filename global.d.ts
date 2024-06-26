// global.d.ts
import { Order } from './types';

declare global {
  namespace NodeJS {
    interface Global {
      orderData: Order[];
    }
  }
}

export {};
