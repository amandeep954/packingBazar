import { useState, useMemo, useEffect } from "react"; // useEffect add kiya takki filter hone par page reset ho ske
import { products, categories } from "../data/products";
import ProductCard from "../components/ui/ProductCard";
import TrendingProducts from "../components/sections/TrendingProducts";
import TopSelling from "../components/sections/TopSelling";
import ReviewSection from "../components/sections/ReviewSection";
import { Search, ChevronLeft, ChevronRight } from "lucide-react"; // Icons add kiye

export default function ProductsPage() {
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filtered = useMemo(() => {
    let list =
      cat === "All" ? products : products.filter((p) => p.category === cat);
    if (query)
      list = list.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      );
    if (sort === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, query, sort]);

  // Agar user filter badalta hai, toh page 1 par wapas le jao
  useEffect(() => {
    setCurrentPage(1);
  }, [cat, query, sort]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filtered.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <>
      {/* Header */}
      <div className="bg-ink py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-semibold tracking-[3px] uppercase text-accent">
            Our Catalogue
          </span>
          <h1 className="font-syne font-black text-4xl text-white mt-2 mb-1">
            All Products
          </h1>
          <p className="text-white/50 text-sm">
            60 premium packaging films across BOPP, PET, CPP & LAMINATED
          </p>
        </div>
      </div>

      {/* All Products Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink3"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-black/[0.1] rounded-xl bg-surface focus:outline-none focus:border-accent"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${cat === c ? "bg-accent text-white" : "bg-surface text-ink2 hover:bg-surface border border-black/[0.08]"}`}
                >
                  {c}
                </button>
              ))}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-3 py-2 rounded-xl text-sm border border-black/[0.1] bg-surface text-ink2 focus:outline-none"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <p className="text-sm text-ink3 mb-5">
            Showing {paginatedProducts.length} of {filtered.length} products
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-ink3">
              No products found for "{query}"
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {paginatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {/* --- Pagination UI --- */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-black/[0.1] hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                        currentPage === index + 1
                          ? "bg-accent text-white"
                          : "bg-surface text-ink2 border border-black/[0.08] hover:border-accent"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-black/[0.1] hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <TrendingProducts />
      <TopSelling />
      <ReviewSection />
    </>
  );
}
