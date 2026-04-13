import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/men.css";
import "../styles/men-interactive.css";

/* ══════════════════════════════════════════ DATA ══════════════════════════════════════════ */
const HERO_SLIDES = [
  {
    ey: "New Collection 2026",
    h1: "Find Your Favorite\nTrendy Outfits!",
    sub: "Discover the latest looks from Egypt's top local brands.",
    btn: "Shop Now",
    img: "/images/slider_photo.jpg",
    bg: "#eaeaea",
  },
  {
    ey: "End of Season Deals",
    h1: "Premium Style\nAt Lower Prices",
    sub: "Up to 50% off selected items from local designers.",
    btn: "Explore Sale",
    img: "/images/hero2.png",
    bg: "#ede9e0",
  },
  {
    ey: "Local Brands Spotlight",
    h1: "Wear What\nMakes You Bold",
    sub: "Support Egyptian creators — every purchase matters.",
    btn: "Meet the Brands",
    img: "/images/hero3.png",
    bg: "#f0ece8",
  },
];
const CATEGORIES = [
  {
    name: "Pants",
    img: "/images/c38e89ffa622a558b4ee754be87c9d464f502752.png",
    count: "24 styles",
  },
  {
    name: "T-Shirts",
    img: "/images/28052072a156938200eaac190138469eb060dbe9.png",
    count: "18 styles",
  },
  {
    name: "Jackets",
    img: "/images/7b624c763a3047449139d87a13d82445230b27a1.png",
    count: "12 styles",
  },
];
const NEW_ARRIVALS = [
  {
    id: "na-1",
    name: "Black Zip Abaya",
    price: 1200,
    brand: "Black Closet",
    img: "/images/new_arr_1.png",
    rating: 4.8,
    reviews: 124,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#1a1a1a", "#4a4a4a"],
  },
  {
    id: "na-2",
    name: "Crimson Satin Dress",
    price: 2100,
    brand: "Tajamml",
    img: "/images/new_arr_2.png",
    rating: 4.9,
    reviews: 89,
    sizes: ["XS", "S", "M", "L"],
    colors: ["#8b1a2e", "#1a1a1a"],
  },
  {
    id: "na-3",
    name: "Olive Forest Abaya",
    price: 1800,
    brand: "Antika",
    img: "/images/new_arr_3.png",
    rating: 4.7,
    reviews: 56,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#4a5c38"],
  },
  {
    id: "na-4",
    name: "Teal Ruffle Abaya",
    price: 2500,
    old: 3200,
    brand: "Richness",
    img: "/images/new_arr_4.webp",
    rating: 4.9,
    reviews: 203,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#2a7d8c"],
    tag: "Sale",
  },
  {
    id: "na-5",
    name: "Beige Poncho Set",
    price: 1600,
    brand: "Sotra",
    img: "/images/new_arr_6.jpeg",
    rating: 4.6,
    reviews: 167,
    sizes: ["S/M", "L/XL"],
    colors: ["#c8b89a"],
  },
];
const TRENDING = [
  {
    id: "tr-1",
    name: "Twenty Seven Puff Hoodie",
    price: 1200,
    brand: "Twenty Seven",
    img: "/images/87f3863a35134ab6fed9cf27d4fa1a0214789e87.png",
    rating: 4.7,
    reviews: 88,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#888", "#1a1a1a"],
  },
  {
    id: "tr-2",
    name: "Moon Walk Puff Print Pants",
    price: 2100,
    brand: "Moon Walk",
    img: "/images/8672b4984420818e2bfea5702f1af4840aa0ad21.png",
    rating: 4.8,
    reviews: 62,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#2a5a8c"],
    tag: "New",
  },
  {
    id: "tr-3",
    name: "Wide Leg Jeans",
    price: 1800,
    brand: "Salty",
    img: "/images/29c068db4a2c11a9e604985ece90c94ae6e3b472.png",
    rating: 4.6,
    reviews: 45,
    sizes: ["XS", "S", "M", "L"],
    colors: ["#4a6890"],
  },
  {
    id: "tr-4",
    name: "Teal Ruffle Abaya",
    price: 2500,
    old: 3200,
    brand: "Richness",
    img: "/images/27939c1f8b958ffe72794882dc7504e80c74f676.png",
    rating: 4.9,
    reviews: 74,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#2a7d8c"],
    tag: "Sale",
  },
  {
    id: "tr-5",
    name: "Beige Poncho Set",
    price: 1600,
    brand: "Sotra",
    img: "/images/28052072a156938200eaac190138469eb060dbe9.png",
    rating: 4.5,
    reviews: 39,
    sizes: ["S/M", "L/XL"],
    colors: ["#c8b89a"],
  },
  {
    id: "tr-6",
    name: "Grey Wool Abaya",
    price: 1400,
    brand: "Black Closet",
    img: "/images/093b2d43a9c4d3aff1e3f64cf82c73fed5c2ec0d.png",
    rating: 4.6,
    reviews: 54,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#555", "#333"],
  },
];
const TOP_PICKS = [
  {
    id: "pk-1",
    name: "Knitted Winter Polo",
    price: 900,
    brand: "Marble",
    brandLogo: "/images/Marble.png",
    img: "/images/c7bd36ff385aa5015a18fe1973a7820c9fd65fe0.png",
    rating: 4.8,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#1a1a1a", "#fff"],
  },
  {
    id: "pk-2",
    name: "Basic Hoodie",
    price: 700,
    brand: "Twenty Seven",
    brandLogo: "/images/27.png",
    img: "/images/e37eaa7bbbf402f1033ace13c719755237a3ee82.png",
    rating: 4.7,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#c8a88a", "#1a1a1a"],
  },
  {
    id: "pk-3",
    name: "Pleated Trouser",
    price: 1500,
    brand: "Salty",
    brandLogo: "/images/salty.avif",
    img: "/images/f05ec6cea80ca6c85a36997bcef1fb878681373b.png",
    rating: 4.6,
    sizes: ["XS", "S", "M", "L"],
    colors: ["#f5f0e0", "#1a1a1a"],
  },
  {
    id: "pk-4",
    name: "Twenty Seven Puff Hoodie",
    price: 900,
    brand: "Twenty Seven",
    brandLogo: "/images/27.png",
    img: "/images/c7bd36ff385aa5015a18fe1973a7820c9fd65fe0.png",
    rating: 4.9,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#1a1a1a", "#888"],
  },
];

/* ══════════════════════════════════════════ HELPERS ══════════════════════════════════════════ */
function Stars({ n }) {
  return (
    <span className="stars-row">
      {[1, 2, 3, 4, 5].map((i) => (
        <i
          key={i}
          className={`bi bi-star${i <= Math.round(n) ? "-fill" : ""}`}
        />
      ))}
    </span>
  );
}
function useReveal() {
  const refs = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("revealed")
        ),
      { threshold: 0.08 }
    );
    refs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);
  return useCallback((el) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  }, []);
}

/* ══════════════════════════════════════════ QUICK VIEW MODAL ══════════════════════════════════════════ */
function QuickViewModal({ p, onClose, onAddToCart }) {
  const navigate = useNavigate();
  const [selSize, setSelSize] = useState(null);
  const [selColor, setSelColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [sizeErr, setSizeErr] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleAdd = () => {
    if (!selSize) {
      setSizeErr(true);
      return;
    }
    setSizeErr(false);
    setAdded(true);
    onAddToCart();
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      className="qv-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="qv-modal">
        <button className="qv-close" onClick={onClose}>
          <i className="bi bi-x-lg" />
        </button>
        <div className="qv-img-col">
          <img src={p.img} alt={p.name} className="qv-img" />
          {p.tag && (
            <span className={`qv-tag ${p.tag === "Sale" ? "sale" : "new"}`}>
              {p.tag}
            </span>
          )}
        </div>
        <div className="qv-info-col">
          <div className="qv-brand">{p.brand}</div>
          <h2 className="qv-name">{p.name}</h2>
          <div className="qv-rating">
            <Stars n={p.rating} />
            <span className="qv-rating-txt">
              {p.rating} · {p.reviews} reviews
            </span>
          </div>
          <div className="qv-prices">
            {p.old && (
              <span className="qv-old">LE {p.old.toLocaleString()}</span>
            )}
            <span className="qv-price">LE {p.price.toLocaleString()}</span>
            {p.old && (
              <span className="qv-off">
                {Math.round((1 - p.price / p.old) * 100)}% OFF
              </span>
            )}
          </div>
          <div className="qv-divider" />
          {p.colors?.length > 0 && (
            <div className="qv-row">
              <span className="qv-lbl">Color</span>
              <div className="qv-colors">
                {p.colors.map((c, i) => (
                  <button
                    key={i}
                    className={`qv-color ${selColor === i ? "on" : ""}`}
                    style={{ background: c }}
                    onClick={() => setSelColor(i)}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="qv-row align-items-start">
            <span className="qv-lbl">Size</span>
            <div>
              <div className="qv-sizes">
                {p.sizes?.map((s) => (
                  <button
                    key={s}
                    className={`qv-sz ${selSize === s ? "on" : ""}`}
                    onClick={() => {
                      setSelSize(s);
                      setSizeErr(false);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeErr && <p className="qv-sz-err">Please select a size</p>}
            </div>
          </div>
          <div className="qv-row">
            <span className="qv-lbl">Qty</span>
            <div className="qv-qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
          </div>
          <div className="qv-divider" />
          <div className="qv-btns">
            <button
              className={`qv-add ${added ? "added" : ""}`}
              onClick={handleAdd}
            >
              <i className={`bi ${added ? "bi-check-lg" : "bi-bag"} me-2`} />
              {added ? "Added!" : "Add to Cart"}
            </button>
            <button
              className="qv-full"
              onClick={() => {
                onClose();
                navigate(`/product/${p.id}`, { state: { product: p } });
              }}
            >
              Full Details <i className="bi bi-arrow-right ms-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ PRODUCT CARD ══════════════════════════════════════════ */
function ProdCard({ p, onQuickView, onWish, wishlisted, addRef, d = 1 }) {
  const navigate = useNavigate();
  return (
    <div
      className={`prod-card reveal d${d}`}
      ref={addRef}
      onClick={() => navigate(`/product/${p.id}`, { state: { product: p } })}
    >
      <div className="ib">
        {p.tag && (
          <span className={`tag-b ${p.tag === "Sale" ? "sale" : ""}`}>
            {p.tag}
          </span>
        )}
        <img src={p.img} alt={p.name} loading="lazy" />
        <div className="pc-hover-ov">
          <button
            className="pc-qv-btn"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(p);
            }}
          >
            <i className="bi bi-eye me-1" /> Quick View
          </button>
        </div>
        <button
          className={`wish-btn ${wishlisted ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onWish(p.id);
          }}
        >
          <i className={`bi ${wishlisted ? "bi-heart-fill" : "bi-heart"}`} />
        </button>
      </div>
      <div className="prod-info">
        {p.brand && <div className="prod-brand-lbl">{p.brand}</div>}
        <div className="prod-name">{p.name}</div>
        {p.rating && (
          <div className="prod-stars-row">
            <Stars n={p.rating} />
            <span className="prod-rev-cnt">({p.reviews})</span>
          </div>
        )}
        <div className="prod-price-row">
          {p.old && (
            <span className="prod-old">LE {p.old.toLocaleString()}</span>
          )}
          <span className="prod-price">LE {p.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ PICK CARD ══════════════════════════════════════════ */
function PickCard({ p, onQuickView, onWish, wishlisted, addRef, d = 1 }) {
  const navigate = useNavigate();
  return (
    <div
      className={`pick-card reveal d${d}`}
      ref={addRef}
      onClick={() => navigate(`/product/${p.id}`, { state: { product: p } })}
    >
      <div className="ib">
        <img src={p.img} alt={p.name} loading="lazy" />
        <div className="pc-hover-ov">
          <button
            className="pc-qv-btn"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(p);
            }}
          >
            <i className="bi bi-eye me-1" /> Quick View
          </button>
        </div>
        <button
          className={`wish-btn ${wishlisted ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onWish(p.id);
          }}
        >
          <i className={`bi ${wishlisted ? "bi-heart-fill" : "bi-heart"}`} />
        </button>
      </div>
      <div className="pick-info">
        <div className="pick-text">
          <div className="prod-name">{p.name}</div>
          <div className="prod-price">LE {p.price.toLocaleString()}</div>
          {p.rating && <Stars n={p.rating} />}
        </div>
        <img
          src={p.brandLogo}
          alt="brand"
          className="pick-brand-logo"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ HERO ══════════════════════════════════════════ */
function HeroCarousel() {
  const [cur, setCur] = useState(0);
  const [key, setKey] = useState(0);

  const go = useCallback((dir) => {
    setCur((i) => (i + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
    setKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  }, [go]);

  const s = HERO_SLIDES[cur];

  return (
    <div className="hero" style={{ background: s.bg }}>
      <div className="hero-slide active" key={key}>
        <div className="hero-txt">
          <div className="hero-ey">{s.ey}</div>
          <h1 className="hero-h1">
            {s.h1.split("\n").map((l, i) => (
              <span key={i}>
                {l}
                <br />
              </span>
            ))}
          </h1>
          <p className="hero-sub">{s.sub}</p>
          <div className="d-flex gap-3 flex-wrap">
            <button className="btn-dk">{s.btn}</button>
            <button className="btn-ol-hero">View Lookbook</button>
          </div>
        </div>
        <div className="hero-img">
          <img src={s.img} alt={s.h1} />
        </div>
      </div>
      <button className="hero-arrow p" onClick={() => go(-1)}>
        <i className="bi bi-chevron-left" />
      </button>
      <button className="hero-arrow n" onClick={() => go(1)}>
        <i className="bi bi-chevron-right" />
      </button>
      <div className="hero-dots">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === cur ? "on" : ""}`}
            onClick={() => {
              setCur(i);
              setKey((k) => k + 1);
            }}
          />
        ))}
      </div>
      <div className="hero-counter">
        <span>{String(cur + 1).padStart(2, "0")}</span>
        <span className="hero-sep"> / </span>
        <span style={{ opacity: 0.5 }}>
          {String(HERO_SLIDES.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ MAIN ══════════════════════════════════════════ */
export default function MenPage() {
  const addRef = useReveal();
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [quickView, setQuickView] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };
  const addToCart = () => {
    setCartCount((c) => c + 1);
    showToast("✓  Added to cart");
  };
  const toggleWish = (id) => {
    setWishlist((prev) => {
      const isIn = prev.includes(id);
      showToast(isIn ? "Removed from wishlist" : "♥  Added to wishlist");
      return isIn ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  const newArrRef = useRef(null);
  const scroll = (ref, dir) =>
    ref.current?.scrollBy({ left: dir * 250, behavior: "smooth" });

  useEffect(() => {
    document.title = `StyleHub — Men${cartCount > 0 ? ` (${cartCount})` : ""}`;
  }, [cartCount]);

  return (
    <div>
      <Navbar cartCount={cartCount} wishCount={wishlist.length} />

      <HeroCarousel />

      {/* CATEGORIES */}
      <section className="cat-sec">
        <div className="container">
          <h2 className="sec-title reveal" ref={addRef}>
            Categories
          </h2>
          <div className="sec-line reveal" ref={addRef} />
          <div className="row g-3">
            {CATEGORIES.map((c, i) => (
              <div className="col-12 col-md-4" key={i}>
                <div className={`cat-card reveal d${i + 1}`} ref={addRef}>
                  <img
                    src={c.img}
                    alt={c.name}
                    style={{ objectPosition: "top" }}
                  />
                  <div className="cat-ov">
                    <div className="cat-name">{c.name}</div>
                    <div className="cat-count">{c.count}</div>
                    <button className="cat-btn">Shop Now →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="sp bg-white">
        <div className="container">
          <h2 className="sec-title reveal" ref={addRef}>
            New Arrivals
          </h2>
          <div className="sec-line reveal" ref={addRef} />
          <div className="sc-wrap">
            <button className="sc-btn l" onClick={() => scroll(newArrRef, -1)}>
              <i className="bi bi-chevron-left" />
            </button>
            <div className="sc-track no-sb" ref={newArrRef}>
              {NEW_ARRIVALS.map((p, i) => (
                <ProdCard
                  key={p.id}
                  p={p}
                  d={(i % 3) + 1}
                  addRef={addRef}
                  onQuickView={setQuickView}
                  onWish={toggleWish}
                  wishlisted={wishlist.includes(p.id)}
                />
              ))}
            </div>
            <button className="sc-btn r" onClick={() => scroll(newArrRef, 1)}>
              <i className="bi bi-chevron-right" />
            </button>
          </div>
        </div>
      </section>

      {/* SALE BANNER */}
      <section className="sale-ban reveal" ref={addRef}>
        <div className="sale-ban-inner">
          <img
            src="/images/596a6678c10621f1c33dc5e4b75d27e3367fa552.png"
            alt="End of Season Sale"
          />
          <div className="sale-ban-text">
            <p className="sale-sub">Limited Time Only</p>
            <h2>END OF SEASON SALE</h2>
            <button className="sale-cta-btn">Shop the Sale →</button>
          </div>
        </div>
      </section>

      {/* TRENDING NOW */}
      <section className="sp">
        <div className="container">
          <h2 className="sec-title reveal" ref={addRef}>
            Trending Now
          </h2>
          <div className="sec-line reveal" ref={addRef} />
          <div className="trend-g">
            {TRENDING.map((p, i) => (
              <ProdCard
                key={p.id}
                p={p}
                d={(i % 3) + 1}
                addRef={addRef}
                onQuickView={setQuickView}
                onWish={toggleWish}
                wishlisted={wishlist.includes(p.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TOP PICKS */}
      <section className="sp bg-white">
        <div className="container">
          <h2 className="sec-title reveal" ref={addRef}>
            Top Picks
          </h2>
          <p
            className="text-center mb-1 reveal"
            ref={addRef}
            style={{ fontSize: ".82rem", color: "var(--c-gray)" }}
          >
            Discover the most popular pieces from different brands.
          </p>
          <div className="sec-line reveal" ref={addRef} />
          <div className="picks-g">
            {TOP_PICKS.map((p, i) => (
              <PickCard
                key={p.id}
                p={p}
                d={(i % 4) + 1}
                addRef={addRef}
                onQuickView={setQuickView}
                onWish={toggleWish}
                wishlisted={wishlist.includes(p.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {quickView && (
        <QuickViewModal
          p={quickView}
          onClose={() => setQuickView(null)}
          onAddToCart={addToCart}
        />
      )}

      <div className={`sh-toast ${toast ? "on" : ""}`}>{toast}</div>

      <Footer />
    </div>
  );
}
