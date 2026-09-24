import { z } from "zod";

export const createPaymentSchema = z.object({
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    address: z.string().min(3),
    city: z.string().min(2),
  }),

  items: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),

  amount: z.number().positive(),

  currency: z.string().length(3),
});