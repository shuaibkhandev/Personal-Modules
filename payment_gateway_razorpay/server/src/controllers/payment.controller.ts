import type { Request, Response } from "express";
import { createPaymentService } from "../services/payment.service";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { amount, currency } = req.body;

    const payment = await createPaymentService(amount, currency);

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }

  res.json({
    success: true,
    message: "Payment created successfully",
    data: req.body,
  });
};
