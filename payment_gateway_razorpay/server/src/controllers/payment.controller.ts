import type { Request, Response } from "express";

export const createPayment = (req: Request, res: Response) => {
  console.log(req.body);

  res.json({
    success: true,
    message: "Payment created successfully",
    data: req.body,
  });
};
