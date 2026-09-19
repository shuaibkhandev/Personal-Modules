import { FormEvent, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:5173/payment-success",
        },
      });

      if (error) {
        setMessage(error.message ?? "Payment failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <PaymentElement />

      {message && (
        <p className="text-sm text-red-600">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full rounded-lg bg-slate-900 py-3 font-semibold text-white"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

    </form>
  );
}

export default PaymentForm;