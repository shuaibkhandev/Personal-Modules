import { stripe } from "../config/stripe.js";
import { Order } from "../models/order.model.js";
import { Payment } from "../models/payment.model.js";

export const createPaymentService = async (
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
  },
  items: {
    productId: string;
    title: string;
    price: number;
    quantity: number;
  }[],
  amount: number,
  currency: string
) => {
  // 1. Create order in MongoDB
  const order = await Order.create({
    customer,
    items,
    amount,
    currency,
    status: "created",
  });

  // 2. Create PaymentIntent in Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: currency.toLowerCase(),
    receipt_email: customer.email,
  });

  // 3. Save Stripe payment information in MongoDB
  const payment = await Payment.create({
    orderId: order._id,
    stripePaymentIntentId: paymentIntent.id,
    amount,
    currency: currency.toLowerCase(),
    status: paymentIntent.status,
  });

  // 4. Send required data back to frontend
  return {
    order,
    payment,
    clientSecret: paymentIntent.client_secret,
  };
};