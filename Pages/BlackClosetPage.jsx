import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { SHFooter, SHARED_CSS } from "./shared";

/* ── DATA ── */
const ALL_PRODS = [
  {
    id: "bc-1",
    name: "Black Zip Abaya",
    price: 1200,
    old: 1600,
    material: "Classic",
    color: "Black",
    rating: 5,
    img: "/images/BC-abaya-black.png",
  },
  {
    id: "bc-2",
    name: "Blue Soriee",
    price: 2100,
    old: 2800,
    material: "Formal",
    color: "Teal",
    rating: 5,
    img: "/images/BC-blue-soriee.png",
  },
  {
    id: "bc-3",
    name: "BC Coat",
    price: 1800,
    old: null,
    material: "Casual",
    color: "Black",
    rating: 4,
    img: "/images/BC-coat.png",
  },
  {
    id: "bc-4",
    name: "BC Soriee",
    price: 2500,
    old: 3200,
    material: "Formal",
    color: "Black",
    rating: 5,
    img: "/images/BC-soriee.png",
  },
  {
    id: "bc-5",
    name: "BC Set",
    price: 1600,
    old: null,
    material: "Basics",
    color: "Creamy",
    rating: 4,
    img: "/images/BC-set.png",
  },
  {
    name: "BC Left Photo",
    price: 1400,
    old: 1900,
    material: "Classic",
    color: "Black",
    rating: 4,
    img: "/images/BC-left-photo.png",
  },
  {
    name: "Black Salty Outfit",
    price: 3100,
    old: 3800,
    material: "Formal",
    color: "Black",
    rating: 5,
    img: "/images/BC-Sotra.webp",
  },
  {
    name: "Brand Showcase",
    price: 450,
    old: null,
    material: "Basics",
    color: "Creamy",
    rating: 4,
    img: "/images/BC-modest-hijab.png",
  },
  {
    name: "Brand Feature",
    price: 1750,
    old: 2200,
    material: "Basics",
    color: "Creamy",
    rating: 4,
    img: "/images/BC-hijab-hat.png",
  },
];

const SHOP_PRODUCTS = [
  {
    name: "Black Zip Abaya",
    price: "LE 1,200",
    img: "/images/BC-abaya-black.png",
  },
  {
    name: "Blue Soriee",
    price: "LE 2,100",
    img: "/images/BC-blue-soriee.png",
  },
  {
    name: "BC Coat",
    price: "LE 2,500",
    img: "/images/BC-coat.png",
  },
  {
    name: "BC Set",
    price: "LE 1,400",
    img: "/images/BC-set.png",
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
function BCCard({ p, onWish, wishlisted }) {
  return (
    <div className="bc-card">
      <div className="ib">
        <img src={p.img} alt={p.name} loading="lazy" />
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
export default function BlackClosetPage({
  wishlist,
  toggleWish,
  cartCount,
  addToCart,
  toast,
}) {
  /* All filter state — vanilla JS logic converted to useState */
  const [activeSizes, setActiveSizes] = useState([]);
  const [activeMats, setActiveMats] = useState([]);
  const [activeCols, setActiveCols] = useState([]);
  const [priceMax, setPriceMax] = useState(4000);

  const toggleSize = (s) =>
    setActiveSizes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const toggleMat = (m) =>
    setActiveMats((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m],
    );

  const toggleCol = (c) =>
    setActiveCols((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
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
      <style>{SHARED_CSS}</style>
      <style>{`
        :root {
          --c-dark:     #1a1a1a;
          --c-darker:   #0f0f0f;
          --c-olive:    #6b7a4e;
          --c-olive-lt: #8a9963;
          --c-olive-dk: #4a5534;
          --c-cream:    #f4f0e8;
          --c-white:    #fff;
          --c-off:      #f8f8f6;
          --c-gray:     #888;
          --c-gray-lt:  #e2e2e2;
          --c-red:      #d94040;
          --fd: 'Playfair Display', serif;
          --fb: 'DM Sans', sans-serif;
          --sh-xs: 0 2px 8px rgba(0,0,0,.08);
          --sh-sm: 0 2px 12px rgba(0,0,0,.09);
          --sh-md: 0 4px 24px rgba(0,0,0,.13);
          --r:    14px;
          --r-sm:  8px;
          --ease: cubic-bezier(.4,0,.2,1);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--fb); color: var(--c-dark); background: var(--c-white); overflow-x: hidden; -webkit-font-smoothing: antialiased; }

        .bc-hero { background: linear-gradient(135deg, #ffffff 0%, #fafaf8 100%); padding: 4.5rem 0 3.5rem; border-bottom: 1px solid var(--c-gray-lt); }
        .bc-logo-wrap { width: 180px; height: 180px; flex-shrink: 0; border-radius: 50%; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,.12); background: #fff; }
        .bc-logo-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .bc-about { font-size: 1rem; color: #555; line-height: 1.8; max-width: 550px; font-weight: 400; }
        .bc-gallery { display: flex; gap: 1rem; height: 260px; margin-top: 2rem; }
        .bc-gal-img { flex: 1; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,.08); transition: all .3s ease; }
        .bc-gal-img:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.12); }
        .bc-gal-img img { width: 100%; height: 100%; object-fit: cover; object-position: center; }

        .bc-pop { padding: 5rem 0; background: linear-gradient(135deg, #ffffff 0%, #fafaf8 100%); position: relative; overflow: hidden; }
        .bc-pop-body { font-size: 1rem; color: #666; line-height: 1.8; margin-bottom: 2rem; max-width: 450px; font-weight: 400; }
        .blob { position: absolute; right: -80px; bottom: -80px; width: 380px; height: 380px; background: var(--c-dark); border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%; opacity: .04; pointer-events: none; }

        .shop-sec { padding: 3.5rem 0 2.5rem; border-bottom: 1px solid var(--c-gray-lt); background: #fff; }
        .shop-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.4rem; }
        @media(max-width:992px) { .shop-grid { grid-template-columns: repeat(2,1fr); } }
        .shop-card { border-radius: 12px; overflow: hidden; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,.06); transition: all .3s ease; border: 1px solid #f0f0f0; }
        .shop-card:hover { transform: translateY(-6px); box-shadow: 0 12px 24px rgba(0,0,0,.12); border-color: #e8e8e8; }
        .shop-card .ib { height: 240px; overflow: hidden; background: var(--c-off); }
        .shop-card .ib img { width: 100%; height: 100%; object-fit: cover; object-position: center; transition: transform .5s var(--ease); }
        .shop-card:hover .ib img { transform: scale(1.08); }
        .shop-card .pi { padding: 1rem 0.9rem; background: #fff; }
        .shop-card .pn { font-size: 0.9rem; font-weight: 600; color: var(--c-dark); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 0.4rem; }
        .shop-card .pp { font-size: 0.85rem; font-weight: 500; color: var(--c-olive-dk); }

        .bc-filter-sec { padding: 3.5rem 0 4.5rem; background: #fafaf8; }
        .bc-sidebar { background: #fff; border: 1px solid #e8e8e8; border-radius: 12px; padding: 1.8rem; position: sticky; top: 80px; box-shadow: 0 2px 8px rgba(0,0,0,.04); }
        .f-title { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: var(--c-dark); margin-bottom: 1rem; }
        .f-group { border-bottom: 1px solid #f0f0f0; padding-bottom: 1.3rem; margin-bottom: 1.3rem; }
        .f-group:last-child { border-bottom: none; margin-bottom: 0; }
        .sz-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .sz-btn { width: 36px; height: 36px; border: 1.5px solid #ddd; background: #fff; font-size: 0.75rem; font-weight: 600; cursor: pointer; border-radius: 6px; transition: all .3s ease; color: var(--c-dark); }
        .sz-btn:hover { border-color: var(--c-olive); }
        .sz-btn.on { background: var(--c-dark); color: #fff; border-color: var(--c-dark); }
        .act-tag { display: inline-flex; align-items: center; gap: 0.3rem; background: var(--c-dark); color: #fff; font-size: 0.7rem; padding: 0.3rem 0.7rem; border-radius: 12px; margin: 0.2rem; cursor: pointer; transition: all .2s ease; border: none; font-weight: 500; }
        .act-tag:hover { background: var(--c-red); }
        .mat-opt, .col-opt { display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: var(--c-dark); margin-bottom: 0.5rem; cursor: pointer; }
        .mat-opt input, .col-opt input { accent-color: var(--c-olive); cursor: pointer; }
        .col-dot { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid #ddd; flex-shrink: 0; }
        .price-slider { width: 100%; accent-color: var(--c-olive); }
        .price-vals { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--c-gray); margin-top: 0.5rem; }

        .bc-prod-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.3rem; }
        @media(max-width:768px) { .bc-prod-grid { grid-template-columns: repeat(2,1fr); } }
        .bc-card { background: var(--c-white); border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.06); cursor: pointer; position: relative; transition: all .3s ease; border: 1px solid #f5f5f5; }
        .bc-card:hover { transform: translateY(-8px); box-shadow: 0 16px 32px rgba(0,0,0,.12); border-color: #eee; }
        .bc-card .ib { position: relative; height: 260px; overflow: hidden; background: var(--c-off); border-radius: 12px 12px 0 0; }
        .bc-card .ib img { width: 100%; height: 100%; object-fit: cover; object-position: center; transition: transform .5s var(--ease); }
        .bc-card:hover .ib img { transform: scale(1.08); }
        .bc-card .wish-btn { position: absolute; top: 0.8rem; right: 0.8rem; width: 38px; height: 38px; border-radius: 50%; background: #fff; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--c-gray); transition: all .2s; box-shadow: 0 2px 8px rgba(0,0,0,.1); }
        .bc-card .wish-btn:hover { background: var(--c-red); color: #fff; }
        .bc-card .wish-btn.liked { color: var(--c-red); }
        .bc-card .pi { padding: 1.1rem 1rem; background: #fff; border-radius: 0 0 12px 12px; }
        .bc-card .pn { font-size: 0.9rem; font-weight: 600; color: var(--c-dark); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 0.4rem; }
        .bc-card .pp { font-size: 0.85rem; font-weight: 600; color: var(--c-olive-dk); }
        .bc-card .po { font-size: 0.75rem; color: var(--c-gray); text-decoration: line-through; margin-right: 0.4rem; }
        .stars { display: flex; gap: 2px; margin-bottom: 0.4rem; }
        .stars i { font-size: 0.7rem; }
        .empty { text-align: center; padding: 4rem 1.5rem; color: var(--c-gray); }
        .empty i { font-size: 3rem; color: var(--c-gray-lt); margin-bottom: 1.2rem; display: block; }

        .btn-out { background: transparent; color: var(--c-dark); border: 1.5px solid var(--c-dark); padding: 0.75rem 1.5rem; font-size: 0.75rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; border-radius: 6px; transition: all .3s ease; width: 100%; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateX(0); } }

        /* Enhanced Typography */
        .sec-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 500; color: var(--c-dark); margin-bottom: 1rem; letter-spacing: -0.5px; }
        .sec-line { width: 60px; height: 3px; background: var(--c-olive); margin-bottom: 2rem; border-radius: 2px; }
        .sec-line.left { margin-left: 0; }

        /* Button Enhancements */
        .btn-dk { background: var(--c-dark); color: #fff; border: none; padding: 1rem 2.5rem; font-size: 0.85rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; border-radius: 6px; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,.1); }
        .btn-dk:hover { background: var(--c-olive); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,.15); }
      `}</style>
      <Navbar cart={cartCount} wish={wishlist} />

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
                  <img src="/images/BC-logo.png" alt="The Black Closet Logo" />
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
                  <img
                    src="/images/BC-left-photo.png"
                    alt="Black Closet Style"
                  />
                </div>
                <div className="bc-gal-img">
                  <img src="/images/BC-soriee.png" alt="Soriee" />
                </div>
                <div className="bc-gal-img">
                  <img src="/images/BC-set.png" alt="BC Set" />
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
              <div style={{ position: "relative", height: "380px" }}>
                <div
                  style={{
                    position: "absolute",
                    right: "-80px",
                    bottom: "-80px",
                    width: "340px",
                    height: "340px",
                    background: "var(--c-dark)",
                    borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
                    zIndex: 0,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    height: "360px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    marginRight: "40px",
                    boxShadow: "0 12px 40px rgba(0,0,0,.15)",
                  }}
                >
                  <img
                    src="/images/BC-blue-soriee.png"
                    alt="Popular"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
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
                    ),
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
                    <BCCard
                      key={i}
                      p={p}
                      onWish={toggleWish}
                      wishlisted={wishlist.includes(p.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <SHFooter />
      <div className={`sh-toast ${toast ? "on" : ""}`}>{toast}</div>
    </div>
  );
}
