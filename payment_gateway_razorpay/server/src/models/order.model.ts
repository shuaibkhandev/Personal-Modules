import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    customer: {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      address: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },
    },

    items: [
      {
        productId: {
          type: String,
          required: true,
        },

        title: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      required: true,
      default: "USD",
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