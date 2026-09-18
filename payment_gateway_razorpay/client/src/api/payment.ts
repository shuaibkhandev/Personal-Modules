export const createPayment = async (
  amount: number,
  currency: string
) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create payment");
  }

  return response.json();
};