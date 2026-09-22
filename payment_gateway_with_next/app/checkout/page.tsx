"use client";

import { useState } from "react";

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

export default function CheckoutPage() {
  // -------------------------
  // Customer information
  // -------------------------

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
  });

  // -------------------------
  // Temporary cart
  // -------------------------

  const cartItems: CartItem[] = [
    {
      id: "product-1",
      title: "Laptop",
      price: 800,
      quantity: 1,
    },
    {
      id: "product-2",
      title: "Wireless Mouse",
      price: 50,
      quantity: 2,
    },
  ];

  // -------------------------
  // Calculate total
  // -------------------------

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // -------------------------
  // Handle customer input
  // -------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // -------------------------
  // Handle checkout
  // -------------------------

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const orderData = {
      customer,
      items: cartItems,
      amount: total,
      currency: "usd",
    };

    console.log("Order Data:", orderData);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-3xl font-bold text-slate-900">
          Checkout
        </h1>

        <div className="grid gap-8 md:grid-cols-2">

          {/* ===================== */}
          {/* Customer Information */}
          {/* ===================== */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Customer Information
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={customer.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-slate-900"
                />
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={customer.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-slate-900"
                />
              </div>

              {/* Address */}

              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Address
                </label>

                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter your address"
                  value={customer.address}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-slate-900"
                />
              </div>

              {/* City */}

              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter your city"
                  value={customer.city}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-700"
              >
                Continue
              </button>

            </form>

          </div>

          {/* ===================== */}
          {/* Order Summary */}
          {/* ===================== */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Order Summary
            </h2>

            <div className="space-y-4">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-4"
                >

                  <div>
                    <p className="font-semibold text-slate-900">
                      {item.title}
                    </p>

                    <p className="text-sm text-slate-500">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-slate-900">
                    $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>

                </div>
              ))}

            </div>

            {/* Total */}

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