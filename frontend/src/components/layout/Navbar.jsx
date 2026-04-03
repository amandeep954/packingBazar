import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Package } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
    { to: "/policy", label: "Policy" },
  ];
  return (
    <nav className="bg-white border-b border-black/[0.07] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Package size={18} className="text-white" />
          </div>
          <span className="font-syne font-black text-xl text-ink">
            Packaging<span className="text-accent">Bazaar</span>
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="text-sm font-medium text-ink2 hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/cart")}
            className="relative w-10 h-10 border border-black/[0.08] rounded-xl flex items-center justify-center hover:bg-surface transition-colors"
          >
            <ShoppingCart size={18} className="text-ink2" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <Link
            to="/become-a-seller"
            className="hidden md:block bg-accent text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Become a Seller
          </Link>
          <Link
            to="/seller/dashboard"
            className="hidden md:block bg-accent text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Seller Dashboard
          </Link>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-black/[0.06] px-4 py-3 flex flex-col gap-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-ink2 hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
