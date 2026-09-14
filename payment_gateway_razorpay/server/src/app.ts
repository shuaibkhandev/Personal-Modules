import express from "express"
import paymentRoutes from "./routes/payment.routes";

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    message: "Payment Gateway Server is running",
  });
});

app.use("/api/payments", paymentRoutes);

export default app;