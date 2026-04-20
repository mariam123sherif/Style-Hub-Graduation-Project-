import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SHARED_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
:root { --cream:#F8F6F2; --dark:#1a1a18; --sage:#92A079; --deep:#728060; --warm:#8c8880; --border:#e4e0da; --gold:#c8a96e; --red:#e63946; }
body { font-family:'DM Sans',sans-serif; background:var(--cream); color:var(--dark); }

/* NAV */
.sh-nav { background:#fff; border-bottom:1px solid var(--border); height:56px; }
.sh-nav a { color:var(--dark); text-decoration:none; font-size:1rem; letter-spacing:.04em; transition:color .2s; position:relative; padding-bottom:3px; }
.sh-nav a::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1.6px; background:var(--sage); transition:width .25s; }
.sh-nav a:hover { color:var(--sage); } .sh-nav a:hover::after { width:100%; }
.sh-badge { background:var(--sage); color:#fff; font-size:.5rem; width:14px; height:14px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; position:absolute; top:-6px; right:-8px; }
.nav-icon { color:var(--dark); display:flex; align-items:center; position:relative; transition:color .2s; cursor:pointer; text-decoration:none; }
.nav-icon:hover { color:var(--sage); }

/* SELL WITH US BUTTON */
.sell-btn {
  display:inline-flex; align-items:center; gap:6px;
  background:#7b8b5b; color:#fff !important;
  padding:.32rem .9rem; border-radius:20px;
  font-size:.72rem !important; font-weight:700 !important;
  letter-spacing:.5px; text-decoration:none !important;
  transition:background .2s, transform .15s !important;
  white-space:nowrap;
}
.sell-btn::after { display:none !important; }
.sell-btn:hover { background:#5e6d41 !important; color:#fff !important; transform:translateY(-1px); }
.sell-btn i { font-size:.7rem; }

/* TRY-ON BUTTON */
.tryon-btn {
  display:inline-flex; align-items:center; gap:6px;
  background:linear-gradient(135deg, #c8a96e, #a07850); color:#fff !important;
  padding:.32rem .9rem; border-radius:20px;
  font-size:.72rem !important; font-weight:700 !important;
  letter-spacing:.5px; text-decoration:none !important;
  transition:background .2s, transform .15s !important;
  white-space:nowrap;
}
.tryon-btn::after { display:none !important; }
.tryon-btn:hover { background:linear-gradient(135deg, #a07850, #7a5c30) !important; color:#fff !important; transform:translateY(-1px); }

/* DROPDOWN */
.nav-item { position:relative; }
.nav-item:hover .dropdown { opacity:1; pointer-events:auto; transform:translateY(0); }
.dropdown { position:absolute; top:100%; left:0; background:#fff; border:1px solid var(--border); min-width:160px; opacity:0; pointer-events:none; transform:translateY(8px); transition:all .25s; z-index:100; box-shadow:0 8px 24px rgba(0,0,0,.08); }
.dropdown a { display:block; padding:.6rem 1.2rem; font-size:.72rem; color:var(--dark); text-decoration:none; letter-spacing:.04em; transition:background .2s; }
.dropdown a:hover { background:var(--cream); color:var(--sage); }

/* FOOTER */
.sh-foot { background:var(--deep); color:rgba(255,255,255,.8); }
.f-logo-txt { font-family:'Cormorant Garamond',serif; font-size:1.5rem; font-weight:500; color:#fff; text-decoration:none; }
.f-about { font-size:.78rem; line-height:1.7; color:rgba(255,255,255,.55); }
.f-soc { width:30px; height:30px; border:1px solid rgba(255,255,255,.3); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.65rem; color:rgba(255,255,255,.6); text-decoration:none; transition:all .2s; }
.f-soc:hover { background:rgba(255,255,255,.15); color:#fff; }
.f-col-title { font-size:.64rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.45); font-weight:500; }
.f-col a { display:block; font-size:.78rem; color:rgba(255,255,255,.7); text-decoration:none; transition:all .2s; }
.f-col a:hover { color:#fff; }
.sh-foot a { color:rgba(255,255,255,.7); text-decoration:none; } .sh-foot a:hover { color:#fff; }
.f-copy { font-size:.7rem; color:rgba(255,255,255,.35); }
.fpb { background:rgba(255,255,255,.12); border-radius:3px; padding:.2rem .5rem; font-size:.58rem; color:rgba(255,255,255,.6); font-weight:600; }

/* REVEAL */
.reveal { opacity:0; transform:translateY(24px); transition:opacity .7s,transform .7s; }
.revealed { opacity:1; transform:none; }
.d1{transition-delay:.1s} .d2{transition-delay:.2s} .d3{transition-delay:.3s} .d4{transition-delay:.4s}
`;

const BRANDS = [
  { name: "27", logo: "/27.jpg", href: "#" },
  { name: "MARBLE", logo: "/marble.jpg", href: "#" },
  { name: "أنتيكا", logo: "/aa.jpg", href: "#" },
  { name: "salty", logo: "/saltyy.jpg", href: "/brand/salty" },
  { name: "Ninos", logo: "/ninos.jpg", href: "/brand/ninos" },
  { name: "Black closet", logo: "/bb.jpg", href: "#" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Women", href: "#" },
  { label: "Men", href: "/men" },
  { label: "Kids", href: "/kids" },
  { label: "Build an Outfit", href: "/build-outfit" },
  { label: "Brands", href: "#", dropdown: true },
];

// ─── ICONS ───
const I = {
  search: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  user: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  cart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
};

const Heart = ({ on }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={on ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export default function Navbar({ cart = 0, wish = [] }) {
  return (
    <>
      <style>{SHARED_CSS}</style>
      <nav className="sh-nav sticky-top d-flex align-items-center justify-content-between px-4">
        {/* Logo */}
        <a href="/" style={{ textDecoration: "none" }}>
          <img
            src="/logo.jpg"
            alt="StyleHub"
            style={{ height: "50px", objectFit: "contain" }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "inline";
            }}
          />
          <span style={{ display: "none", fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 600, color: "var(--dark)" }}>
            SH
          </span>
        </a>

        {/* Nav Links */}
        <ul className="d-none d-lg-flex gap-4 list-unstyled mb-0 align-items-center">
          {NAV_LINKS.map((l) => (
            <li key={l.label} className="nav-item d-flex align-items-center">
              <a href={l.href} style={{ color: "var(--dark)", textDecoration: "none", fontSize: ".73rem", letterSpacing: ".04em" }}>
                {l.label}{" "}
                {l.dropdown && <span style={{ fontSize: ".55rem", marginLeft: "3px" }}>▾</span>}
              </a>
              {l.dropdown && (
                <div className="dropdown">
                  {BRANDS.map((b) => (
                    <a key={b.name} href={b.href}>{b.name}</a>
                  ))}
                </div>
              )}
            </li>
          ))}

          {/* ── VIRTUAL TRY-ON ── */}
          <li className="d-flex align-items-center">
            <a href="/build-outfit" className="tryon-btn">
              👗 Virtual Try-On
            </a>
          </li>

          {/* ── SELL WITH US ── */}
          <li className="d-flex align-items-center">
            <a href="/seller" className="sell-btn">
              🏪 Sell with us
            </a>
          </li>
        </ul>

        {/* Right Icons */}
        <div className="d-flex gap-3 align-items-center">
          {[I.search, I.user].map((icon, i) => (
            <a key={i} href="#" className="nav-icon">{icon}</a>
          ))}
          <a href="#" className="nav-icon">
            <Heart on={false} />
            {wish.length > 0 && <span className="sh-badge">{wish.length}</span>}
          </a>
          <a href="#" className="nav-icon">
            {I.cart}
            {cart > 0 && <span className="sh-badge">{cart}</span>}
          </a>
        </div>
      </nav>
    </>
  );
}