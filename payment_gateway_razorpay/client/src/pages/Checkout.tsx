import { useAppSelector } from "../app/hooks";

function Checkout() {
  const cartItems = useAppSelector(
    (state) => state.cart.items
  );

  const total = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
                className="w-full rounded-lg border p-3"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border p-3"
              />

              <input
                type="text"
                placeholder="Address"
                className="w-full rounded-lg border p-3"
              />

              <input
                type="text"
                placeholder="City"
                className="w-full rounded-lg border p-3"
              />

              <button
                type="button"
                className="w-full rounded-lg bg-slate-900 py-3 font-semibold text-white hover:bg-sky-600"
              >
                Place Order
              </button>

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