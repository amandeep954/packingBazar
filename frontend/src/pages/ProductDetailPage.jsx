import { useParams, useNavigate } from "react-router-dom";
import { getById, products } from "../data/products";
import { useCart } from "../context/CartContext";
import Badge from "../components/ui/Badge";
import StarRating from "../components/ui/StarRating";
import ProductCard from "../components/ui/ProductCard";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import { ShoppingCart, ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";

const catColors = {
  BOPP: "from-green-50 to-emerald-100",
  PET: "from-blue-50 to-sky-100",
  CPP: "from-orange-50 to-amber-100",
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = getById(id);
  const [added, setAdded] = useState(false);

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-syne font-black text-2xl text-ink mb-3">
            Product Not Found
          </h2>
          <button
            onClick={() => navigate("/products")}
            className="text-accent underline"
          >
            ← Back to Products
          </button>
        </div>
      </div>
    );

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const grad = catColors[product.category] || "from-gray-50 to-gray-100";

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-ink3 hover:text-accent mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <div
            className={`bg-gradient-to-br ${grad} rounded-3xl h-80 md:h-full min-h-[320px] flex items-center justify-center relative`}
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <Badge tag={product.tag} />
            </div>
          </div>
          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {product.category} · {product.subcategory}
                </span>
                <Badge tag={product.tag} />
              </div>
              <h1 className="font-syne font-black text-3xl md:text-4xl text-ink mb-3">
                {product.name}
              </h1>
              <StarRating rating={product.rating} reviews={product.reviews} />
              <p className="text-ink2 leading-relaxed my-5">
                {product.description}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  ["Thickness", product.thickness],
                  ["Width", product.width],
                  ["Min. Order", product.minOrder + " kg"],
                  ["In Stock", product.stock + " kg"],
                ].map(([l, v]) => (
                  <div key={l} className="bg-surface rounded-xl px-4 py-3">
                    <div className="text-xs text-ink3 mb-0.5">{l}</div>
                    <div className="font-semibold text-sm text-ink">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mb-5">
                <div className="text-xs text-ink3 mb-2 font-medium">
                  Applications
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((a) => (
                    <span
                      key={a}
                      className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-black/[0.07] pt-5">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-syne font-black text-4xl text-accent">
                  ₹{product.price}
                </span>
                <span className="text-ink3 text-sm">
                  / {product.unit} (Min {product.minOrder} kg)
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${added ? "bg-green-600 text-white" : "bg-accent text-white hover:bg-orange-700"}`}
                >
                  {added ? (
                    <>
                      <CheckCircle size={18} /> Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} /> Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="px-5 py-3.5 rounded-xl border border-black/15 text-sm font-medium text-ink hover:bg-surface transition-colors"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-syne font-black text-2xl text-ink mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
      <WhyChooseUs />
    </>
  );
}
