import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/men.css";
import "../styles/black-closet.css";

/* ── DATA ── */
const ALL_PRODS = [
  {
    name: "Black Zip Abaya",
    price: 1200,
    old: 1600,
    material: "Classic",
    color: "Black",
    rating: 5,
    img: "/images/brand2.avif",
  },
  {
    name: "Crimson Satin Dress",
    price: 2100,
    old: 2800,
    material: "Formal",
    color: "Red",
    rating: 5,
    img: "/images/prod-red-dress.png",
  },
  {
    name: "Olive Garden Abaya",
    price: 1800,
    old: null,
    material: "Casual",
    color: "Creamy",
    rating: 4,
    img: "/images/prod-green-abaya.png",
  },
  {
    name: "Teal Ruffle Abaya",
    price: 2500,
    old: 3200,
    material: "Formal",
    color: "Teal",
    rating: 5,
    img: "/images/prod-teal-abaya.png",
  },
  {
    name: "Beige Poncho Set",
    price: 1600,
    old: null,
    material: "Basics",
    color: "Creamy",
    rating: 4,
    img: "/images/Sotra.webp",
  },
  {
    name: "Grey Wool Abaya",
    price: 1400,
    old: 1900,
    material: "Classic",
    color: "Black",
    rating: 4,
    img: "/images/prod-grey-abaya.png",
  },
  {
    name: "Royal Blue Gown",
    price: 3100,
    old: 3800,
    material: "Formal",
    color: "Black",
    rating: 5,
    img: "/images/brand5.png",
  },
  {
    name: "Gold Hand Chain",
    price: 450,
    old: null,
    material: "Spony",
    color: "Creamy",
    rating: 4,
    img: "/images/prod-jewelry.png",
  },
  {
    name: "Beige Cape Dress",
    price: 1750,
    old: 2200,
    material: "Basics",
    color: "Creamy",
    rating: 4,
    img: "/images/prod-poncho2.png",
  },
];

const SHOP_PRODUCTS = [
  { name: "Black Zip Abaya", price: "LE 1,200", img: "/images/brand2.avif" },
  {
    name: "Crimson Satin Dress",
    price: "LE 2,100",
    img: "/images/prod-red-dress.png",
  },
  {
    name: "Teal Ruffle Abaya",
    price: "LE 2,500",
    img: "/images/prod-teal-abaya.png",
  },
  {
    name: "Grey Wool Abaya",
    price: "LE 1,400",
    img: "/images/prod-grey-abaya.png",
  },
];

/* ── STARS ── */
function Stars({ n }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <i
          key={i}
          className={`bi bi-star${i <= n ? "-fill" : ""}`}
          style={{ color: i <= n ? "#d4a843" : "#ddd" }}
        />
      ))}
    </div>
  );
}

/* ── BC PRODUCT CARD ── */
function BCCard({ p }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="bc-card">
      <div className="ib">
        <img src={p.img} alt={p.name} loading="lazy" />
        <button
          className={`wish-btn ${liked ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
        >
          <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`} />
        </button>
      </div>
      <div className="pi">
        <Stars n={p.rating} />
        <div className="pn">{p.name}</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {p.old && <span className="po">LE {p.old.toLocaleString()}</span>}
          <span className="pp">LE {p.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function BlackClosetPage() {
  /* All filter state — vanilla JS logic converted to useState */
  const [activeSizes, setActiveSizes] = useState([]);
  const [activeMats, setActiveMats] = useState([]);
  const [activeCols, setActiveCols] = useState([]);
  const [priceMax, setPriceMax] = useState(4000);

  const toggleSize = (s) =>
    setActiveSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const toggleMat = (m) =>
    setActiveMats((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );

  const toggleCol = (c) =>
    setActiveCols((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const clearAll = () => {
    setActiveSizes([]);
    setActiveMats([]);
    setActiveCols([]);
    setPriceMax(4000);
  };

  /* Filter logic */
  const filtered = ALL_PRODS.filter((p) => {
    const mOk = activeMats.length === 0 || activeMats.includes(p.material);
    const cOk = activeCols.length === 0 || activeCols.includes(p.color);
    return mOk && cOk && p.price <= priceMax;
  });

  const allTags = [
    ...activeSizes.map((s) => ({ label: s, clear: () => toggleSize(s) })),
    ...activeMats.map((m) => ({ label: m, clear: () => toggleMat(m) })),
    ...activeCols.map((c) => ({ label: c, clear: () => toggleCol(c) })),
  ];

  return (
    <div>
      <Navbar />

      {/* ── BRAND HERO ── */}
      <section className="bc-hero">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-6">
              <div
                className="d-flex align-items-center gap-4"
                style={{ animation: "slideR .6s ease both" }}
              >
                <div className="bc-logo-wrap">
                  <img
                    src="/images/logo-blackcloset.png"
                    alt="The Black Closet Logo"
                  />
                </div>
                <p className="bc-about">
                  Black Closet has been founded in 2016 to fill a gap in the
                  market mainly presenting "one-piece" outfits (dresses, abayas,
                  etc). Simplicity is the key! Even the fashion industry is more
                  diverse than ever, the veiled woman finds it hard to meet her
                  need for the modest elegance.
                </p>
              </div>
            </div>
            <div
              className="col-12 col-md-6"
              style={{ animation: "fadeIn .7s .2s ease both" }}
            >
              <div className="bc-gallery">
                <div className="bc-gal-img">
                  <img src="/images/brand2.avif" alt="Black Abaya" />
                </div>
                <div className="bc-gal-img">
                  <img src="/images/prod-red-dress.png" alt="Red Dress" />
                </div>
                <div className="bc-gal-img">
                  <img src="/images/prod-green-abaya.png" alt="Green Abaya" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEE WHAT'S POPULAR ── */}
      <section className="bc-pop">
        <div className="blob" />
        <div className="container">
          <div className="row align-items-center g-5">
            <div
              className="col-12 col-md-6"
              style={{ animation: "slideR .6s ease both" }}
            >
              <h2 className="sec-title left">See What's Popular</h2>
              <div className="sec-line left" />
              <p className="bc-pop-body">
                Black Closet has been founded in 2016 to fill a gap in the
                market mainly presenting "one-piece" outfits (dresses, abayas,
                etc). Simplicity is the key! Even the fashion industry is more
                diverse than ever, the veiled woman finds it hard to meet her
                need for the modest elegance.
              </p>
              <button className="btn-dk">Click Here</button>
            </div>
            <div
              className="col-12 col-md-6"
              style={{ animation: "fadeUp .6s .2s ease both" }}
            >
              <div style={{ position: "relative", height: "340px" }}>
                <div
                  style={{
                    position: "absolute",
                    right: "-20px",
                    bottom: "-20px",
                    width: "240px",
                    height: "240px",
                    background: "var(--c-dark)",
                    borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
                    zIndex: 0,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    height: "320px",
                    borderRadius: "var(--r)",
                    overflow: "hidden",
                    marginRight: "30px",
                  }}
                >
                  <img
                    src="/images/prod-teal-abaya.png"
                    alt="Popular"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHOP BY BLACK CLOSET ── */}
      <section className="shop-sec">
        <div className="container">
          <h2 className="sec-title">Shop By Black Closet</h2>
          <div className="sec-line" />
          <div className="shop-grid">
            {SHOP_PRODUCTS.map((p, i) => (
              <div className="shop-card" key={i}>
                <div className="ib">
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                <div className="pi">
                  <div className="pn">{p.name}</div>
                  <div className="pp">{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTERS + PRODUCTS ── */}
      <section className="bc-filter-sec">
        <div className="container">
          <div className="row g-4">
            {/* Sidebar */}
            <div className="col-12 col-lg-3">
              <div className="bc-sidebar">
                {/* Size */}
                <div className="f-group">
                  <div className="f-title">Size</div>
                  <div className="sz-row">
                    {["XS", "S", "M", "L", "XL"].map((s) => (
                      <button
                        key={s}
                        className={`sz-btn ${
                          activeSizes.includes(s) ? "on" : ""
                        }`}
                        onClick={() => toggleSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active filters */}
                {allTags.length > 0 && (
                  <div className="f-group">
                    <div className="f-title">Active Filters</div>
                    {allTags.map((t, i) => (
                      <button key={i} className="act-tag" onClick={t.clear}>
                        {t.label} <i className="bi bi-x" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Material */}
                <div className="f-group">
                  <div className="f-title">Material</div>
                  {["Casual", "Formal", "Basics", "Spony", "Classic"].map(
                    (m) => (
                      <label key={m} className="mat-opt">
                        <input
                          type="checkbox"
                          checked={activeMats.includes(m)}
                          onChange={() => toggleMat(m)}
                        />{" "}
                        {m}
                      </label>
                    )
                  )}
                </div>

                {/* Color */}
                <div className="f-group">
                  <div className="f-title">Color</div>
                  {[
                    { name: "Black", bg: "#1a1a1a" },
                    { name: "Creamy", bg: "#f5f0e0", border: "1px solid #ccc" },
                    { name: "Teal", bg: "#2a7d8c" },
                    { name: "Red", bg: "#8b1a2e" },
                  ].map((c) => (
                    <label key={c.name} className="col-opt">
                      <input
                        type="checkbox"
                        checked={activeCols.includes(c.name)}
                        onChange={() => toggleCol(c.name)}
                      />
                      <span
                        className="col-dot"
                        style={{ background: c.bg, border: c.border }}
                      />
                      {c.name}
                    </label>
                  ))}
                </div>

                {/* Price */}
                <div className="f-group">
                  <div className="f-title">By Price</div>
                  <input
                    type="range"
                    className="price-slider"
                    min={500}
                    max={4000}
                    step={50}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                  />
                  <div className="price-vals">
                    <span>LE 500</span>
                    <span>LE {priceMax.toLocaleString()}</span>
                  </div>
                </div>

                <button className="btn-out mt-2" onClick={clearAll}>
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Products grid */}
            <div className="col-12 col-lg-9">
              {filtered.length === 0 ? (
                <div className="empty">
                  <i className="bi bi-bag-x" />
                  <p>
                    No products match your filters.
                    <br />
                    Try adjusting them.
                  </p>
                  <button className="btn-dk mt-3" onClick={clearAll}>
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="bc-prod-grid">
                  {filtered.map((p, i) => (
                    <BCCard key={i} p={p} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
