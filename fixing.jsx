import { useState, useEffect, useRef, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// ─── SCROLL REVEAL ───
function useScrollReveal() {
  const refs = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("revealed")),
      { threshold: 0.01 }
    );
    refs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);
  return useCallback(el => { if (el && !refs.current.includes(el)) refs.current.push(el); }, []);
}

// ─── ICONS ───
const I = {
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  user:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  cart:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
};
const Heart = ({ on }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={on?"currentColor":"none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const Stars = ({ n }) => <>{[1,2,3,4,5].map(i=><span key={i} style={{color:"#c8a96e",fontSize:".65rem"}}>{i<=Math.round(n)?"★":"☆"}</span>)}</>;

// ─── DATA ───
// 📸 IMAGES: put files in src/assets/ then replace null with "./assets/filename.jpg"
// 🔗 LINKS: replace "#" with "/pagename" when page is ready

const BRANDS = [
  { name:"27",          logo:null, href:"#" },
  { name:"MARBLE",      logo:null, href:"#" },
  { name:"أنتيكا",      logo:null, href:"#" },
  { name:"Sally",       logo:null, href:"#" },
  { name:"Husayba",     logo:null, href:"#" },
  { name:"RedaaModest", logo:null, href:"#" },
];

const PRODUCTS = [
  // ── BEST SELLERS ──
  { id:1,  tab:"best",  name:"Marble Stripes",        brand:"MARBLE",      price:"LE 1,500", oldPrice:"LE 1,800", img:null, gradient:"135deg,#2a3a5c,#1a2a4c", colors:["#1a1a2e","#c0c0c0"], sizes:["XS","S","M","L","XL"],  rating:4.8, reviews:124, desc:"Bold-stripe tee, 100% Egyptian cotton." },
  { id:2,  tab:"best",  name:"antika Hoodie Kids",    brand:"antika",      price:"LE 1,500", oldPrice:"LE 1,800", img:null, gradient:"135deg,#e63946,#c0202e", colors:["#e63946","#fff"],    sizes:["4Y","6Y","8Y","10Y"],   rating:4.9, reviews:89,  desc:"Cozy fleece hoodie, perfect for kids." },
  { id:3,  tab:"best",  name:"Denim Jumpsuit",        brand:"RedaaModest", price:"LE 1,500", oldPrice:"LE 1,800", img:null, gradient:"135deg,#4a7fa0,#2a5f80", colors:["#4a7fa0"],           sizes:["XS","S","M","L"],       rating:4.7, reviews:56,  desc:"Wide-leg denim, modest cut." },
  { id:4,  tab:"best",  name:"27 Pink Puff Tee",      brand:"27",          price:"LE 750",   oldPrice:null,       img:null, gradient:"135deg,#f4a0b5,#d48095", colors:["#f4a0b5","#d48095"], sizes:["XS","S","M","L","XL"],  rating:4.6, reviews:203, desc:"Puff sleeves, dreamy blush pink." },
  { id:5,  tab:"best",  name:"Maya Knitted Top",      brand:"Husayba",     price:"LE 1,300", oldPrice:null,       img:null, gradient:"135deg,#1a2a4c,#0a1a3c", colors:["#1a2a4c"],           sizes:["S","M","L","XL"],       rating:4.9, reviews:78,  desc:"Rib-knit top, rich navy." },
  { id:6,  tab:"best",  name:"Textured Polo",         brand:"Salty",       price:"LE 400",   oldPrice:null,       img:null, gradient:"135deg,#3a3a38,#1a1a18", colors:["#1a1a18","#4a4a48"], sizes:["S","M","L","XL","XXL"], rating:4.5, reviews:167, desc:"Heavyweight piqué polo." },
  // ── NEW ARRIVALS ──
  { id:15, tab:"new",   name:"Sage Linen Shirt",      brand:"MARBLE",      price:"LE 1,200", oldPrice:null,       img:null, gradient:"135deg,#92A079,#728060", colors:["#92A079","#fff"],    sizes:["S","M","L","XL"],       rating:4.7, reviews:12,  desc:"Relaxed linen shirt, sage colorway." },
  { id:16, tab:"new",   name:"Cloud Knit Cardigan",   brand:"Husayba",     price:"LE 1,800", oldPrice:null,       img:null, gradient:"135deg,#e8e0d8,#c8c0b8", colors:["#e8e0d8","#8a8078"], sizes:["XS","S","M","L"],       rating:4.9, reviews:8,   desc:"Ultra-soft oversized cardigan." },
  { id:17, tab:"new",   name:"Wide Leg Trouser",      brand:"27",          price:"LE 950",   oldPrice:null,       img:null, gradient:"135deg,#3a3a38,#1a1a18", colors:["#1a1a18","#c8c0b8"], sizes:["XS","S","M","L","XL"], rating:4.6, reviews:21,  desc:"Tailored wide-leg, everyday luxury." },
  { id:18, tab:"new",   name:"Floral Midi Dress",     brand:"Sally",       price:"LE 2,100", oldPrice:null,       img:null, gradient:"135deg,#d4a8b8,#b48898", colors:["#d4a8b8"],           sizes:["XS","S","M","L"],       rating:4.8, reviews:6,   desc:"Flowing midi dress, floral print." },
  { id:19, tab:"new",   name:"Ribbed Tank Set",       brand:"antika",      price:"LE 680",   oldPrice:null,       img:null, gradient:"135deg,#c8b89a,#a8987a", colors:["#c8b89a","#1a1a18"], sizes:["XS","S","M","L"],       rating:4.5, reviews:15,  desc:"Matching ribbed tank & shorts set." },
  { id:20, tab:"new",   name:"Striped Oversized Tee", brand:"MARBLE",      price:"LE 550",   oldPrice:null,       img:null, gradient:"135deg,#e8e4e0,#2a2a28", colors:["#e8e4e0","#2a2a28"], sizes:["S","M","L","XL","XXL"], rating:4.7, reviews:31,  desc:"Classic oversized stripe, unisex." },
  // ── SALE ──
  { id:21, tab:"sale",  name:"Summer Slip Dress",     brand:"Sally",       price:"LE 600",   oldPrice:"LE 1,200", img:null, gradient:"135deg,#f0c8a0,#d0a880", colors:["#f0c8a0","#c08060"], sizes:["XS","S","M","L"],       rating:4.4, reviews:88,  desc:"Silk-feel slip dress, 50% off." },
  { id:22, tab:"sale",  name:"Cargo Wide Pants",      brand:"27",          price:"LE 700",   oldPrice:"LE 1,400", img:null, gradient:"135deg,#6a7a58,#4a5a38", colors:["#6a7a58","#c8b89a"], sizes:["XS","S","M","L","XL"], rating:4.6, reviews:54,  desc:"Utility cargo pants, 50% off." },
  { id:23, tab:"sale",  name:"Knit Vest",             brand:"Husayba",     price:"LE 400",   oldPrice:"LE 800",   img:null, gradient:"135deg,#d4b8a0,#b49880", colors:["#d4b8a0"],           sizes:["S","M","L"],            rating:4.3, reviews:42,  desc:"Crochet knit vest, boho style." },
  { id:24, tab:"sale",  name:"Linen Blazer",          brand:"MARBLE",      price:"LE 900",   oldPrice:"LE 1,800", img:null, gradient:"135deg,#b8b0a8,#888078", colors:["#b8b0a8","#1a1a18"], sizes:["XS","S","M","L"],       rating:4.7, reviews:67,  desc:"Relaxed linen blazer, 50% off." },
  { id:25, tab:"sale",  name:"Printed Maxi Skirt",    brand:"Sally",       price:"LE 500",   oldPrice:"LE 1,000", img:null, gradient:"135deg,#c8a8c0,#a888a0", colors:["#c8a8c0"],           sizes:["XS","S","M","L","XL"], rating:4.5, reviews:39,  desc:"Flowy printed maxi, 50% off." },
  { id:26, tab:"sale",  name:"Basic Hoodie",          brand:"antika",      price:"LE 450",   oldPrice:"LE 900",   img:null, gradient:"135deg,#8a9e7a,#6a7e5a", colors:["#8a9e7a","#fff"],    sizes:["S","M","L","XL","XXL"], rating:4.6, reviews:112, desc:"Essential hoodie, 50% off." },
  // ── TRENDING ──
  { id:7,  tab:"trend", name:"Essential Basic Pant",  brand:"27",     price:"LE 800",   oldPrice:"Sale", img:null, gradient:"135deg,#c8c0b8,#a09888", colors:["#c8c0b8"], sizes:["XS","S","M","L"], rating:4.7, reviews:44, desc:"Clean cut everyday pants." },
  { id:8,  tab:"trend", name:"Essential Basic Pant",  brand:"27",     price:"LE 800",   oldPrice:"Sale", img:null, gradient:"135deg,#7a9ab0,#5a7a90", colors:["#7a9ab0"], sizes:["XS","S","M","L"], rating:4.8, reviews:62, desc:"Navy edition, tailored fit." },
  { id:9,  tab:"trend", name:"Lawinska Detail Shirt", brand:"MARBLE", price:"LE 950",   oldPrice:null,   img:null, gradient:"135deg,#d4c4a8,#b4a488", colors:["#d4c4a8"], sizes:["S","M","L","XL"], rating:4.6, reviews:38, desc:"Signature MARBLE detail shirt." },
  { id:10, tab:"trend", name:"Lawinska Detail Jean",  brand:"MARBLE", price:"LE 1,100", oldPrice:null,   img:null, gradient:"135deg,#5c7a9a,#3c5a7a", colors:["#5c7a9a"], sizes:["XS","S","M","L"], rating:4.9, reviews:91, desc:"Wide-leg denim with detail stitching." },
  { id:27, tab:"trend", name:"Ribbed Mock Neck",      brand:"Husayba",price:"LE 780",   oldPrice:null,   img:null, gradient:"135deg,#b8a898,#988878", colors:["#b8a898"], sizes:["XS","S","M","L"],      rating:4.7, reviews:29, desc:"Soft ribbed mock neck top." },
  { id:28, tab:"trend", name:"Straight Leg Jean",     brand:"27",     price:"LE 1,050", oldPrice:null,   img:null, gradient:"135deg,#4a6080,#2a4060", colors:["#4a6080"], sizes:["XS","S","M","L","XL"], rating:4.8, reviews:47, desc:"Classic straight leg in indigo." },
  // ── TOP PICKS ──
  { id:11, tab:"picks", name:"Essential Basic Pant",  brand:"27",     price:"LE 800", img:null, gradient:"135deg,#d0ccc8,#b0aca8", colors:["#d0ccc8"], sizes:["XS","S","M","L"], rating:4.8, reviews:55, desc:"Relaxed fit everyday pant." },
  { id:12, tab:"picks", name:"Essential Basic Pant",  brand:"27",     price:"LE 800", img:null, gradient:"135deg,#2a3a6c,#1a2a5c", colors:["#2a3a6c"], sizes:["XS","S","M","L"], rating:4.7, reviews:43, desc:"Navy edition slim cut." },
  { id:13, tab:"picks", name:"Essential Basic Pant",  brand:"MARBLE", price:"LE 800", img:null, gradient:"135deg,#4a5a48,#2a3a28", colors:["#4a5a48"], sizes:["S","M","L","XL"],  rating:4.6, reviews:38, desc:"Green colorway trouser." },
  { id:14, tab:"picks", name:"Essential Basic Pant",  brand:"27",     price:"LE 800", img:null, gradient:"135deg,#e8c8a8,#c8a888", colors:["#e8c8a8"], sizes:["XS","S","M","L","XL"], rating:4.9, reviews:72, desc:"Warm sand tone pant." },
];

const CATS = [
  { name:"MEN",   img:null, link:"#", gradient:"145deg,#8a9e7a,#4a6040" },
  { name:"WOMEN", img:null, link:"#", gradient:"145deg,#c4b8a8,#8a7868" },
  { name:"KIDS",  img:null, link:"#", gradient:"145deg,#6b8aad,#3a5878" },
];

const NAV_LINKS = [
  { label:"Home",            href:"/"  },
  { label:"Women",           href:"#"  },
  { label:"Men",             href:"#"  },
  { label:"Kids",            href:"#"  },
  { label:"Our Picks",       href:"#"  },
  { label:"Build an Outfit", href:"#"  },
  { label:"Brands",          href:"#"  },
];

const FOOTER_COLS = [
  { title:"Shop",        links:[["All Brands","#"],["Women","#"],["Men","#"],["Kids","#"],["Sale","#"]] },
  { title:"Sell With Us",links:[["Sign Up","#"],["How It Works","#"],["Pricing","#"],["Brand Stories","#"]] },
  { title:"Discover",    links:[["New Arrivals","#"],["Top Picks","#"],["Build Outfit","#"],["Trending","#"]] },
  { title:"Contact Us",  links:[["Support","#"],["Email Us","#"],["Instagram","#"],["WhatsApp","#"]] },
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

/* FOOTER */
.sh-foot { background:var(--deep); color:rgba(255,255,255,.8); }
.f-logo-txt { font-family:'Cormorant Garamond',serif; font-size:1.5rem; font-weight:500; color:#fff; text-decoration:none; }
.f-about { font-size:.78rem; line-height:1.7; color:rgba(255,255,255,.55); }
.f-soc { width:30px; height:30px; border:1px solid rgba(255,255,255,.3); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:.65rem; color:rgba(255,255,255,.6); text-decoration:none; transition:all .2s; }
.f-soc:hover { background:rgba(255,255,255,.15); color:#fff; }
.f-col-title { font-size:.64rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.45); font-weight:500; }
.f-col a { display:block; font-size:.78rem; color:rgba(255,255,255,.7); text-decoration:none; transition:all .2s; }
.f-col a:hover { color:#fff; transform:translateX(3px); }
.f-copy { font-size:.7rem; color:rgba(255,255,255,.35); }
.fpb { background:rgba(255,255,255,.12); border-radius:3px; padding:.2rem .5rem; font-size:.58rem; color:rgba(255,255,255,.6); font-weight:600; }

/* MODAL */
.mbk { position:fixed; inset:0; background:rgba(26,26,24,.65); z-index:800; display:flex; align-items:center; justify-content:center; padding:1rem; animation:fi .2s; }
.sh-modal { background:#fff; width:100%; max-width:860px; max-height:92vh; overflow-y:auto; display:grid; grid-template-columns:1fr 1fr; position:relative; animation:su .32s cubic-bezier(.22,1,.36,1); }
.m-img { display:flex; align-items:center; justify-content:center; position:sticky; top:0; align-self:flex-start; min-height:400px; background:#f0ece6; }
.m-img img { width:100%; height:100%; object-fit:cover; }
.m-ph { width:100%; min-height:400px; display:flex; align-items:center; justify-content:center; }
.m-brand { font-size:.62rem; letter-spacing:.2em; text-transform:uppercase; color:var(--warm); }
.m-name { font-family:'Cormorant Garamond',serif; font-size:1.9rem; font-weight:400; line-height:1.1; }
.m-price { font-size:1.25rem; font-weight:600; }
.m-oprice { font-size:.85rem; color:var(--warm); text-decoration:line-through; }
.m-desc { font-size:.82rem; line-height:1.82; color:var(--warm); }
.m-lbl { font-size:.63rem; letter-spacing:.18em; text-transform:uppercase; font-weight:600; }
.sw { width:24px; height:24px; border-radius:50%; cursor:pointer; transition:transform .2s,box-shadow .2s; border:2px solid transparent; }
.sw.on { box-shadow:0 0 0 2px var(--dark); transform:scale(1.12); }
.sz { padding:.4rem .85rem; font-size:.7rem; border:1.5px solid var(--border); background:transparent; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; }
.sz.on { border-color:var(--dark); background:var(--dark); color:#fff; }
.sz:hover:not(.on) { border-color:var(--dark); }
.m-close { position:absolute; top:1rem; right:1rem; width:34px; height:34px; background:#fff; border:none; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 16px rgba(26,26,24,.12); z-index:10; transition:transform .25s; }
.m-close:hover { transform:rotate(90deg) scale(1.1); }
.m-rc { font-size:.7rem; color:var(--warm); }
.sh-toast { position:fixed; bottom:2rem; left:50%; transform:translateX(-50%) translateY(20px); background:var(--dark); color:#fff; padding:.8rem 2rem; font-size:.76rem; letter-spacing:.1em; z-index:1000; opacity:0; transition:all .4s; pointer-events:none; white-space:nowrap; }
.sh-toast.on { opacity:1; transform:translateX(-50%) translateY(0); }
@keyframes fi { from{opacity:0} to{opacity:1} }
@keyframes su { from{opacity:0;transform:translateY(26px) scale(.98)} to{opacity:1;transform:none} }
@media(max-width:768px) {
  .sh-hero { height:360px; }
  .sh-modal { grid-template-columns:1fr; }
  .m-img { min-height:220px; position:relative; }
}
`;

// ─── PRODUCT CARD ───
function PCard({ p, onOpen, addRef, d=1, wish, toggleWish }) {
  return (
    <div className={`pc d${d}`} ref={addRef} onClick={()=>onOpen(p)}>
      <div className="pc-img">
        {p.img ? <img src={p.img} alt={p.name}/> : <div className="pc-ph" style={{background:`linear-gradient(${p.gradient})`}}><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1rem",color:"rgba(255,255,255,.25)"}}>{p.brand}</span></div>}
        <div className="pc-ov"/>
        <button className={`pc-wish${wish.includes(p.id)?" on":""}`} onClick={e=>{e.stopPropagation();toggleWish(p.id)}}><Heart on={wish.includes(p.id)}/></button>
        <button className="pc-qv" onClick={e=>{e.stopPropagation();onOpen(p)}}>Quick View</button>
      </div>
      <div className="p-2">
        <div className="pc-brand mb-1">{p.brand}</div>
        <div className="pc-name mb-1">{p.name}</div>
        <div className="d-flex gap-2 align-items-center">
          {p.oldPrice && <span className="p-old">{p.oldPrice}</span>}
          <span className={p.oldPrice?"p-new":"p-reg"}>{p.price}</span>
        </div>
      </div>
    </div>
  );
}

// ─── TRENDING CARD ───
function TCard({ p, onOpen, addRef, d=1, wish, toggleWish, onAdd }) {
  const [qty, setQty] = useState(0);
  return (
    <div className={`tc d${d}`} ref={addRef}>
      <div className="tc-img" onClick={()=>onOpen(p)}>
        {p.img ? <img src={p.img} alt={p.name}/> : <div className="tc-ph" style={{background:`linear-gradient(${p.gradient})`}}><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1rem",color:"rgba(255,255,255,.25)"}}>{p.brand}</span></div>}
        <button className={`tc-w${wish.includes(p.id)?" on":""}`} onClick={e=>{e.stopPropagation();toggleWish(p.id)}}><Heart on={wish.includes(p.id)}/></button>
      </div>
      <div className="p-2">
        <div className="tc-brand">{p.brand}</div>
        <div className="tc-name my-1">{p.name}</div>
        <div className="d-flex align-items-center gap-1 mb-1">
          {p.oldPrice && <span className="tc-old">{p.oldPrice}</span>}
          <span className={`tc-price${p.oldPrice?" sale":""}`}>{p.price}</span>
        </div>
        {qty===0
          ? <button className="tc-add" onClick={()=>{setQty(1);onAdd();}}>Add to Cart</button>
          : <div className="tc-qty mt-1"><button onClick={()=>setQty(q=>Math.max(0,q-1))}>−</button><span>{qty}</span><button onClick={()=>setQty(q=>q+1)}>+</button></div>
        }
      </div>
    </div>
  );
}

// ─── TRENDING CAROUSEL ───
function TrendingCarousel({ products, onOpen, wish, toggleWish, onAdd }) {
  const [cur, setCur] = useState(0);
  const visible = 4;
  const max = products.length - visible;
  if (!products.length) return null;
  return (
    <div style={{position:"relative"}}>
      <div style={{overflow:"hidden"}}>
        <div style={{display:"flex",transition:"transform .5s ease",transform:`translateX(-${cur*(100/visible)}%)`}}>
          {products.map((p,i)=>(
            <div key={p.id} style={{minWidth:`${100/visible}%`,padding:"0 .5rem",boxSizing:"border-box"}}>
              <TCard p={p} onOpen={onOpen} addRef={()=>{}} d={(i%4)+1} wish={wish} toggleWish={toggleWish} onAdd={onAdd}/>
            </div>
          ))}
        </div>
      </div>
      {cur>0   && <button className="h-arr l" onClick={()=>setCur(c=>c-1)}>‹</button>}
      {cur<max && <button className="h-arr r" onClick={()=>setCur(c=>c+1)}>›</button>}
    </div>
  );
}

// ─── MODAL ───
function Modal({ p, onClose, onAdd }) {
  const [sc, setSc] = useState(0);
  const [ss, setSs] = useState(null);
  const [done, setDone] = useState(false);
  useEffect(()=>{ document.body.style.overflow="hidden"; return ()=>{ document.body.style.overflow=""; }; },[]);
  return (
    <div className="mbk" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="sh-modal">
        <button className="m-close" onClick={onClose}>✕</button>
        <div className="m-img">
          {p.img ? <img src={p.img} alt={p.name}/> : <div className="m-ph" style={{background:`linear-gradient(${p.gradient})`,width:"100%"}}><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"4rem",color:"rgba(255,255,255,.2)",fontWeight:300}}>{p.brand[0]}</span></div>}
        </div>
        <div className="p-4">
          <div className="m-brand mb-1">{p.brand}</div>
          <div className="m-name mb-2">{p.name}</div>
          <div className="d-flex align-items-center gap-1 mb-3"><Stars n={p.rating}/><span className="m-rc ms-1">{p.rating} · {p.reviews} reviews</span></div>
          <div className="m-price">{p.price}</div>
          {p.oldPrice && <div className="m-oprice mb-3">Was {p.oldPrice}</div>}
          <p className="m-desc mb-3">{p.desc}</p>
          <div className="m-lbl mb-2">Color</div>
          <div className="d-flex gap-2 mb-3">{p.colors.map((c,i)=><div key={i} className={`sw${sc===i?" on":""}`} style={{background:c}} onClick={()=>setSc(i)}/>)}</div>
          <div className="m-lbl mb-2">Size {!ss&&<span style={{color:"var(--red)",fontWeight:400,fontSize:".6rem",marginLeft:"6px"}}>— select size</span>}</div>
          <div className="d-flex flex-wrap gap-1 mb-4">{p.sizes.map(s=><button key={s} className={`sz${ss===s?" on":""}`} onClick={()=>setSs(s)}>{s}</button>)}</div>
          <div className="d-flex flex-column gap-2">
            <button className="sh-btn sh-btn-dk justify-content-center" style={{opacity:ss?1:.45}} onClick={()=>{if(!ss)return;setDone(true);onAdd();setTimeout(()=>setDone(false),1800)}}>{done?"✓  Added to Bag":"Add to Bag"}</button>
            <button className="sh-btn sh-btn-ol justify-content-center">♡  Save to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BRANDS CAROUSEL ───
function BrandsCarousel() {
  const [idx, setIdx] = useState(0);
  const max = BRANDS.length - 4;
  useEffect(()=>{ const t = setInterval(()=>setIdx(i=>i>=max?0:i+1),2500); return ()=>clearInterval(t); },[max]);
  return (
    <section className="py-4 border-bottom bg-white">
      <p className="brands-label text-center mb-3">Featured Brands</p>
      <div className="d-flex align-items-center justify-content-center gap-2">
        <button className="brand-arrow" onClick={()=>setIdx(i=>i<=0?max:i-1)}>‹</button>
        <div className="brands-wrap">
          <div className="brands-track" style={{transform:`translateX(-${idx*25}%)`}}>
            {BRANDS.map((b,i)=>(
              <div key={i} className="brand-slide">
                <a href={b.href} style={{textDecoration:"none",color:"inherit"}}>
                  {b.logo ? <img src={b.logo} alt={b.name} style={{height:"40px",objectFit:"contain",opacity:.55}}/> : <span className="brand-txt">{b.name}</span>}
                </a>
              </div>
            ))}
          </div>
        </div>
        <button className="brand-arrow" onClick={()=>setIdx(i=>i>=max?0:i+1)}>›</button>
      </div>
    </section>
  );
}

// ─── HERO CAROUSEL ───
const SLIDES = [
  { img:null, bg:"linear-gradient(120deg,#d8d0c4,#b0a898)", title:"Discover Local Fashion,\nAll in One Place",  sub:"Shop the finest Egyptian designers. Curated collections, exclusive drops.", btn:"Shop Now",       href:"#" },
  { img:null, bg:"linear-gradient(120deg,#92A079,#5a6e50)", title:"Build Your\nPerfect Outfit",                 sub:"Mix and match pieces from Egypt's top local designers — all in one place.",  btn:"Build an Outfit", href:"#" },
];
function HeroCarousel() {
  const [cur, setCur] = useState(0);
  useEffect(()=>{ const t = setInterval(()=>setCur(c=>c===0?1:0),4000); return ()=>clearInterval(t); },[]);
  return (
    <section className="sh-hero">
      {SLIDES.map((s,i)=>(
        <div key={i} className={`hero-fade${cur===i?" on":""}`} style={{background:s.bg}}>
          {s.img && <img src={s.img} alt="hero"/>}
          <div className="hero-ov"/>
          <div className="hero-ct">
            <h1 className="hero-title">{s.title.split("\n").map((l,j)=><span key={j}>{l}<br/></span>)}</h1>
            <p className="hero-sub">{s.sub}</p>
            <a href={s.href} className="sh-btn sh-btn-dk">{s.btn}</a>
          </div>
        </div>
      ))}
      <button className="h-arr l" onClick={()=>setCur(c=>c===0?1:0)}>‹</button>
      <button className="h-arr r" onClick={()=>setCur(c=>c===0?1:0)}>›</button>
      <div className="h-dots">
        <button className={`hdot${cur===0?" on":""}`} onClick={()=>setCur(0)}/>
        <button className={`hdot${cur===1?" on":""}`} onClick={()=>setCur(1)}/>
      </div>
    </section>
  );
}

// ─── APP ───
export default function App() {
  const [tab, setTab]     = useState("best");
  const [modal, setModal] = useState(null);
  const [cart, setCart]   = useState(0);
  const [wish, setWish]   = useState([]);
  const [toast, setToast] = useState("");
  const addRef = useScrollReveal();

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(""),2200); };
  const addToCart = () => { setCart(c=>c+1); showToast("✓ Added to bag"); };
  const toggleWish = id => { setWish(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]); showToast(wish.includes(id)?"Removed from wishlist":"♥️ Added to wishlist"); };

  return (
    <div>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="sh-nav sticky-top d-flex align-items-center justify-content-between px-4">
        <a href="/" style={{textDecoration:"none"}}>
          <img src="./assets/logo.jpg" alt="StyleHub" style={{height:"36px",objectFit:"contain"}}
            onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="inline"}}/>
          <span style={{display:"none",fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:600,color:"var(--dark)"}}>SH</span>
        </a>
        <ul className="d-none d-lg-flex gap-4 list-unstyled mb-0">
          {NAV_LINKS.map(l=><li key={l.label}><a href={l.href} style={{color:"var(--dark)",textDecoration:"none",fontSize:".73rem",letterSpacing:".04em"}}>{l.label}</a></li>)}
        </ul>
        <div className="d-flex gap-3 align-items-center">
          {[I.search, I.user].map((icon,i)=><a key={i} href="#" className="nav-icon">{icon}</a>)}
          <a href="#" className="nav-icon"><Heart on={false}/>{wish.length>0&&<span className="sh-badge">{wish.length}</span>}</a>
          <a href="#" className="nav-icon">{I.cart}{cart>0&&<span className="sh-badge">{cart}</span>}</a>
        </div>
      </nav>

      {/* HERO */}
      <HeroCarousel/>

      {/* BRANDS */}
      <BrandsCarousel/>

      {/* PRODUCTS */}
      <section className="px-4 py-3 my-5">
        <div className="sh-tabs reveal" ref={addRef}>
          {[["best","Best Sellers"],["new","New Arrivals"],["sale","Sale"]].map(([key,label])=>(
            <div key={key} className={`sh-tab${tab===key?" on":""}`} onClick={()=>setTab(key)}>{label}</div>
          ))}
        </div>
        <div className="row row-cols-2 row-cols-md-3 g-3">
          {PRODUCTS.filter(p=>p.tab===tab).slice(0,6).map((p,i)=>(
            <div className="col" key={p.id}>
              <PCard p={p} onOpen={setModal} addRef={addRef} d={(i%3)+1} wish={wish} toggleWish={toggleWish}/>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN */}
      <div className="sh-join text-center reveal py-5 mx-4 " ref={addRef} style={{marginTop:"7rem"}} >
        <h3 className="mb-2">Join Style Hub</h3>
        <a href="#">Sell with us ›</a>
      </div>

      {/* WHO WE ARE */}
      <div className="row g-0 mx-4 reveal" ref={addRef} style={{marginTop:"8rem"}}>
        <div className="col-md-6 who-left p-5 d-flex flex-column justify-content-center">
          <h3 className="mb-3">Who We Are?</h3>
          <p className="mb-4">We support local Egyptian fashion brands and help them reach customers across Egypt — all in one place.</p>
          <div><button className="sh-btn sh-btn-ol sh-btn-sm">Learn more ›</button></div>
        </div>
        <div className="col-md-6 who-right">
          {/* 📸 → <img src="./assets/support-local.jpg" alt="support local"/> */}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="px-4 py-4 " style={{marginTop:"6rem"}}>
        <div className="sec-title reveal" ref={addRef}>Shop By Categories</div>
        <div className="row g-3">
          {CATS.map((c,i)=>(
            <div className="col-md-4" key={c.name}>
              <a href={c.link} className={`sh-cat reveal d${i+1}`} ref={addRef}>
                {c.img ? <img src={c.img} alt={c.name}/> : <div className="cat-bg d-flex align-items-center justify-content-center" style={{background:`linear-gradient(${c.gradient})`,height:"100%"}}><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"4rem",color:"rgba(255,255,255,.15)",fontWeight:300}}>{c.name[0]}</span></div>}
                <div className="cat-ov"/>
                <div className="cat-ct"><div className="cat-name">{c.name}</div><div className="cat-sub mt-1">Shop Now →</div></div>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="px-4 py-4 " style={{marginTop:"6rem"}}>
        <div className="sec-title reveal" ref={addRef}>Trending Now</div>
        <TrendingCarousel products={PRODUCTS.filter(p=>p.tab==="trend")} onOpen={setModal} wish={wish} toggleWish={toggleWish} onAdd={addToCart}/>
      </section>

      {/* TOP PICKS */}
      <section className="px-4 py-4 "  style={{marginTop:"6rem"}}  >
        <div className="sec-title reveal" ref={addRef}>Top Picks</div>
        <div className="row row-cols-2 row-cols-md-4 g-3">
          {PRODUCTS.filter(p=>p.tab==="picks").map((p,i)=>(
            <div className="col" key={p.id}>
              <TCard p={p} onOpen={setModal} addRef={addRef} d={(i%4)+1} wish={wish} toggleWish={toggleWish} onAdd={addToCart}/>
            </div>
          ))}
        </div>
      </section>

      {/* EDITORIAL */}
      <div className="row g-3 px-4 mt-5 pt-3 mb-4 reveal" ref={addRef}>
        {[
          {tag:"Editorial", title:"Discover Latest in Fashion", gradient:"145deg,#8a9a7a,#4a5c40", img:null, href:"#"},
          {tag:"Explore",   title:"Explore Fashion New Era",    gradient:"145deg,#c4a882,#8a7060", img:null, href:"#"},
        ].map((e,i)=>(
          <div className="col-md-6" key={i}>
            <a href={e.href} className="sh-ed">
              {e.img ? <img src={e.img} alt={e.title}/> : <div className="ed-bg" style={{background:`linear-gradient(${e.gradient})`}}/>}
              <div className="ed-ov"/>
              <div className="ed-ct"><div className="ed-tag mb-1">{e.tag}</div><div className="ed-title">{e.title}</div></div>
            </a>
          </div>
        ))}
      </div>

      {/* TRUST */}
      <div className="d-flex justify-content-center gap-5 py-4 border-top reveal flex-wrap" ref={addRef}>
        {[
          {icon:"🚚", label:"100% Free Shipping",  sub:"Free shipping on all orders"},
          {icon:"↩",  label:"Easy Returns",         sub:"30-day hassle-free returns"},
          {icon:"🎧", label:"24/7 Online Support",  sub:"We're here whenever you need us"},
        ].map((t,i)=>(
          <div key={i} className="text-center" style={{maxWidth:180}}>
            <div className="trust-icon mb-2">{t.icon}</div>
            <div className="trust-label mb-1">{t.label}</div>
            <div className="trust-sub">{t.sub}</div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="sh-foot px-4 pt-5 pb-3">
        <div className="row g-4 mb-4">
          <div className="col-md-3 reveal" ref={addRef}>
            <a href="/" className="f-logo-txt d-block mb-3">
              <img src="./assets/logo.jpg" alt="StyleHub" style={{height:"32px",objectFit:"contain",filter:"brightness(0) invert(1)"}}
                onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="block"}}/>
              <span style={{display:"none"}}>StyleHub</span>
            </a>
            <p className="f-about mb-3">Your destination for Egypt's finest local fashion brands.</p>
            <div className="d-flex gap-2">
              {["f","ig","tw","yt"].map(s=><a key={s} href="#" className="f-soc">{s}</a>)}
            </div>
          </div>
          {FOOTER_COLS.map((col,i)=>(
            <div key={col.title} className={`col-md-2 col-6 reveal d${i+1}`} ref={addRef}>
              <div className="f-col-title mb-3">{col.title}</div>
              <ul className="list-unstyled f-col">
                {col.links.map(([label,href])=><li key={label} className="mb-2"><a href={href}>{label}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between align-items-center pt-3 flex-wrap gap-2" style={{borderTop:"1px solid rgba(255,255,255,.15)"}}>
          <span className="f-copy">©️ 2026 StyleHub. All rights reserved.</span>
          <div className="d-flex gap-1">{["VISA","MC","MEEZA","FAWRY","CASH"].map(p=><span className="fpb" key={p}>{p}</span>)}</div>
        </div>
      </footer>

      {modal && <Modal p={modal} onClose={()=>setModal(null)} onAdd={addToCart}/>}
      <div className={`sh-toast${toast?" on":""}`}>{toast}</div>
    </div>
  );
}