const FOOTER_COLS = [
  {
    title: "Shop",
    links: [
      ["All Brands", "#"],
      ["Women", "#"],
      ["Men", "#"],
      ["Kids", "/kids"],
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
      ["Build Outfit", "#"],
      ["Trending", "#"],
    ],
  },
  {
    title: "Contact Us",
    links: [
      ["Support", "#"],
      ["About Us", "#"],
      ["Instagram", "#"],
      ["Facebook", "./https://www.facebook.com/profile.php?id=61584765721087"],
    ],
  },
];

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

export default function Footer({ addRef = () => {} }) {
  return (
    <>
      <style>{SHARED_CSS}</style>
      <footer className="sh-foot px-4 pt-5 pb-3">
        <div className="row g-4 mb-3">
          <div className="col-md-4 reveal" ref={addRef}>
            <a href="/" className="f-logo-txt d-block mb-3">
              <img
                src="/logi.jpg"
                alt="StyleHub"
                style={{
                  height: "100px",
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <span style={{ display: "none" }}>StyleHub</span>
            </a>
            <p className="f-about mb-3">
              Your destination for Egypt's finest local fashion brands.
            </p>
            <div className="d-flex gap-2">
              {["F", "IG"].map((s) => (
                <a key={s} href="#" className="f-soc">
                  {s}
                </a>
              ))}
            </div>
          </div>
          {FOOTER_COLS.map((col, i) => (
            <div
              key={col.title}
              className={`col-md-2 col-6 reveal d${i + 1}`}
              ref={addRef}
            >
              <div className="f-col-title mb-3">{col.title}</div>
              <ul className="list-unstyled f-col">
                {col.links.map(([label, href]) => (
                  <li key={label} className="mb-2">
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="d-flex justify-content-between align-items-center pt-3 flex-wrap gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,.15)" }}
        >
          <span className="f-copy">© 2026 StyleHub. All rights reserved.</span>
          <div className="d-flex gap-1">
            {["VISA", "FAWRY", "CASH"].map((p) => (
              <span className="fpb" key={p}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
