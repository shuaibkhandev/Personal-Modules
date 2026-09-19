import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { createPayment } from "../api/payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/PaymentForm";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

function Checkout() {
const [clientSecret, setClientSecret] = useState<string | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [customer, setCustomer] = useState({
  name: "",
  email: "",
  address: "",
  city: "",
});


  const cartItems = useAppSelector(
    (state) => state.cart.items
  );

  const total = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

    const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!customer.name || !customer.email || !customer.address || !customer.city) {
      setError("Please complete all customer fields.");
      return;
    }

    try {
          setLoading(true);
          setError(null);

          const amount = Math.round(total * 100);

    const result = await createPayment({
  customer,
  items: cartItems,
  amount,
  currency: "usd",
});
          setClientSecret(result.data.clientSecret);


    } catch (error) {
      console.error("Payment failed:", error);
      setError(error instanceof Error ? error.message : "Unable to create payment.");
    } finally {
    setLoading(false);
  }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-8 text-3xl font-bold text-slate-900">
          Mock Checkout
        </h1>

        <div className="grid gap-8 md:grid-cols-2">

          {/* Customer Information */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold">
              Customer Information
            </h2>

            <div className="space-y-4">

          <input
  type="text"
  placeholder="Full Name"
  value={customer.name}
  onChange={(e) =>
    setCustomer({
      ...customer,
      name: e.target.value,
    })
  }
  className="w-full rounded-lg border p-3"
/>

        <input
  type="email"
  placeholder="Email"
  value={customer.email}
  onChange={(e) =>
    setCustomer({
      ...customer,
      email: e.target.value,
    })
  }
  className="w-full rounded-lg border p-3"
/>

            <input
  type="text"
  placeholder="Address"
  value={customer.address}
  onChange={(e) =>
    setCustomer({
      ...customer,
      address: e.target.value,
    })
  }
  className="w-full rounded-lg border p-3"
/>
<input
  type="text"
  placeholder="City"
  value={customer.city}
  onChange={(e) =>
    setCustomer({
      ...customer,
      city: e.target.value,
    })
  }
  className="w-full rounded-lg border p-3"
/>
          {clientSecret ? (
  <Elements
    stripe={stripePromise}
    options={{
      clientSecret,
    }}
  >
    <PaymentForm />
  </Elements>
) : (
  <>
    {error && (
      <p className="text-sm text-red-600" role="alert">
        {error}
      </p>
    )}
    <button
      type="button"
      onClick={handlePlaceOrder}
      disabled={loading}
      className="w-full rounded-lg bg-slate-900 py-3 font-semibold text-white"
    >
      {loading ? "Creating Payment..." : "Continue to Payment"}
    </button>
  </>
)}

            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-bold">
              Order Summary
            </h2>

            <div className="space-y-4">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-3"
                >
                  <div>
                    <p className="font-semibold">
                      {item.title}
                    </p>

                    <p className="text-sm text-slate-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

            </div>

            <div className="mt-6 flex justify-between border-t pt-5 text-xl font-bold">
              <span>Total</span>

              <span>
                ${total.toFixed(2)}
              </span>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}

export default Checkout;