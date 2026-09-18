import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    stripePaymentIntentId: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "requires_payment_method",
        "requires_confirmation",
        "processing",
        "succeeded",
        "canceled",
      ],
      default: "requires_payment_method",
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", paymentSchema);