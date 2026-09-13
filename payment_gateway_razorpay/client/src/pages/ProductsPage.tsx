import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { removeFromCart } from "../features/cart/cartSlice";

function ProductsPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const products = useAppSelector((state) => state.products.items);
  const cartItems = useAppSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [visibleCount, setVisibleCount] = useState(8);
  const visibleProducts = products.slice(0, visibleCount);

  useEffect(() => {
    const handleInfiniteScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;

      if (innerHeight + scrollTop + 1 >= scrollHeight) {
        setVisibleCount((currentCount) => {
          if (currentCount >= products.length) {
            return currentCount;
          }

          return currentCount + 8;
        });
      }
    };

    window.addEventListener("scroll", handleInfiniteScroll);

    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [products.length]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,#e0f2fe,transparent_35%),#f4f7fb] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>

          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-sky-600"
          >
            🛒 Cart ({cartCount})
          </button>
        </header>

        {cartItems.length > 0 && (
          <section className="mb-10 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold text-slate-900">Shopping Cart</h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-16 w-16 rounded-lg object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-500">${item.price.toFixed(2)}</p>
                      <p className="text-sm font-medium text-slate-700">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          aria-label="Product catalogue"
        >
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </main>
  );
}

export default ProductsPage;
