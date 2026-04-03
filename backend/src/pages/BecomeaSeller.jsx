import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Package,
  TrendingUp,
  Users,
  ShieldCheck,
  ArrowRight,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText,
  Layers,
  ChevronRight,
} from "lucide-react";

// ─── Dummy seller data (replace with API later) ───────────────────────────────
const DUMMY_SELLERS = [
  {
    id: "S001",
    name: "Rajesh Kumar",
    business: "Kumar Packaging Pvt. Ltd.",
    city: "Ahmedabad",
    state: "Gujarat",
    products: ["BOPP", "CPP"],
    joinedDate: "2024-03-15",
    status: "active",
  },
  {
    id: "S002",
    name: "Priya Sharma",
    business: "Sharma Films & Laminates",
    city: "Mumbai",
    state: "Maharashtra",
    products: ["PET", "LAMINATED"],
    joinedDate: "2024-05-22",
    status: "active",
  },
];

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Grow Your Sales",
    desc: "Reach 10,000+ verified buyers across India looking for packaging films.",
  },
  {
    icon: Users,
    title: "Verified Buyer Network",
    desc: "Connect with pre-vetted manufacturers, FMCG brands, and distributors.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Transactions",
    desc: "Payment protection and trade assurance on every order.",
  },
  {
    icon: Package,
    title: "Easy Catalog Management",
    desc: "List unlimited SKUs with specs, pricing, and MOQ in minutes.",
  },
];

const FILM_TYPES = ["BOPP", "PET", "CPP", "LAMINATED", "Others"];
const BUSINESS_TYPES = ["Manufacturer", "Distributor", "Trader", "Converter"];
const STATES = [
  "Gujarat",
  "Maharashtra",
  "Rajasthan",
  "Delhi",
  "Karnataka",
  "Tamil Nadu",
  "Uttar Pradesh",
  "West Bengal",
  "Telangana",
  "Other",
];

const STEPS = [
  "Business Info",
  "Contact Details",
  "Products & Capacity",
  "Review & Submit",
];

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                i < current
                  ? "bg-accent border-accent text-white"
                  : i === current
                    ? "bg-white border-accent text-accent"
                    : "bg-white border-black/10 text-ink3"
              }`}
            >
              {i < current ? <CheckCircle size={16} /> : i + 1}
            </div>
            <span
              className={`text-[10px] font-medium hidden sm:block whitespace-nowrap ${
                i === current ? "text-accent" : "text-ink3"
              }`}
            >
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-0.5 w-10 sm:w-16 mx-1 mb-4 rounded transition-all ${
                i < current ? "bg-accent" : "bg-black/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Form Field Components ────────────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-ink uppercase tracking-wider">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-4 py-2.5 text-sm border border-black/[0.1] rounded-xl bg-surface focus:outline-none focus:border-accent transition-colors text-ink placeholder:text-ink3";

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BecomeaSeller() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    // Step 0 - Business Info
    businessName: "",
    businessType: "",
    gstNumber: "",
    yearEstablished: "",
    // Step 1 - Contact
    ownerName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    address: "",
    // Step 2 - Products
    filmTypes: [],
    monthlyCapacity: "",
    priceRange: "",
    description: "",
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const toggleFilm = (film) =>
    set(
      "filmTypes",
      form.filmTypes.includes(film)
        ? form.filmTypes.filter((f) => f !== film)
        : [...form.filmTypes, film],
    );

  const handleSubmit = () => {
    // Dummy submission — replace with actual API call
    const newSeller = {
      id: `S00${DUMMY_SELLERS.length + 1}`,
      name: form.ownerName,
      business: form.businessName,
      city: form.city,
      state: form.state,
      products: form.filmTypes,
      joinedDate: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    DUMMY_SELLERS.push(newSeller);
    setSubmitted(true);
  };

  // ── Success Screen ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-white">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="font-syne font-black text-3xl text-ink text-center mb-3">
          Application Submitted!
        </h2>
        <p className="text-ink2 text-center max-w-md mb-2">
          Thank you, <strong>{form.ownerName}</strong>! Your seller application
          for <strong>{form.businessName}</strong> has been received.
        </p>
        <p className="text-ink3 text-sm text-center mb-8">
          Our team will review and contact you within 2–3 business days on{" "}
          <strong>{form.email}</strong>.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl border border-black/15 text-sm font-medium text-ink hover:bg-surface transition-colors"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-orange-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Hero Header ─────────────────────────────────────────────────────── */}
      <div className="bg-ink py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-semibold tracking-[3px] uppercase text-accent">
            Seller Program
          </span>
          <h1 className="font-syne font-black text-4xl text-white mt-2 mb-1">
            Become a Seller
          </h1>
          <p className="text-white/50 text-sm max-w-lg">
            Join 500+ packaging film suppliers on PackagingBazaar and grow your
            B2B sales across India.
          </p>
        </div>
      </div>

      {/* ── Benefits Strip ───────────────────────────────────────────────────── */}
      <div className="bg-surface border-b border-black/[0.06] px-4 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col gap-2 p-5 bg-white rounded-2xl border border-black/[0.06] hover:border-accent/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Icon size={20} className="text-accent" />
              </div>
              <h3 className="font-syne font-bold text-sm text-ink">{title}</h3>
              <p className="text-xs text-ink3 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Registration Form ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-2">
            <h2 className="font-syne font-black text-2xl text-ink">
              Seller Registration
            </h2>
            <p className="text-ink3 text-sm mt-1">
              Free to join · Takes less than 5 minutes
            </p>
          </div>

          <div className="mt-8 bg-white border border-black/[0.08] rounded-3xl p-6 sm:p-10 shadow-sm">
            <StepIndicator current={step} />

            {/* ── Step 0: Business Info ──────────────────────────────────────── */}
            {step === 0 && (
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 size={18} className="text-accent" />
                  <h3 className="font-syne font-bold text-lg text-ink">
                    Business Information
                  </h3>
                </div>

                <Field label="Business / Company Name" required>
                  <input
                    className={inputCls}
                    placeholder="e.g. Sharma Films Pvt. Ltd."
                    value={form.businessName}
                    onChange={(e) => set("businessName", e.target.value)}
                  />
                </Field>

                <Field label="Business Type" required>
                  <select
                    className={inputCls}
                    value={form.businessType}
                    onChange={(e) => set("businessType", e.target.value)}
                  >
                    <option value="">Select type...</option>
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="GST Number" required>
                    <input
                      className={inputCls}
                      placeholder="22AAAAA0000A1Z5"
                      value={form.gstNumber}
                      onChange={(e) =>
                        set("gstNumber", e.target.value.toUpperCase())
                      }
                      maxLength={15}
                    />
                  </Field>
                  <Field label="Year Established">
                    <input
                      className={inputCls}
                      placeholder="e.g. 2010"
                      type="number"
                      min="1900"
                      max={new Date().getFullYear()}
                      value={form.yearEstablished}
                      onChange={(e) => set("yearEstablished", e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            )}

            {/* ── Step 1: Contact Details ────────────────────────────────────── */}
            {step === 1 && (
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2 mb-1">
                  <Phone size={18} className="text-accent" />
                  <h3 className="font-syne font-bold text-lg text-ink">
                    Contact Details
                  </h3>
                </div>

                <Field label="Owner / Contact Person Name" required>
                  <input
                    className={inputCls}
                    placeholder="Full name"
                    value={form.ownerName}
                    onChange={(e) => set("ownerName", e.target.value)}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Email Address" required>
                    <input
                      className={inputCls}
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </Field>
                  <Field label="Phone / WhatsApp" required>
                    <input
                      className={inputCls}
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="City" required>
                    <input
                      className={inputCls}
                      placeholder="e.g. Ahmedabad"
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                    />
                  </Field>
                  <Field label="State" required>
                    <select
                      className={inputCls}
                      value={form.state}
                      onChange={(e) => set("state", e.target.value)}
                    >
                      <option value="">Select state...</option>
                      {STATES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Business Address">
                  <textarea
                    className={inputCls + " resize-none"}
                    rows={3}
                    placeholder="Street, area, pincode..."
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                  />
                </Field>
              </div>
            )}

            {/* ── Step 2: Products & Capacity ───────────────────────────────── */}
            {step === 2 && (
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2 mb-1">
                  <Layers size={18} className="text-accent" />
                  <h3 className="font-syne font-bold text-lg text-ink">
                    Products & Capacity
                  </h3>
                </div>

                <Field label="Film Types You Sell" required>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {FILM_TYPES.map((film) => (
                      <button
                        key={film}
                        type="button"
                        onClick={() => toggleFilm(film)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                          form.filmTypes.includes(film)
                            ? "bg-accent text-white border-accent"
                            : "bg-surface text-ink2 border-black/[0.08] hover:border-accent/40"
                        }`}
                      >
                        {film}
                      </button>
                    ))}
                  </div>
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Monthly Capacity (MT)" required>
                    <input
                      className={inputCls}
                      type="number"
                      placeholder="e.g. 50"
                      value={form.monthlyCapacity}
                      onChange={(e) => set("monthlyCapacity", e.target.value)}
                    />
                  </Field>
                  <Field label="Price Range (₹/kg)">
                    <input
                      className={inputCls}
                      placeholder="e.g. 180 – 350"
                      value={form.priceRange}
                      onChange={(e) => set("priceRange", e.target.value)}
                    />
                  </Field>
                </div>

                <Field label="Brief About Your Business">
                  <textarea
                    className={inputCls + " resize-none"}
                    rows={4}
                    placeholder="Describe your product range, certifications, key clients, etc."
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                  />
                </Field>
              </div>
            )}

            {/* ── Step 3: Review ─────────────────────────────────────────────── */}
            {step === 3 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-1">
                  <FileText size={18} className="text-accent" />
                  <h3 className="font-syne font-bold text-lg text-ink">
                    Review & Submit
                  </h3>
                </div>

                {[
                  {
                    section: "Business Info",
                    rows: [
                      ["Company", form.businessName],
                      ["Type", form.businessType],
                      ["GST", form.gstNumber],
                      ["Established", form.yearEstablished || "—"],
                    ],
                  },
                  {
                    section: "Contact",
                    rows: [
                      ["Owner", form.ownerName],
                      ["Email", form.email],
                      ["Phone", form.phone],
                      ["Location", `${form.city}, ${form.state}`],
                    ],
                  },
                  {
                    section: "Products",
                    rows: [
                      ["Films", form.filmTypes.join(", ") || "—"],
                      [
                        "Capacity",
                        form.monthlyCapacity
                          ? `${form.monthlyCapacity} MT/month`
                          : "—",
                      ],
                      ["Price Range", form.priceRange || "—"],
                    ],
                  },
                ].map(({ section, rows }) => (
                  <div
                    key={section}
                    className="bg-surface rounded-2xl px-5 py-4"
                  >
                    <p className="text-xs font-bold text-accent uppercase tracking-wider mb-3">
                      {section}
                    </p>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      {rows.map(([label, value]) => (
                        <div key={label}>
                          <div className="text-[10px] text-ink3 uppercase tracking-wide">
                            {label}
                          </div>
                          <div className="text-sm font-medium text-ink">
                            {value || "—"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <p className="text-xs text-ink3 mt-2">
                  By submitting, you agree to our{" "}
                  <span className="text-accent underline cursor-pointer">
                    Seller Terms & Conditions
                  </span>
                  .
                </p>
              </div>
            )}

            {/* ── Navigation Buttons ─────────────────────────────────────────── */}
            <div className="flex justify-between mt-8 pt-6 border-t border-black/[0.06]">
              {step > 0 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="px-5 py-3 rounded-xl border border-black/15 text-sm font-medium text-ink hover:bg-surface transition-colors"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-orange-700 transition-colors"
                >
                  Next <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-orange-700 transition-colors"
                >
                  Submit Application <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Active Sellers Strip ─────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-surface border-t border-black/[0.06]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-syne font-black text-2xl text-ink mb-1">
            Recent Sellers on PackagingBazaar
          </h2>
          <p className="text-ink3 text-sm mb-7">
            Join a growing network of verified packaging film suppliers
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {DUMMY_SELLERS.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-2xl border border-black/[0.06] px-5 py-4 flex items-start gap-4 hover:border-accent/30 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <span className="font-syne font-black text-accent text-lg">
                    {s.name[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-syne font-bold text-sm text-ink">
                    {s.business}
                  </div>
                  <div className="text-xs text-ink3 mt-0.5">
                    {s.city}, {s.state}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {s.products.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] bg-accent/10 text-accent px-2.5 py-0.5 rounded-full border border-accent/20 font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold shrink-0">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
