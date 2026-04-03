import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getTopSelling } from "../../data/products";
import { TrendingUp } from "lucide-react";
const catColors = {
  BOPP: "bg-green-100 text-green-800",
  PET: "bg-blue-100 text-blue-800",
  CPP: "bg-orange-100 text-orange-800",
};
export default function TopSelling() {
  const navigate = useNavigate();
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-accent">
              Most Popular
            </span>
            <h2 className="font-syne font-black text-3xl text-ink mt-1">
              Top Selling Products
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-medium text-accent hover:underline flex items-center gap-1"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {getTopSelling().map((p, i) => (
            <div
              key={p.id}
              onClick={() => navigate(`/products/${p.id}`)}
              className="bg-surface rounded-2xl border border-black/[0.07] p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all"
            >
              <span className="font-syne font-black text-3xl text-accent/20 min-w-[2rem]">
                0{i + 1}
              </span>
              <div
                className="w-10 h-10 rounded-xl flex-shrink-0"
                style={{ background: p.color }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm text-ink truncate">
                  {p.name}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${catColors[p.category]}`}
                  >
                    {p.category}
                  </span>
                  <span className="text-xs text-ink3 flex items-center gap-0.5">
                    <TrendingUp size={10} />
                    {p.reviews} reviews
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
