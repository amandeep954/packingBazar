import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Eye,
  TrendingUp,
  ShoppingCart,
  Star,
  BarChart2,
  LogOut,
  CheckCircle,
  Clock,
  XCircle,
  ChevronRight,
} from "lucide-react";

// ─── Dummy Seller Info ────────────────────────────────────────────────────────
const SELLER = {
  name: "Rajesh Kumar",
  business: "Kumar Packaging Pvt. Ltd.",
  city: "Ahmedabad",
  state: "Gujarat",
  gst: "24AAAAA0000A1Z5",
  joinedDate: "2024-03-15",
  status: "verified",
};

// ─── Dummy Seller Products (same structure as products.js) ────────────────────
const INITIAL_PRODUCTS = [
  {
    id: "sp-1",
    name: "BOPP Transparent Film",
    category: "BOPP",
    subcategory: "Transparent",
    thickness: "20 micron",
    width: "1000 mm",
    price: 180,
    unit: "kg",
    minOrder: 50,
    stock: 2400,
    tag: "bestseller",
    description:
      "Crystal-clear biaxially oriented polypropylene film, ideal for food, retail and gift packaging.",
    applications: ["Food packaging", "Retail wrap", "Label stock"],
    status: "active",
    views: 342,
    orders: 28,
    rating: 4.8,
    img: "https://media.istockphoto.com/id/953616082/photo/the-plastic-roll-for-wrap-and-seal-food.jpg?s=612x612&w=0&k=20&c=vDLpSm6vgOTuO65eqx9MNjA8TmPchTU_96gntv3k3P8=",
  },
  {
    id: "sp-2",
    name: "BOPP Pearl Film",
    category: "BOPP",
    subcategory: "Pearl",
    thickness: "25 micron",
    width: "1000 mm",
    price: 210,
    unit: "kg",
    minOrder: 50,
    stock: 1800,
    tag: "trending",
    description:
      "Pearlescent BOPP with excellent opacity and metallic sheen for premium packaging.",
    applications: ["Chocolate wrap", "Gift packaging", "Bakery"],
    status: "active",
    views: 219,
    orders: 14,
    rating: 4.7,
    img: "https://media.istockphoto.com/id/1068628136/photo/a-roll-of-plastic-sheet.jpg?s=612x612&w=0&k=20&c=Mcc8hkXnbcv_Qx_WkFX1Bx9SoCYPiLpF7UDBzEf_08s=",
  },
  {
    id: "sp-3",
    name: "CPP Cast Transparent Film",
    category: "CPP",
    subcategory: "Transparent",
    thickness: "25 micron",
    width: "1000 mm",
    price: 195,
    unit: "kg",
    minOrder: 50,
    stock: 0,
    tag: "",
    description:
      "Standard transparent CPP with excellent sealing and moisture barrier.",
    applications: ["Food pouches", "Bread bags", "Garment bags"],
    status: "out_of_stock",
    views: 98,
    orders: 6,
    rating: 4.5,
    img: "https://media.istockphoto.com/id/2261816624/photo/roll-of-plastic-polyethylene-film-is-cut-by-a-food-packaging-machine-industrial-concept.jpg?s=612x612&w=0&k=20&c=2EoD_cSKSw3ZIJGEL9BfEsttt6CUtqUX3_JjU5_kPZs=",
  },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] p-5 flex items-start gap-4">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <div className="text-2xl font-syne font-black text-ink">{value}</div>
        <div className="text-xs font-semibold text-ink2 mt-0.5">{label}</div>
        {sub && <div className="text-[11px] text-ink3 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    active: {
      label: "Active",
      cls: "bg-green-100 text-green-700",
      icon: CheckCircle,
    },
    pending: {
      label: "Pending",
      cls: "bg-yellow-100 text-yellow-700",
      icon: Clock,
    },
    out_of_stock: {
      label: "Out of Stock",
      cls: "bg-red-100 text-red-600",
      icon: XCircle,
    },
  };
  const { label, cls, icon: Icon } = map[status] || map.pending;
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full ${cls}`}
    >
      <Icon size={10} /> {label}
    </span>
  );
}

// ─── Product Row ──────────────────────────────────────────────────────────────
function ProductRow({ product, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-black/[0.06] hover:border-accent/30 transition-colors group">
      {/* Image */}
      <div className="w-14 h-14 rounded-xl bg-surface overflow-hidden shrink-0">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-syne font-bold text-sm text-ink truncate">
            {product.name}
          </span>
          <StatusBadge status={product.status} />
          {product.tag && (
            <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full border border-accent/20 font-medium">
              {product.tag}
            </span>
          )}
        </div>
        <div className="text-xs text-ink3 mt-0.5">
          {product.category} · {product.subcategory} · {product.thickness} ·{" "}
          {product.width}
        </div>
        <div className="flex items-center gap-4 mt-1.5 flex-wrap">
          <span className="text-sm font-bold text-accent">
            ₹{product.price}/{product.unit}
          </span>
          <span className="text-xs text-ink3">MOQ: {product.minOrder} kg</span>
          <span className="text-xs text-ink3">Stock: {product.stock} kg</span>
        </div>
      </div>

      {/* Stats */}
      <div className="hidden md:flex items-center gap-6 shrink-0">
        <div className="text-center">
          <div className="text-sm font-bold text-ink">{product.views}</div>
          <div className="text-[10px] text-ink3">Views</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-ink">{product.orders}</div>
          <div className="text-[10px] text-ink3">Orders</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-ink flex items-center gap-0.5">
            <Star size={11} className="text-yellow-400 fill-yellow-400" />
            {product.rating}
          </div>
          <div className="text-[10px] text-ink3">Rating</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => onEdit(product)}
          className="w-8 h-8 rounded-lg bg-surface hover:bg-accent/10 hover:text-accent flex items-center justify-center transition-colors"
          title="Edit"
        >
          <Edit2 size={14} />
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="w-8 h-8 rounded-lg bg-surface hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function SellerDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activeTab, setActiveTab] = useState("products");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const totalViews = products.reduce((s, p) => s + p.views, 0);
  const totalOrders = products.reduce((s, p) => s + p.orders, 0);
  const activeCount = products.filter((p) => p.status === "active").length;

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  const handleEdit = (product) => {
    navigate("/seller/add-product", { state: { product } });
  };

  return (
    <>
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="bg-ink py-10 px-4">
        <div className="max-w-7xl mx-auto flex items-start justify-between gap-4 flex-wrap">
          <div>
            <span className="text-xs font-semibold tracking-[3px] uppercase text-accent">
              Seller Panel
            </span>
            <h1 className="font-syne font-black text-3xl text-white mt-1">
              {SELLER.business}
            </h1>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <span className="text-white/50 text-sm">
                {SELLER.city}, {SELLER.state}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-green-500/20 text-green-400 px-2.5 py-0.5 rounded-full">
                <CheckCircle size={10} /> Verified Seller
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/seller/add-product")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-orange-700 transition-colors"
            >
              <Plus size={16} /> Add Product
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 text-white/70 text-sm hover:bg-white/10 transition-colors"
            >
              <LogOut size={15} /> Exit
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* ── Stats ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            icon={Package}
            label="Total Products"
            value={products.length}
            sub={`${activeCount} active`}
            color="bg-accent"
          />
          <StatCard
            icon={Eye}
            label="Total Views"
            value={totalViews.toLocaleString()}
            sub="Last 30 days"
            color="bg-blue-500"
          />
          <StatCard
            icon={ShoppingCart}
            label="Total Orders"
            value={totalOrders}
            sub="All time"
            color="bg-green-500"
          />
          <StatCard
            icon={TrendingUp}
            label="Avg. Rating"
            value="4.7"
            sub="Across all products"
            color="bg-purple-500"
          />
        </div>

        {/* ── Tabs ────────────────────────────────────────────────────────────── */}
        <div className="flex gap-1 mb-6 bg-surface rounded-xl p-1 w-fit">
          {[
            { key: "products", label: "My Products" },
            { key: "orders", label: "Recent Orders" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === t.key
                  ? "bg-white text-ink shadow-sm"
                  : "text-ink3 hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Products Tab ─────────────────────────────────────────────────────── */}
        {activeTab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-ink3">
                {products.length} products listed
              </p>
              <button
                onClick={() => navigate("/seller/add-product")}
                className="flex items-center gap-1.5 text-sm text-accent font-semibold hover:underline"
              >
                <Plus size={15} /> Add New Product
              </button>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-20 bg-surface rounded-2xl">
                <Package size={40} className="text-ink3 mx-auto mb-3" />
                <h3 className="font-syne font-bold text-lg text-ink mb-1">
                  No products yet
                </h3>
                <p className="text-ink3 text-sm mb-4">
                  Add your first product to start selling
                </p>
                <button
                  onClick={() => navigate("/seller/add-product")}
                  className="px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-orange-700 transition-colors"
                >
                  Add Product
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {products.map((p) => (
                  <ProductRow
                    key={p.id}
                    product={p}
                    onEdit={handleEdit}
                    onDelete={(id) => setDeleteConfirm(id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Orders Tab (Dummy) ────────────────────────────────────────────────── */}
        {activeTab === "orders" && (
          <div className="flex flex-col gap-3">
            {[
              {
                id: "ORD-001",
                product: "BOPP Transparent Film",
                buyer: "Sharma Industries",
                qty: "200 kg",
                amount: "₹36,000",
                date: "2024-06-10",
                status: "Delivered",
              },
              {
                id: "ORD-002",
                product: "BOPP Pearl Film",
                buyer: "Krishna Packaging",
                qty: "100 kg",
                amount: "₹21,000",
                date: "2024-06-08",
                status: "Processing",
              },
              {
                id: "ORD-003",
                product: "BOPP Transparent Film",
                buyer: "Gupta Films",
                qty: "150 kg",
                amount: "₹27,000",
                date: "2024-06-05",
                status: "Delivered",
              },
            ].map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-black/[0.06]"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-syne font-bold text-sm text-ink">
                      {order.id}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-xs text-ink3 mt-0.5">
                    {order.product} · {order.buyer}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-accent">
                    {order.amount}
                  </div>
                  <div className="text-xs text-ink3">
                    {order.qty} · {order.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Delete Confirm Modal ─────────────────────────────────────────────── */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-syne font-black text-lg text-ink mb-2">
              Delete Product?
            </h3>
            <p className="text-ink3 text-sm mb-5">
              This product will be permanently removed from your listings.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl border border-black/15 text-sm font-medium text-ink hover:bg-surface transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
