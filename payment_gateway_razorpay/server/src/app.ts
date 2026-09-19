import express from "express"
import paymentRoutes from "./routes/payment.routes";
import webhookRoutes from "./routes/webhook.routes.js";
import cors from "cors"
const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
  })
);




// Stripe webhook MUST come before express.json()
app.use(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  webhookRoutes
);

// Normal APIs
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    message: "Payment Gateway Server is running",
  });
});

app.use("/api/orders", paymentRoutes);

export default app;