import { useState, useEffect, useRef, useCallback } from "react";
import Footer from "../components/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

// ─── SCROLL REVEAL ───
function useScrollReveal() {
  const refs = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("revealed"),
        ),
      { threshold: 0.01 },
    );
    refs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);
  return useCallback((el) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  }, []);
}

// ─── ICONS ───
const I = {
  search: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  user: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  cart: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
};
const Heart = ({ on }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={on ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const Stars = ({ n }) => (
  <>
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} style={{ color: "#c8a96e", fontSize: ".65rem" }}>
        {i <= Math.round(n) ? "★" : "☆"}
      </span>
    ))}
  </>
);

// ─── DATA ───
// 📸 IMAGES: put files in src/assets/ then replace null with "./assets/filename.jpg"
// 🔗 LINKS: replace "#" with "/pagename" when page is ready

const BRANDS = [
  { name: "27", logo: null, href: "#" },
  { name: "MARBLE", logo: null, href: "#" },
  { name: "أنتيكا", logo: null, href: "#" },
  { name: "Sally", logo: null, href: "#" },
  { name: "Husayba", logo: null, href: "#" },
  { name: "RedaaModest", logo: null, href: "#" },
];

const PRODUCTS = [
  // ── BEST SELLERS ──
  {
    id: 1,
    tab: "best",
    name: "Marble Stripes",
    brand: "MARBLE",
    price: "LE 1,500",
    oldPrice: "LE 1,800",
    img: null,
    gradient: "135deg,#2a3a5c,#1a2a4c",
    colors: ["#1a1a2e", "#c0c0c0"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 124,
    desc: "Bold-stripe tee, 100% Egyptian cotton.",
  },
  {
    id: 2,
    tab: "best",
    name: "antika Hoodie Kids",
    brand: "antika",
    price: "LE 1,500",
    oldPrice: "LE 1,800",
    img: null,
    gradient: "135deg,#e63946,#c0202e",
    colors: ["#e63946", "#fff"],
    sizes: ["4Y", "6Y", "8Y", "10Y"],
    rating: 4.9,
    reviews: 89,
    desc: "Cozy fleece hoodie, perfect for kids.",
  },
  {
    id: 3,
    tab: "best",
    name: "Denim Jumpsuit",
    brand: "RedaaModest",
    price: "LE 1,500",
    oldPrice: "LE 1,800",
    img: null,
    gradient: "135deg,#4a7fa0,#2a5f80",
    colors: ["#4a7fa0"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.7,
    reviews: 56,
    desc: "Wide-leg denim, modest cut.",
  },
  {
    id: 4,
    tab: "best",
    name: "27 Pink Puff Tee",
    brand: "27",
    price: "LE 750",
    oldPrice: null,
    img: null,
    gradient: "135deg,#f4a0b5,#d48095",
    colors: ["#f4a0b5", "#d48095"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 203,
    desc: "Puff sleeves, dreamy blush pink.",
  },
  {
    id: 5,
    tab: "best",
    name: "Maya Knitted Top",
    brand: "Husayba",
    price: "LE 1,300",
    oldPrice: null,
    img: null,
    gradient: "135deg,#1a2a4c,#0a1a3c",
    colors: ["#1a2a4c"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 78,
    desc: "Rib-knit top, rich navy.",
  },
  {
    id: 6,
    tab: "best",
    name: "Textured Polo",
    brand: "Salty",
    price: "LE 400",
    oldPrice: null,
    img: null,
    gradient: "135deg,#3a3a38,#1a1a18",
    colors: ["#1a1a18", "#4a4a48"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.5,
    reviews: 167,
    desc: "Heavyweight piqué polo.",
  },
  // ── NEW ARRIVALS ──
  {
    id: 15,
    tab: "new",
    name: "Sage Linen Shirt",
    brand: "MARBLE",
    price: "LE 1,200",
    oldPrice: null,
    img: null,
    gradient: "135deg,#92A079,#728060",
    colors: ["#92A079", "#fff"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    reviews: 12,
    desc: "Relaxed linen shirt, sage colorway.",
  },
  {
    id: 16,
    tab: "new",
    name: "Cloud Knit Cardigan",
    brand: "Husayba",
    price: "LE 1,800",
    oldPrice: null,
    img: null,
    gradient: "135deg,#e8e0d8,#c8c0b8",
    colors: ["#e8e0d8", "#8a8078"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.9,
    reviews: 8,
    desc: "Ultra-soft oversized cardigan.",
  },
  {
    id: 17,
    tab: "new",
    name: "Wide Leg Trouser",
    brand: "27",
    price: "LE 950",
    oldPrice: null,
    img: null,
    gradient: "135deg,#3a3a38,#1a1a18",
    colors: ["#1a1a18", "#c8c0b8"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 21,
    desc: "Tailored wide-leg, everyday luxury.",
  },
  {
    id: 18,
    tab: "new",
    name: "Floral Midi Dress",
    brand: "Sally",
    price: "LE 2,100",
    oldPrice: null,
    img: null,
    gradient: "135deg,#d4a8b8,#b48898",
    colors: ["#d4a8b8"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.8,
    reviews: 6,
    desc: "Flowing midi dress, floral print.",
  },
  {
    id: 19,
    tab: "new",
    name: "Ribbed Tank Set",
    brand: "antika",
    price: "LE 680",
    oldPrice: null,
    img: null,
    gradient: "135deg,#c8b89a,#a8987a",
    colors: ["#c8b89a", "#1a1a18"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.5,
    reviews: 15,
    desc: "Matching ribbed tank & shorts set.",
  },
  {
    id: 20,
    tab: "new",
    name: "Striped Oversized Tee",
    brand: "MARBLE",
    price: "LE 550",
    oldPrice: null,
    img: null,
    gradient: "135deg,#e8e4e0,#2a2a28",
    colors: ["#e8e4e0", "#2a2a28"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviews: 31,
    desc: "Classic oversized stripe, unisex.",
  },
  // ── SALE ──
  {
    id: 21,
    tab: "sale",
    name: "Summer Slip Dress",
    brand: "Sally",
    price: "LE 600",
    oldPrice: "LE 1,200",
    img: null,
    gradient: "135deg,#f0c8a0,#d0a880",
    colors: ["#f0c8a0", "#c08060"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.4,
    reviews: 88,
    desc: "Silk-feel slip dress, 50% off.",
  },
  {
    id: 22,
    tab: "sale",
    name: "Cargo Wide Pants",
    brand: "27",
    price: "LE 700",
    oldPrice: "LE 1,400",
    img: null,
    gradient: "135deg,#6a7a58,#4a5a38",
    colors: ["#6a7a58", "#c8b89a"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 54,
    desc: "Utility cargo pants, 50% off.",
  },
  {
    id: 23,
    tab: "sale",
    name: "Knit Vest",
    brand: "Husayba",
    price: "LE 400",
    oldPrice: "LE 800",
    img: null,
    gradient: "135deg,#d4b8a0,#b49880",
    colors: ["#d4b8a0"],
    sizes: ["S", "M", "L"],
    rating: 4.3,
    reviews: 42,
    desc: "Crochet knit vest, boho style.",
  },
  {
    id: 24,
    tab: "sale",
    name: "Linen Blazer",
    brand: "MARBLE",
    price: "LE 900",
    oldPrice: "LE 1,800",
    img: null,
    gradient: "135deg,#b8b0a8,#888078",
    colors: ["#b8b0a8", "#1a1a18"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.7,
    reviews: 67,
    desc: "Relaxed linen blazer, 50% off.",
  },
  {
    id: 25,
    tab: "sale",
    name: "Printed Maxi Skirt",
    brand: "Sally",
    price: "LE 500",
    oldPrice: "LE 1,000",
    img: null,
    gradient: "135deg,#c8a8c0,#a888a0",
    colors: ["#c8a8c0"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.5,
    reviews: 39,
    desc: "Flowy printed maxi, 50% off.",
  },
  {
    id: 26,
    tab: "sale",
    name: "Basic Hoodie",
    brand: "antika",
    price: "LE 450",
    oldPrice: "LE 900",
    img: null,
    gradient: "135deg,#8a9e7a,#6a7e5a",
    colors: ["#8a9e7a", "#fff"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.6,
    reviews: 112,
    desc: "Essential hoodie, 50% off.",
  },
  // ── TRENDING ──
  {
    id: 7,
    tab: "trend",
    name: "Essential Basic Pant",
    brand: "27",
    price: "LE 800",
    oldPrice: "Sale",
    img: null,
    gradient: "135deg,#c8c0b8,#a09888",
    colors: ["#c8c0b8"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.7,
    reviews: 44,
    desc: "Clean cut everyday pants.",
  },
  {
    id: 8,
    tab: "trend",
    name: "Essential Basic Pant",
    brand: "27",
    price: "LE 800",
    oldPrice: "Sale",
    img: null,
    gradient: "135deg,#7a9ab0,#5a7a90",
    colors: ["#7a9ab0"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.8,
    reviews: 62,
    desc: "Navy edition, tailored fit.",
  },
  {
    id: 9,
    tab: "trend",
    name: "Lawinska Detail Shirt",
    brand: "MARBLE",
    price: "LE 950",
    oldPrice: null,
    img: null,
    gradient: "135deg,#d4c4a8,#b4a488",
    colors: ["#d4c4a8"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 38,
    desc: "Signature MARBLE detail shirt.",
  },
  {
    id: 10,
    tab: "trend",
    name: "Lawinska Detail Jean",
    brand: "MARBLE",
    price: "LE 1,100",
    oldPrice: null,
    img: null,
    gradient: "135deg,#5c7a9a,#3c5a7a",
    colors: ["#5c7a9a"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.9,
    reviews: 91,
    desc: "Wide-leg denim with detail stitching.",
  },
  {
    id: 27,
    tab: "trend",
    name: "Ribbed Mock Neck",
    brand: "Husayba",
    price: "LE 780",
    oldPrice: null,
    img: null,
    gradient: "135deg,#b8a898,#988878",
    colors: ["#b8a898"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.7,
    reviews: 29,
    desc: "Soft ribbed mock neck top.",
  },
  {
    id: 28,
    tab: "trend",
    name: "Straight Leg Jean",
    brand: "27",
    price: "LE 1,050",
    oldPrice: null,
    img: null,
    gradient: "135deg,#4a6080,#2a4060",
    colors: ["#4a6080"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 47,
    desc: "Classic straight leg in indigo.",
  },
  // ── TOP PICKS ──
  {
    id: 11,
    tab: "picks",
    name: "Essential Basic Pant",
    brand: "27",
    price: "LE 800",
    img: null,
    gradient: "135deg,#d0ccc8,#b0aca8",
    colors: ["#d0ccc8"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.8,
    reviews: 55,
    desc: "Relaxed fit everyday pant.",
  },
  {
    id: 12,
    tab: "picks",
    name: "Essential Basic Pant",
    brand: "27",
    price: "LE 800",
    img: null,
    gradient: "135deg,#2a3a6c,#1a2a5c",
    colors: ["#2a3a6c"],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.7,
    reviews: 43,
    desc: "Navy edition slim cut.",
  },
  {
    id: 13,
    tab: "picks",
    name: "Essential Basic Pant",
    brand: "MARBLE",
    price: "LE 800",
    img: null,
    gradient: "135deg,#4a5a48,#2a3a28",
    colors: ["#4a5a48"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    reviews: 38,
    desc: "Green colorway trouser.",
  },
  {
    id: 14,
    tab: "picks",
    name: "Essential Basic Pant",
    brand: "27",
    price: "LE 800",
    img: null,
    gradient: "135deg,#e8c8a8,#c8a888",
    colors: ["#e8c8a8"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.9,
    reviews: 72,
    desc: "Warm sand tone pant.",
  },
];

const CATS = [
  { name: "MEN", img: null, link: "#", gradient: "145deg,#8a9e7a,#4a6040" },
  { name: "WOMEN", img: null, link: "#", gradient: "145deg,#c4b8a8,#8a7868" },
  { name: "KIDS", img: null, link: "#", gradient: "145deg,#6b8aad,#3a5878" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Women", href: "#" },
  { label: "Men", href: "#" },
  { label: "Kids", href: "#" },
  { label: "Our Picks", href: "#" },
  { label: "Build an Outfit", href: "#" },
  { label: "Brands", href: "#" },
];

const FOOTER_COLS = [
  {
    title: "Shop",
    links: [
      ["All Brands", "#"],
      ["Women", "#"],
      ["Men", "#"],
      ["Kids", "#"],
      ["Sale", "#"],
    ],
  },
  {
    title: "Sell With Us",
    links: [
      ["Sign Up", "#"],
      ["How It Works", "#"],
      ["Pricing", "#"],
      ["Brand Stories", "#"],
    ],
  },
  {
    title: "Discover",
    links: [
      ["New Arrivals", "#"],
      ["Top Picks", "#"],
      ["Build Outfit", "#"],
      ["Trending", "#"],
    ],
  },
  {
    title: "Contact Us",
    links: [
      ["Support", "#"],
      ["Email Us", "#"],
      ["Instagram", "#"],
      ["WhatsApp", "#"],
    ],
  },
];

// ─── CUSTOM CSS — only effects, colors, fonts ───
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
:root { --cream:#F8F6F2; --dark:#1a1a18; --sage:#92A079; --deep:#728060; --warm:#8c8880; --border:#e4e0da; --gold:#c8a96e; --red:#e63946; }
body { font-family:'DM Sans',sans-serif; background:var(--cream); color:var(--dark); }

/* REVEAL */
.reveal { opacity:0; transform:translateY(24px); transition:opacity .7s,transform .7s; }
.revealed { opacity:1; transform:none; }
.d1{transition-delay:.1s} .d2{transition-delay:.2s} .d3{transition-delay:.3s} .d4{transition-delay:.4s}

/* NAV */
.sh-nav { background:#fff; border-bottom:1px solid var(--border); height:56px; }
.sh-nav a { color:var(--dark); text-decoration:none; font-size:.73rem; letter-spacing:.04em; transition:color .2s; position:relative; padding-bottom:3px; }
.sh-nav a::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1.5px; background:var(--sage); transition:width .25s; }
.sh-nav a:hover { color:var(--sage); } .sh-nav a:hover::after { width:100%; }
.sh-badge { background:var(--sage); color:#fff; font-size:.5rem; width:14px; height:14px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; position:absolute; top:-6px; right:-8px; }
.nav-icon { color:var(--dark); display:flex; align-items:center; position:relative; transition:color .2s; cursor:pointer; text-decoration:none; }
.nav-icon:hover { color:var(--sage); }

/* HERO */
.sh-hero { position:relative; height:480px; overflow:hidden; }
.hero-fade { position:absolute; inset:0; opacity:0; transition:opacity .8s; pointer-events:none; display:flex; align-items:center; }
.hero-fade.on { opacity:1; pointer-events:auto; }
.hero-fade img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.hero-ov { position:absolute; inset:0; background:linear-gradient(to right,rgba(248,246,242,.93) 35%,transparent 100%); }
.hero-ct { position:relative; z-index:2; max-width:460px; padding:0 5%; }
.hero-title { font-family:'Cormorant Garamond',serif; font-size:clamp(2.2rem,4vw,3.4rem); font-weight:400; line-height:1.12; margin-bottom:1rem; }
.hero-sub { font-size:.85rem; line-height:1.8; color:var(--warm); margin-bottom:1.8rem; }
.h-arr { position:absolute; top:50%; transform:translateY(-50%); z-index:5; background:rgba(255,255,255,.8); border:none; width:36px; height:36px; border-radius:50%; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center; transition:all .2s; }
.h-arr:hover { background:#fff; box-shadow:0 4px 16px rgba(0,0,0,.15); }
.h-arr.l { left:1rem; } .h-arr.r { right:1rem; }
.h-dots { position:absolute; bottom:1.2rem; left:50%; transform:translateX(-50%); display:flex; gap:.5rem; z-index:5; }
.hdot { width:8px; height:8px; border-radius:50%; background:rgba(26,26,24,.25); border:none; cursor:pointer; transition:all .3s; }
.hdot.on { background:var(--dark); width:22px; border-radius:4px; }

/* BUTTONS */
.sh-btn { display:inline-flex; align-items:center; padding:.72rem 1.8rem; font-size:.72rem; letter-spacing:.12em; text-transform:uppercase; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; text-decoration:none; }
.sh-btn-dk { background:var(--dark); color:#fff; } .sh-btn-dk:hover { background:var(--deep); transform:translateY(-2px); color:#fff; }
.sh-btn-ol { background:transparent; color:var(--dark); border:1.5px solid var(--dark); } .sh-btn-ol:hover { background:var(--dark); color:#fff; }
.sh-btn-sm { padding:.38rem .9rem; font-size:.65rem; }

/* SECTION TITLE */
.sec-title { font-size:1rem; font-weight:500; letter-spacing:.08em; text-align:center; margin-bottom:1.8rem; }
.sec-title::after { content:''; display:block; width:40px; height:2px; background:var(--sage); margin:.6rem auto 0; }

/* BRANDS */
.brands-label { font-size:.7rem; letter-spacing:.25em; text-transform:uppercase; color:var(--warm); }
.brand-arrow { background:none; border:1.5px solid var(--border); width:34px; height:34px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .2s; flex-shrink:0; }
.brand-arrow:hover { border-color:var(--dark); background:var(--dark); color:#fff; }
.brands-wrap { overflow:hidden; width:80%; }
.brands-track { display:flex; transition:transform .6s cubic-bezier(.22,1,.36,1); }
.brand-slide { min-width:25%; display:flex; align-items:center; justify-content:center; padding:.8rem 1rem; }
.brand-txt { font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:700; opacity:.5; cursor:pointer; transition:opacity .3s,transform .25s; }
.brand-txt:hover { opacity:1; transform:scale(1.08); }

/* TABS */
.sh-tabs { display:flex; gap:2rem; border-bottom:1px solid var(--border); justify-content:center; margin-bottom:1.8rem; }
.sh-tab { font-size:.75rem; letter-spacing:.08em; color:var(--warm); cursor:pointer; padding-bottom:.6rem; border-bottom:2px solid transparent; margin-bottom:-1px; transition:all .2s; }
.sh-tab.on { color:var(--dark); border-bottom-color:var(--dark); }
.sh-tab:hover:not(.on) { color:var(--dark); }

/* PRODUCT CARD */
.pc { background:#fff; cursor:pointer; border:1px solid var(--border); transition:box-shadow .25s; height:100%; }
.pc:hover { box-shadow:0 8px 32px rgba(26,26,24,.1); }
.pc-img { position:relative; overflow:hidden; aspect-ratio:4/4; background:#f0ece6; }
.pc-img img,.pc-ph { width:100%; height:100%; transition:transform .6s cubic-bezier(.22,1,.36,1); }
.pc-img img { object-fit:cover; } .pc-ph { display:flex; align-items:center; justify-content:center; }
.pc:hover .pc-img img,.pc:hover .pc-ph { transform:scale(1.06); }
.pc-ov { position:absolute; inset:0; background:rgba(26,26,24,0); transition:background .3s; }
.pc:hover .pc-ov { background:rgba(26,26,24,.08); }
.pc-wish { position:absolute; top:.7rem; right:.7rem; background:#fff; border:none; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:transform .2s; box-shadow:0 2px 8px rgba(0,0,0,.1); }
.pc-wish:hover { transform:scale(1.15); } .pc-wish.on { color:var(--red); }
.pc-qv { position:absolute; bottom:.8rem; left:50%; transform:translateX(-50%) translateY(12px); opacity:0; transition:all .28s; white-space:nowrap; padding:.4rem 1rem; font-size:.66rem; letter-spacing:.1em; text-transform:uppercase; background:#fff; color:var(--dark); border:none; cursor:pointer; font-family:'DM Sans',sans-serif; box-shadow:0 2px 12px rgba(0,0,0,.15); }
.pc:hover .pc-qv { opacity:1; transform:translateX(-50%) translateY(0); }
.pc-brand { font-size:.55rem; letter-spacing:.15em; text-transform:uppercase; color:var(--warm); }
.pc-name { font-size:.78rem; font-weight:500; line-height:1.3; }
.p-old { font-size:.72rem; color:var(--warm); text-decoration:line-through; }
.p-new { font-size:.78rem; font-weight:600; color:var(--red); } .p-reg { font-size:.78rem; font-weight:500; }

/* TRENDING CARD */
.tc { background:#fff; border:1px solid var(--border); transition:box-shadow .25s; }
.tc:hover { box-shadow:0 6px 24px rgba(26,26,24,.1); }
.tc-img { aspect-ratio:1/1; overflow:hidden; background:#f0ece6; position:relative; cursor:pointer; }
.tc-img img,.tc-ph { width:100%; height:100%; transition:transform .5s cubic-bezier(.22,1,.36,1); }
.tc-img img { object-fit:cover; } .tc-ph { display:flex; align-items:center; justify-content:center; }
.tc:hover .tc-img img,.tc:hover .tc-ph { transform:scale(1.06); }
.tc-w { position:absolute; top:.6rem; left:.6rem; background:#fff; border:none; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 2px 8px rgba(0,0,0,.1); transition:transform .2s; }
.tc-w:hover { transform:scale(1.15); } .tc-w.on { color:var(--red); }
.tc-brand { font-size:.55rem; letter-spacing:.15em; text-transform:uppercase; color:var(--warm); }
.tc-name { font-size:.78rem; font-weight:500; }
.tc-price { font-size:.78rem; font-weight:600; } .tc-price.sale { color:var(--red); }
.tc-old { font-size:.7rem; color:var(--warm); text-decoration:line-through; }
.tc-add { width:100%; padding:.5rem; background:var(--deep); color:#fff; border:none; cursor:pointer; font-size:.68rem; letter-spacing:.1em; text-transform:uppercase; font-family:'DM Sans',sans-serif; transition:background .2s; }
.tc-add:hover { background:var(--dark); }
.tc-qty { display:flex; align-items:center; justify-content:space-between; border:1px solid var(--border); }
.tc-qty button { width:28px; height:28px; background:none; border:none; cursor:pointer; font-size:.9rem; display:flex; align-items:center; justify-content:center; }
.tc-qty button:hover { background:var(--cream); } .tc-qty span { font-size:.78rem; font-weight:500; }

/* JOIN */
.sh-join { border-top:4px double var(--dark); border-bottom:4px double var(--dark); }
.sh-join h3 { font-size:1.8rem; font-weight:600; letter-spacing:.1em; }
.sh-join a { font-size:.85rem; color:var(--deep); text-decoration:none; letter-spacing:.06em; display:inline-flex; align-items:center; gap:.3rem; font-weight:500; transition:gap .2s; }
.sh-join a:hover { gap:.6rem; }

/* WHO WE ARE */
.who-left { background:#ede9e3; }
.who-left h3 { font-family:'Cormorant Garamond',serif; font-size:1.8rem; font-weight:400; }
.who-left p { font-size:.85rem; line-height:1.8; color:var(--warm); }
.who-right { background:linear-gradient(145deg,#4a5c40,#7a8c6e); min-height:350px; position:relative; overflow:hidden; }
.who-right img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }

/* CATEGORIES */
.sh-cat { position:relative; overflow:hidden; aspect-ratio:4/4; cursor:pointer; text-decoration:none; border-radius:13px; display:block; }
.cat-bg,.sh-cat img { width:100%; height:100%; object-fit:cover; transition:transform .7s cubic-bezier(.22,1,.36,1); }
.sh-cat:hover .cat-bg,.sh-cat:hover img { transform:scale(1.08); }
.cat-ov { position:absolute; inset:0; background:linear-gradient(transparent 45%,rgba(26,26,24,.68) 100%); }
.cat-ct { position:absolute; bottom:0; left:0; right:0; padding:1.4rem; color:#fff; }
.cat-name { font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-weight:300; letter-spacing:.08em; transition:transform .28s; }
.sh-cat:hover .cat-name { transform:translateY(-4px); }
.cat-sub { font-size:.65rem; opacity:0; letter-spacing:.15em; text-transform:uppercase; transition:opacity .3s,transform .3s; transform:translateY(6px); }
.sh-cat:hover .cat-sub { opacity:.75; transform:none; }

/* EDITORIAL */
.sh-ed { position:relative; overflow:hidden; height:350px; cursor:pointer; text-decoration:none; display:block; }
.ed-bg,.sh-ed img { width:100%; height:100%; transition:transform .55s cubic-bezier(.22,1,.36,1); }
.sh-ed img { object-fit:cover; } .sh-ed:hover .ed-bg,.sh-ed:hover img { transform:scale(1.06); }
.ed-ov { position:absolute; inset:0; background:linear-gradient(transparent 25%,rgba(26,26,24,.72) 100%); }
.ed-ct { position:absolute; bottom:0; left:0; right:0; padding:1.4rem; color:#fff; }
.ed-tag { font-size:.60rem; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); }
.ed-title { font-family:'Cormorant Garamond',serif; font-size:1.5rem; font-weight:300; transition:letter-spacing .3s; }
.sh-ed:hover .ed-title { letter-spacing:.04em; }

/* TRUST */
.trust-icon { font-size:1.5rem; }
.trust-label { font-size:.7rem; font-weight:600; letter-spacing:.05em; }
.trust-sub { font-size:.65rem; color:var(--warm); line-height:1.5; }

      {modal && (
        <Modal p={modal} onClose={() => setModal(null)} onAdd={addToCart} />
      )}
      <div className={`sh-toast${toast ? " on" : ""}`}>{toast}</div>
    </div>
  );
}
