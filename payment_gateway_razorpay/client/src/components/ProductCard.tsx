import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import type { Product } from "../types/product";

function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const stockLabel =
    product.stock === 0
      ? "Out of stock"
      : product.stock <= 10
        ? `Only ${product.stock} left`
        : "In stock";

  const stockClass =
    product.stock === 0
      ? "bg-red-50 text-red-700"
      : product.stock <= 10
        ? "bg-amber-50 text-amber-700"
        : "bg-emerald-50 text-emerald-700";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          src={product.image}
          alt={product.title}
        />

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${stockClass}`}
        >
          {stockLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-600">
          {product.category}
        </p>

        <h2 className="text-lg font-bold text-slate-900">{product.title}</h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {product.description}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm">
          <span
            className="text-base text-amber-400"
            aria-label={`${product.rating} out of 5 stars`}
          >
            ★
          </span>

          <span className="font-semibold text-slate-700">{product.rating}</span>
          <span className="text-slate-400">/ 5</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <p className="text-2xl font-extrabold tracking-tight text-slate-950">
            ${product.price.toFixed(2)}
          </p>

          <button
            onClick={handleAddToCart}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600"
            type="button"
            disabled={product.stock === 0}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
