# Next.js Shopify Webhook Integration

## Project Setup

### Next.js Application
- Set up a Next.js application deployed on Vercel.

### Tailwind CSS
- Integrate Tailwind CSS for styling to create a modern, responsive UI.

## Shopify Webhook Configuration

### Create Webhook
1. In Shopify admin, navigate to **Settings** -> **Notifications** -> **Webhooks**.
2. Create a new webhook for the "Order creation" event pointing to your Next.js API endpoint (`https://your-vercel-domain/api/webhooks`).

## Next.js API Route

### Webhook Handler
- Create an API route in Next.js (`app/api/webhooks/route.ts`) to handle incoming webhooks. This route:
  - Verifies the HMAC signature.
  - Processes the order data.
  - Stores the order data in an in-memory array.

## Data Fetching and Display

### Fetch Orders
- On the Next.js homepage (`pages/index.tsx`), fetch the stored order data from the API.

### Display Orders
- Use Tailwind CSS to create an attractive, responsive UI that displays the order details.

## Testing and Verification

### Send Test Webhook
- Use the Shopify admin to send a test webhook to your Next.js API endpoint.

### Verify Data Display
- Ensure the order details appear on the Next.js homepage, confirming that the webhook was successfully processed and the data was correctly fetched and displayed.

---

This README provides a clear and structured overview of the project flow, making it easy for others to understand the setup and functionality of your Next.js application integrated with Shopify webhooks.
