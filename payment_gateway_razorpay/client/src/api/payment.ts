export const createPayment = async (data: {
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
  };

  items: {
    id: number;
    title: string;
    price: number;
    quantity: number;
  }[];

  amount: number;
  currency: string;
}) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/orders`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        customer: data.customer,

        items: data.items.map((item) => ({
          productId: String(item.id),
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),

        amount: data.amount,
        currency: data.currency,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message ?? "Failed to create payment");
  }

  return response.json();
};