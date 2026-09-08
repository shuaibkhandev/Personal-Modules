import { useEffect, useState } from 'react'
import './App.css'
import { useAppSelector } from './app/hooks'
import type { Product } from './types/product'

function ProductCard({ product }: { product: Product }) {



  const stockLabel = product.stock === 0
    ? 'Out of stock'
    : product.stock <= 10
      ? `Only ${product.stock} left`
      : 'In stock'
  const stockClass = product.stock === 0
    ? 'bg-red-50 text-red-700'
    : product.stock <= 10
      ? 'bg-amber-50 text-amber-700'
      : 'bg-emerald-50 text-emerald-700'

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          src={product.image}
          alt={product.title}
        />
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${stockClass}`}>
          {stockLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-600">
          {product.category}
        </p>
        <h2 className="text-lg font-bold text-slate-900">{product.title}</h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{product.description}</p>

        <div className="mt-5 flex items-center gap-2 text-sm">
          <span className="text-base text-amber-400" aria-label={`${product.rating} out of 5 stars`}>
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
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
            type="button"
            disabled={product.stock === 0}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}

function App() {
  const products = useAppSelector((state) => state.products.items);

   // Number of products currently visible
  const [visibleCount, setVisibleCount] = useState(8);

    const visibleProducts = products.slice(0, visibleCount);

      useEffect(() => {
    const handleInfiniteScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;

      console.log("Scroll Height:", scrollHeight);
      console.log("Inner Height:", innerHeight);
      console.log("Scroll Top:", scrollTop);

      // User reached the bottom
      if (innerHeight + scrollTop + 1 >= scrollHeight) {
        setVisibleCount((currentCount) => {
          // Don't go beyond total products
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
        <header className="mb-10 flex flex-col gap-4 border-b border-slate-200/80 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Curated collection</p>
            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Products</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-500">
              Thoughtfully selected essentials for work, play, and everything in between.
            </p>
          </div>
          <p className="text-sm font-medium text-slate-500">{products.length} products</p>
        </header>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Product catalogue">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </main>
  )
}

export default App
