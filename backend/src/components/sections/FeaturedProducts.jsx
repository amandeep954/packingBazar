import { Link } from "react-router-dom";
import { getFeatured } from "../../data/products";
import ProductCard from "../ui/ProductCard";
export default function FeaturedProducts() {
  return (
    <section className="py-16 px-4 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-accent">Our Range</span>
            <h2 className="font-syne font-black text-3xl text-ink mt-1">Featured Products</h2>
          </div>
          <Link to="/products" className="text-sm font-medium text-accent hover:underline flex items-center gap-1">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {getFeatured().map((p) => <ProductCard key={p.id} product={p}/>)}
        </div>
      </div>
    </section>
  );
}
