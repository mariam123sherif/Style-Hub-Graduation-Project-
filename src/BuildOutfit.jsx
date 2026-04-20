import { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PRODUCTS, SHARED_CSS, SHFooter, SHNav } from "./shared";

const PAGE_CSS = `
.bo-page {
  background: linear-gradient(180deg, #f7f3ec 0%, #f8f6f2 26%, #f5f2ea 100%);
}

.bo-shell {
  max-width: 1380px;
  margin: 0 auto;
  padding: 2.35rem 1.1rem 4rem;
}

.bo-hero { text-align: center; margin-bottom: 2rem; }

.bo-title {
  margin: 0;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.35rem, 4vw, 3.5rem);
  color: #28231d;
}

.bo-sub { margin-top: .45rem; color: #8b8579; font-size: .82rem; }

.bo-layout {
  display: grid;
  grid-template-columns: 330px minmax(0, 1fr);
  gap: 1.8rem;
  align-items: start;
}

.bo-side { position: sticky; top: 84px; }

.bo-soft {
  background: rgba(255,255,255,.72);
  border: 1px solid rgba(86, 76, 60, .12);
  border-radius: 28px;
  box-shadow: 0 18px 42px rgba(37, 31, 23, .06);
}

.bo-stage {
  height: 560px;
  overflow: hidden;
  border-radius: 28px;
  background:
    radial-gradient(circle at 48% 16%, rgba(255,255,255,.22), transparent 28%),
    linear-gradient(180deg, #4c4b47 0%, #3a3936 100%);
}

.bo-gender {
  display: flex; align-items: center; gap: .85rem;
  padding: .9rem 1rem 0; color: #8f887d; font-size: 1.18rem;
}

.bo-gender-line { width: 28px; height: 1px; background: #a59d90; }

@keyframes fadeInUp   { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
@keyframes fadeInDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:none; } }


.bo-data { margin-top: 1rem; padding: 1.15rem; }

.bo-card-title {
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.22rem;
  color: #2e2922;
  margin-bottom: .95rem;
}

.bo-row { margin-bottom: .78rem; }

.bo-row-top {
  display: flex; justify-content: space-between;
  font-size: .7rem; color: #736d63; margin-bottom: .25rem;
}

.bo-range {
  appearance: none; width: 100%; height: 7px;
  border-radius: 999px;
  background: linear-gradient(90deg, #d3d7c7, #abb28e);
  outline: none;
}

.bo-range::-webkit-slider-thumb {
  appearance: none; width: 15px; height: 15px;
  border-radius: 50%;
  background: #818a63;
  border: 3px solid #edf0e5;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,.16);
}

.bo-data-note {
  margin-top: .55rem;
  padding: .85rem .9rem;
  border-radius: 14px;
  background: rgba(167, 176, 138, .16);
  color: #5e644c;
  font-size: .72rem;
  line-height: 1.5;
}

.bo-favorites { margin-top: 1rem; padding: 1.15rem; }

.bo-fav-title {
  display: flex; justify-content: center; align-items: center;
  gap: .35rem;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.18rem;
  color: #2e2922;
  margin-bottom: .85rem;
}

.bo-mini-list { display: grid; gap: .65rem; }

.bo-mini {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) auto;
  gap: .6rem;
  align-items: center;
  padding: .45rem;
  background: #fff;
  border-radius: 14px;
  border: 1px solid rgba(86, 76, 60, .12);
}

.bo-mini img { width: 44px; height: 44px; border-radius: 999px; object-fit: cover; }

.bo-mini-name {
  font-size: .71rem; color: #28231d;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

.bo-mini-price { color: #7d766a; font-size: .67rem; }

.bo-main { min-width: 0; }

.bo-step { margin-bottom: 2rem; }

.bo-kicker { color: #302923; margin-bottom: .55rem; }

.bo-kicker strong { display: block; font-size: 1rem; margin-bottom: .25rem; }

.bo-divider {
  display: flex; align-items: center;
  gap: .85rem; margin-bottom: .95rem;
}

.bo-divider span {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.9rem; color: #2b261f;
  white-space: nowrap;
}

.bo-divider::after {
  content: "";
  height: 1px;
  background: rgba(40, 34, 27, .28);
  flex: 1;
}

.bo-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.bo-product {
  padding: .9rem;
  border-radius: 25px;
  background: rgba(255,255,255,.76);
  border: 1px solid rgba(86, 76, 60, .12);
  box-shadow: 0 12px 28px rgba(37, 31, 23, .05);
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}

.bo-product:hover { transform: translateY(-2px); box-shadow: 0 18px 32px rgba(37, 31, 23, .08); }

.bo-product.on {
  border-color: rgba(123, 132, 91, .7);
  box-shadow: 0 18px 34px rgba(123, 132, 91, .18);
}

.bo-thumb {
  position: relative; overflow: hidden;
  border-radius: 20px;
  aspect-ratio: .82;
  background: #ece7df;
  margin-bottom: .8rem;
}

.bo-thumb img { width: 100%; height: 100%; object-fit: cover; }

.bo-heart {
  position: absolute; left: .6rem; bottom: .6rem;
  width: 28px; height: 28px;
  border: none; border-radius: 50%;
  background: rgba(255,255,255,.96);
  color: #df5e59; font-size: .88rem;
  box-shadow: 0 8px 18px rgba(0,0,0,.12);
}

.bo-brand {
  font-size: .63rem; letter-spacing: .18em;
  text-transform: uppercase; color: #8a8173;
  margin-bottom: .25rem;
}

.bo-name { min-height: 2.45em; font-size: .82rem; font-weight: 600; color: #27211b; }

.bo-price { margin: .18rem 0 .7rem; color: #6f695e; font-size: .74rem; }

.bo-model-badge {
  display: inline-flex; margin-bottom: .55rem;
  padding: .18rem .45rem;
  border-radius: 999px;
  background: rgba(167, 176, 138, .18);
  color: #66704d;
  font-size: .6rem; letter-spacing: .12em;
  text-transform: uppercase;
}

.bo-btn {
  min-width: 88px; border: none;
  border-radius: 8px;
  padding: .48rem .85rem;
  font-size: .69rem;
  background: #a7b08a; color: #fff;
}

.bo-btn.dark { background: #25211b; }

.bo-recs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.bo-rec { text-align: center; }

.bo-rec .bo-thumb { aspect-ratio: .84; margin-bottom: .5rem; }

.bo-rec .bo-name { min-height: auto; }

.bo-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.bo-pill {
  padding: .95rem 1rem;
  border-radius: 18px;
  background: rgba(255,255,255,.76);
  border: 1px solid rgba(86, 76, 60, .12);
}

.bo-pill small {
  display: block; margin-bottom: .32rem;
  color: #8c8479; font-size: .57rem;
  letter-spacing: .18em; text-transform: uppercase;
}

.bo-pill strong { color: #28231d; font-size: .88rem; }

.bo-actions { display: flex; gap: .8rem; margin-top: 1rem; }

.bo-primary, .bo-secondary {
  border: none; border-radius: 12px;
  padding: .95rem 1rem;
  text-transform: uppercase;
  letter-spacing: .1em;
  font-size: .73rem;
}

.bo-primary { flex: 1; background: #25211b; color: #fff; }

.bo-secondary {
  min-width: 240px;
  background: rgba(167, 176, 138, .16);
  color: #5a6249;
}

@media (max-width: 1024px) {
  .bo-layout { grid-template-columns: 1fr; }
  .bo-side { position: static; }
}

@media (max-width: 768px) {
  .bo-grid, .bo-recs, .bo-summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .bo-shell { padding-inline: .85rem; }
  .bo-stage { height: 430px; }
  .bo-grid, .bo-recs, .bo-summary { grid-template-columns: 1fr; }
  .bo-actions { flex-direction: column; }
  .bo-secondary { min-width: 0; }
}
`;



const TOP_PRODUCT_IDS = [4, 51, 5];
const BOTTOM_PRODUCT_IDS = [22, 8];


// ── 2D Silhouette Preview ──
// Uses a PNG silhouette as base, layers product images on top zones
// Silhouette image: /silhouette.png  (the white figure on black bg you uploaded)
function SilhouettePreview({ selectedTop, selectedBottom, body }) {
  return (
    <div className="bo-stage bo-soft" style={{
      position: "relative",
      overflow: "hidden",
      background: "#1a1918",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>

      {/* ── LABEL ── */}
      <div style={{
        position:"absolute", top:"1rem", left:"50%", transform:"translateX(-50%)",
        fontSize:".55rem", letterSpacing:".22em", textTransform:"uppercase",
        color:"rgba(255,255,255,.28)", whiteSpace:"nowrap", zIndex:10,
      }}>
        Outfit Preview
      </div>

      {/* ── MAIN PREVIEW AREA ── */}
      <div style={{
        position:"relative",
        width:"100%",
        height:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
      }}>

        {/* SILHOUETTE PNG — size driven by body measurements
             body.height (150-195): taller → figure stretches vertically
             body.weight (45-120): heavier → figure widens
             TO CHANGE BODY SIZE: adjust the scale formula below */}
        {(() => {
          const hScale = body ? 0.85 + (body.height - 150) / (195 - 150) * 0.30 : 1; // 0.85–1.15
          const wScale = body ? 0.88 + (body.weight - 45) / (120 - 45) * 0.24 : 1;   // 0.88–1.12
          return (
            <img
              src="/body-shape.svg"
              alt="body silhouette"
              style={{
                position:"absolute",
                top:"50%", left:"50%",
                transform:`translate(-50%,-50%) scaleX(${wScale}) scaleY(${hScale})`,
                width:"100%",
                height:"100%",
                objectFit:"contain",
                objectPosition:"center",
                opacity: (selectedTop && selectedBottom) ? 0.18 : 0.45,
                transition:"opacity .5s, transform .4s ease",
                userSelect:"none",
                pointerEvents:"none",
              }}
            />
          );
        })()}

        {/* ── TOP GARMENT ZONE ──
             TO MOVE TOP DOWN: increase top% (e.g. "8%" → "14%")
             TO CHANGE TOP HEIGHT: adjust height% */}
        <div style={{
          position:"absolute",
          top:"8%", left:"8%", right:"8%",
          height:"48%",
          display:"flex",
          alignItems:"flex-end",
          justifyContent:"center",
          overflow:"hidden",
        }}>
          {selectedTop ? (
            <img
              src={selectedTop.img3d || selectedTop.img}
              alt={selectedTop.name}
              style={{
                width:"82%",
                height:"100%",
                objectFit:"contain",
                objectPosition:"center bottom",
                filter:"drop-shadow(0 8px 20px rgba(0,0,0,.55))",
                transition:"all .4s cubic-bezier(.22,1,.36,1)",
                animation:"fadeInUp .4s ease both",
              }}
            />
          ) : (
            <div style={{
              width:"82%", height:"60%",
              border:"1.5px dashed rgba(255,255,255,.12)",
              borderRadius:8,
              display:"flex", flexDirection:"column",
              alignItems:"center", justifyContent:"center",
              gap:".4rem",
            }}>
              <span style={{fontSize:"1.6rem", opacity:.3}}>👕</span>
              <span style={{fontSize:".58rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,255,255,.22)"}}>Choose Top</span>
            </div>
          )}
        </div>

        {/* ── BOTTOM GARMENT ZONE ──
             TO MOVE BOTTOM UP: increase bottom% (e.g. "8%" → "14%")
             TO CHANGE BOTTOM HEIGHT: adjust height% */}
        <div style={{
          position:"absolute",
          bottom:"11%", left:"8%", right:"8%",
          height:"48%",
          display:"flex",
          alignItems:"flex-start",
          justifyContent:"center",
          overflow:"hidden",
        }}>
          {selectedBottom ? (
            <img
              src={selectedBottom.img3d || selectedBottom.img}
              alt={selectedBottom.name}
              style={{
                width:"78%",
                height:"100%",
                objectFit:"contain",
                objectPosition:"center top",
                filter:"drop-shadow(0 -4px 16px rgba(0,0,0,.45))",
                transition:"all .4s cubic-bezier(.22,1,.36,1)",
                animation:"fadeInDown .4s ease both",
              }}
            />
          ) : (
            <div style={{
              width:"78%", height:"60%",
              border:"1.5px dashed rgba(255,255,255,.12)",
              borderRadius:8,
              display:"flex", flexDirection:"column",
              alignItems:"center", justifyContent:"center",
              gap:".4rem",
            }}>
              <span style={{fontSize:"1.6rem", opacity:.3}}>👖</span>
              <span style={{fontSize:".58rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,255,255,.22)"}}>Choose Bottom</span>
            </div>
          )}
        </div>

        {/* ── DIVIDER LINE between top and bottom zones ── */}
        <div style={{
          position:"absolute",
          top:"50%", left:"15%", right:"15%",
          height:"1px",
          background:"rgba(255,255,255,.07)",
          transform:"translateY(-50%)",
          pointerEvents:"none",
        }}/>
      </div>

      {/* ── ITEM LABELS at the bottom ── */}
      {(selectedTop || selectedBottom) && (
        <div style={{
          position:"absolute",
          bottom:0, left:0, right:0,
          background:"linear-gradient(transparent, rgba(0,0,0,.7))",
          padding:".6rem .8rem .7rem",
          display:"flex",
          justifyContent:"space-between",
          gap:".5rem",
          zIndex:10,
        }}>
          <div style={{flex:1}}>
            {selectedTop && (
              <div>
                <div style={{fontSize:".52rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,255,255,.4)"}}>Top</div>
                <div style={{fontSize:".68rem",color:"#fff",fontWeight:500,lineHeight:1.3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{selectedTop.name}</div>
                <div style={{fontSize:".6rem",color:"rgba(255,255,255,.5)"}}>{selectedTop.price}</div>
              </div>
            )}
          </div>
          <div style={{width:"1px",background:"rgba(255,255,255,.15)",flexShrink:0}}/>
          <div style={{flex:1,textAlign:"right"}}>
            {selectedBottom && (
              <div>
                <div style={{fontSize:".52rem",letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,255,255,.4)"}}>Bottom</div>
                <div style={{fontSize:".68rem",color:"#fff",fontWeight:500,lineHeight:1.3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{selectedBottom.name}</div>
                <div style={{fontSize:".6rem",color:"rgba(255,255,255,.5)"}}>{selectedBottom.price}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


function ProductCard({ item, selected, onSelect }) {
  return (
    <article className={`bo-product bo-soft${selected ? " on" : ""}`}>
      <div className="bo-thumb">
        <img src={item.img} alt={item.name} />
        <button className="bo-heart" type="button" aria-label="Favorite">❤</button>
      </div>
      <div className="bo-model-badge">{item.img3d ? "3D Try-On Ready" : "3D Fit Ready"}</div>
      <div className="bo-brand">{item.brand}</div>
      <div className="bo-name">{item.name}</div>
      <div className="bo-price">{item.price}</div>
      <button className={`bo-btn${selected ? " dark" : ""}`} type="button" onClick={() => onSelect(item)}>
        {selected ? "Selected" : "Select"}
      </button>
    </article>
  );
}

function MiniFavorite({ item }) {
  return (
    <div className="bo-mini">
      <img src={item.img} alt={item.name} />
      <div className="bo-mini-name">{item.name}</div>
      <div className="bo-mini-price">{item.price}</div>
    </div>
  );
}



const parsePrice = (priceStr) => {
  if (!priceStr || typeof priceStr !== 'string') return 0;
  // Removes all non-numeric characters except decimals
  const numericValue = priceStr.replace(/[^0-9.-]+/g, "");
  return parseFloat(numericValue) || 0;
};

function RecCard({ item }) {
  return (
    <article className="bo-rec">
      <div className="bo-thumb">
        <img src={item.img} alt={item.name} />
        <button className="bo-heart" type="button" aria-label="Favorite">❤</button>
      </div>
      <div className="bo-name">{item.name}</div>
      <div className="bo-price">{item.price}</div>
    </article>
  );
}

export default function BuildOutfit({ cart = [], setCart, wish = [] }) {

  const [selectedTop,    setSelectedTop]    = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const [favorites,      setFavorites]      = useState([]);
  const [body, setBody] = useState({
    height: 170, chest: 88, waist: 70, hips: 96, weight:70
  });

  const adultProducts = useMemo(
    () =>
      PRODUCTS.filter((product) => {
        const brand = String(product.brand || "").toLowerCase();
        const name = String(product.name || "").toLowerCase();
        const desc = String(product.desc || "").toLowerCase();
        const hasKidsSignal =
          brand === "ninos" ||
          name.includes("kids") ||
          desc.includes("kids") ||
          product.category === "boys" ||
          product.category === "girls" ||
          (product.sizes || []).some((size) => /\d+y/i.test(size));
        return !hasKidsSignal && product.img;
      }),
    []
  );

  const topProducts = useMemo(
    () => TOP_PRODUCT_IDS.map((id) => adultProducts.find((item) => item.id === id)).filter(Boolean),
    [adultProducts]
  );

  const bottomProducts = useMemo(
    () => BOTTOM_PRODUCT_IDS.map((id) => adultProducts.find((item) => item.id === id)).filter(Boolean),
    [adultProducts]
  );

  const recommendedProducts = useMemo(
    () =>
      adultProducts
        .filter((item) => item.id !== selectedTop?.id && item.id !== selectedBottom?.id && !TOP_PRODUCT_IDS.includes(item.id) && !BOTTOM_PRODUCT_IDS.includes(item.id))
        .slice(0, 3),
    [adultProducts, selectedBottom?.id, selectedTop?.id]
  );

  const favoritesToShow = favorites.length ? favorites.slice(-4) : [...topProducts, ...bottomProducts].slice(0, 4);
  const selectedCount = Number(Boolean(selectedTop)) + Number(Boolean(selectedBottom));
  const total = parsePrice(selectedTop?.price) + parsePrice(selectedBottom?.price);

  const selectProduct = (item, type) => {
    if (type === "top") setSelectedTop(item);
    else setSelectedBottom(item);
    setFavorites((prev) => (prev.some((saved) => saved.id === item.id) ? prev : [...prev, item]));
  };

  const addOutfit = () => {
    if (!selectedTop || !selectedBottom || !setCart) return;
    addItemToCart(setCart, selectedTop);
    addItemToCart(setCart, selectedBottom);
  };

  return (
    <div className="bo-page" style={{ minHeight: "100vh" }}>
      <style>{SHARED_CSS}</style>
      <style>{PAGE_CSS}</style>
      <SHNav cart={cart} wish={wish} />

      <div className="bo-shell">
        <header className="bo-hero">
          <h1 className="bo-title">Build Your Prefect Outfit</h1>
          <div className="bo-sub">Create your perfect look from local brands</div>
        </header>

        <div className="bo-layout">
          <aside className="bo-side">
            <SilhouettePreview selectedTop={selectedTop} selectedBottom={selectedBottom} body={body}/>



            <section className="bo-favorites bo-soft">
              <div className="bo-fav-title">
                <span>Your Favorite</span>
                <span style={{ color: "#df5e59", fontSize: ".9rem" }}>❤</span>
              </div>
              <div className="bo-mini-list">
                {favoritesToShow.map((item) => (<MiniFavorite key={item.id} item={item} />))}
              </div>
            </section>

            {/* Body measurements */}
            <section className="bo-data bo-soft" style={{marginTop:"1rem",padding:"1.15rem"}}>
              <div className="bo-card-title" style={{fontSize:".7rem",letterSpacing:".14em",textTransform:"uppercase",color:"#8a8173",marginBottom:"1rem",fontWeight:600}}>Body Measurements</div>
              {[
                ["height","Height","cm",140,195],
                ["chest","Chest","cm",75,125],
                ["waist","Waist","cm",55,105],
                ["hips","Hips","cm",80,130],
                ["weight","weight","kg",50,130],
              ].map(([key,label,unit,min,max])=>(
                <div key={key} style={{marginBottom:".8rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:".72rem",marginBottom:".3rem"}}>
                    <span style={{color:"#8a8173"}}>{label}</span>
                    <span style={{fontWeight:600,color:"#28231d"}}>{body[key]} {unit}</span>
                  </div>
                  <input type="range" min={min} max={max} value={body[key]}
                    onChange={e=>setBody(p=>({...p,[key]:Number(e.target.value)}))}
                    style={{width:"100%",accentColor:"#a7b08a",height:4,cursor:"pointer"}}/>
                </div>
              ))}
              <div style={{fontSize:".62rem",color:"#b9b1a3",marginTop:".5rem",lineHeight:1.5}}>
                Sliders reshape the silhouette to your body type
              </div>
            </section>
          </aside>

          <main className="bo-main">
            <section className="bo-step">
              <div className="bo-kicker">
                <strong>1. Choose Your Items</strong>
                <div>1. Choose Top</div>
              </div>
              <div className="bo-divider" />
              <div className="bo-grid">
                {topProducts.map((item) => (
                  <ProductCard key={item.id} item={item} selected={selectedTop?.id === item.id} onSelect={() => selectProduct(item, "top")} />
                ))}
              </div>
            </section>

            <section className="bo-step">
              <div className="bo-kicker">2. Choose Bottom</div>
              <div className="bo-divider" />
              <div className="bo-grid">
                {bottomProducts.map((item) => (
                  <ProductCard key={item.id} item={item} selected={selectedBottom?.id === item.id} onSelect={() => selectProduct(item, "bottom")} />
                ))}
              </div>
            </section>

            <section className="bo-step">
              <div className="bo-divider"><span>Recommended For You</span></div>
              <div className="bo-recs">
                {recommendedProducts.map((item) => (<RecCard key={item.id} item={item} />))}
              </div>
            </section>

            <div className="bo-summary">
              <div className="bo-pill">
                <small>Selected Pieces</small>
                <strong>{selectedCount}/2 chosen</strong>
              </div>
              <div className="bo-pill">
                <small>Preview</small>
                <strong>{selectedTop && selectedBottom ? "Full look ready ✓" : selectedTop || selectedBottom ? "Add one more piece" : "Select top + bottom"}</strong>
              </div>
              <div className="bo-pill">
                <small>Estimated Total</small>
                <strong>{total ? `LE ${total.toLocaleString()}` : "Choose top + bottom"}</strong>
              </div>
            </div>

            <div className="bo-actions">
              <button className="bo-primary" type="button" onClick={addOutfit} disabled={!selectedTop || !selectedBottom}>
                Add Outfit to Cart
              </button>
              <button className="bo-secondary" type="button">
                {selectedTop?.name || selectedBottom?.name ? "Alignment Tuned For Current Fit" : "Pick A Top And Bottom First"}
              </button>
            </div>
          </main>
        </div>
      </div>

      <SHFooter />
    </div>
  );
}