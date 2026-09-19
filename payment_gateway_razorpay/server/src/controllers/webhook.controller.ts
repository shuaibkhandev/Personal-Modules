import type { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../config/stripe.js";
import { Payment } from "../models/payment.model.js";
import { Order } from "../models/order.model.js";

export const stripeWebhook = async (
  req: Request,
  res: Response
) => {
    console.log("WEBHOOK CALLED!!!!!!!!")
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    return res.status(400).send("Missing Stripe signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);

    return res.status(400).send("Invalid webhook signature");
  }

  try {
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;

      console.log(
        "Payment succeeded:",
        paymentIntent.id
      );

      // Update Payment
      const payment = await Payment.findOneAndUpdate(
        {
          stripePaymentIntentId: paymentIntent.id,
        },
        {
          status: "succeeded",
        },
        {
        returnDocument: "after"
        }
      );

      if (payment) {
        // Update related Order
        await Order.findByIdAndUpdate(
          payment.orderId,
          {
            status: "paid",
          }
        );
      }
    }

    return res.json({
      received: true,
    });
  } catch (error) {
    console.error("Webhook processing failed:", error);

    return res.status(500).json({
      success: false,
      message: "Webhook processing failed",
    });
  }
};