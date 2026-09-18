import express from "express"
import paymentRoutes from "./routes/payment.routes";
import cors from "cors"
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);


app.get("/", (req, res) => {
  res.json({
    message: "Payment Gateway Server is running",
  });
});

app.use("/api/orders", paymentRoutes);

export default app;