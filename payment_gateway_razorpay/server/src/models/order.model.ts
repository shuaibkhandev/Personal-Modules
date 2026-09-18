import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      required: true,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },

    paymentId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);