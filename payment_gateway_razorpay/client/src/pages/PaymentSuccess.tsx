function PaymentSuccess() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-5xl">✓</div>

        <h1 className="mb-3 text-2xl font-bold text-slate-900">
          Payment Successful
        </h1>

        <p className="mb-6 text-slate-500">
          Your payment has been successfully processed.
        </p>

        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="w-full rounded-lg bg-slate-900 py-3 font-semibold text-white hover:bg-sky-600"
        >
          Continue Shopping
        </button>
      </div>
    </main>
  );
}

export default PaymentSuccess;