import { NextResponse } from "next/server";
import { createPaymentSchema } from "@/lib/validations/payment";
import { connectDB } from "@/lib/db/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = createPaymentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment data",
          errors: result.error.issues,
        },
        {
          status: 400,
        }
      );
    }

    const data = result.data;

    await connectDB();

    console.log("MongoDB connected");
    console.log("Validated payment data:", data);

    return NextResponse.json({
      success: true,
      message: "MongoDB connected successfully",
      data,
    });
  } catch (error) {
    console.error("Payment API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}