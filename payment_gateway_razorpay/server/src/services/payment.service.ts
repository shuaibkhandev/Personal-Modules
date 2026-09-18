import { stripe } from "../config/stripe.js";
import { Order } from "../models/order.model.js";
import { Payment } from "../models/payment.model.js";


export const createPaymentService = async (amount:number, currency:string) => {

    const order = await Order.create({
    amount,
    currency,
    status: "created",
  });

 const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: currency.toLowerCase(),
  });

    const payment = await Payment.create({
    orderId: order._id,
    stripePaymentIntentId: paymentIntent.id,
    amount,
    currency: currency.toLowerCase(),
    status: paymentIntent.status,
  });


    return {
    order,
    payment,
    clientSecret: paymentIntent.client_secret,
  };

}