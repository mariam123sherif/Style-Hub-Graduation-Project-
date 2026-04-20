import { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS, useScrollReveal, SHARED_CSS } from "./shared.jsx";
import VirtualTryOn3D from "../components/VirtualTryOn3D.jsx";

// ─── PAGE CSS ───
const PAGE_CSS = `
${SHARED_CSS}

/* ── BUILD OUTFIT PAGE ── */
.bof-page {
  background: var(--cream);
  min-height: 100vh;
}

.bof-header {
  background: #fff;
  padding: 60px 24px 40px;
  text-align: center;
  border-bottom: 1px solid var(--border);
}

.bof-header h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: var(--dark);
  margin-bottom: 8px;
}

.bof-header p {
  color: var(--warm);
  font-size: .9rem;
  font-style: italic;
}

.bof-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 40px;
}

@media (max-width: 1024px) {
  .bof-main {
    grid-template-columns: 1fr;
  }
}

/* ── MANNEQUIN PANEL ── */
.bof-mannequin-panel {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 28px;
  position: sticky;
  top: 100px;
  height: fit-content;
}

.bof-mannequin-wrap {
  background: transparent;
  border-radius: 6px;
  aspect-ratio: 3/4;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  transition: all .3s;
}

.bof-mannequin-wrap.drag-over {
  transform: scale(1.02);
}

.bof-trying-on-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,.7);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
}

.bof-trying-on-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border);
  border-top-color: var(--sage);
  border-radius: 50%;
  animation: bof-spin 1s linear infinite;
}

@keyframes bof-spin {
  to { transform: rotate(360deg); }
}

.bof-trying-on-text {
  font-size: .7rem;
  color: var(--warm);
  letter-spacing: .1em;
}

.bof-zoom-controls {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  gap: 6px;
  z-index: 5;
}

.bof-zoom-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all .2s;
  font-size: .9rem;
  color: var(--dark);
}

.bof-zoom-btn:hover {
  background: var(--sage);
  border-color: var(--sage);
  color: #fff;
}

.bof-drop-zone-top {
  position: absolute;
  top: 20%;
  left: 25%;
  right: 25%;
  height: 35%;
  border: 2px dashed transparent;
  border-radius: 8px;
  transition: all .2s;
  z-index: 3;
}

.bof-drop-zone-top.active {
  border-color: var(--sage);
  background: rgba(146,160,121,.1);
}

.bof-drop-zone-bottom {
  position: absolute;
  top: 55%;
  left: 30%;
  right: 30%;
  height: 35%;
  border: 2px dashed transparent;
  border-radius: 8px;
  transition: all .2s;
  z-index: 3;
}

.bof-drop-zone-bottom.active {
  border-color: var(--sage);
  background: rgba(146,160,121,.1);
}

.bof-mannequin-placeholder {
  text-align: center;
  color: var(--warm);
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.bof-mannequin-placeholder svg {
  width: 120px;
  height: 120px;
  opacity: .4;
  margin-bottom: 12px;
}

.bof-mannequin-placeholder span {
  font-size: .75rem;
  letter-spacing: .08em;
}

/* Gender Toggle */
.bof-gender-toggle {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.bof-gender-btn {
  flex: 1;
  border: 1.5px solid var(--border);
  background: transparent;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all .2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: .85rem;
  color: var(--dark);
}

.bof-gender-btn:hover {
  border-color: var(--sage);
}

.bof-gender-btn.active {
  background: var(--dark);
  border-color: var(--dark);
  color: #fff;
}

.bof-gender-btn svg {
  width: 18px;
  height: 18px;
}

/* Body Data Form */
.bof-form-label {
  font-size: .65rem;
  letter-spacing: .15em;
  text-transform: uppercase;
  color: var(--warm);
  margin-top: 20px;
  margin-bottom: 12px;
  display: block;
}

.bof-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.bof-input-wrap {
  position: relative;
}

.bof-input {
  width: 100%;
  border: 1.5px solid var(--border);
  border-radius: 4px;
  padding: 10px 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: .8rem;
  color: var(--dark);
  background: var(--cream);
  outline: none;
  transition: border-color .2s;
}

.bof-input:focus {
  border-color: var(--sage);
  background: #fff;
}

.bof-input-label {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: .65rem;
  color: var(--warm);
  pointer-events: none;
}

.bof-generate-model-btn {
  width: 100%;
  background: var(--sage);
  color: #fff;
  border: none;
  padding: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: .75rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 4px;
  transition: all .25s;
}

.bof-generate-model-btn:hover {
  background: var(--deep);
}

/* ── FAVORITES SIDEBAR ── */
.bof-favorites {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.bof-favorites-title {
  font-size: .85rem;
  font-weight: 600;
  color: var(--dark);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.bof-favorites-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bof-fav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: var(--cream);
  border-radius: 6px;
  transition: all .2s;
}

.bof-fav-item:hover {
  background: #f0ece5;
}

.bof-fav-img {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  object-fit: cover;
  background: #fff;
}

.bof-fav-info {
  flex: 1;
  min-width: 0;
}

.bof-fav-name {
  font-size: .75rem;
  color: var(--dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bof-fav-price {
  font-size: .7rem;
  color: var(--warm);
  font-weight: 500;
}

.bof-fav-remove {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: var(--warm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: color .2s;
}

.bof-fav-remove:hover {
  color: var(--red);
}

/* ── OUTFIT BUILDER ── */
.bof-builder {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.bof-section {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 32px;
}

.bof-section-header {
  margin-bottom: 24px;
}

.bof-section-num {
  font-size: .6rem;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--sage);
  margin-bottom: 6px;
}

.bof-section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--dark);
}

.bof-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.bof-product-card {
  border: 1.5px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  transition: all .25s;
  position: relative;
}

.bof-product-card:hover {
  border-color: var(--sage);
  box-shadow: 0 8px 24px rgba(0,0,0,.06);
}

.bof-product-card.selected {
  border-color: var(--dark);
  background: rgba(146,160,121,.05);
}

.bof-card-img-wrap {
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f8f6f2;
  position: relative;
}

.bof-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .4s;
  cursor: grab;
}

.bof-card-img:active {
  cursor: grabbing;
}

.bof-product-card:hover .bof-card-img {
  transform: scale(1.05);
}

.bof-drag-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,.6);
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: .65rem;
  opacity: 0;
  transition: opacity .2s;
  pointer-events: none;
  white-space: nowrap;
}

.bof-card-img-wrap:hover .bof-drag-hint {
  opacity: 1;
}

.bof-card-heart {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--warm);
  transition: all .2s;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
}

.bof-card-heart:hover {
  color: var(--red);
  transform: scale(1.1);
}

.bof-card-heart.active {
  color: var(--red);
}

.bof-card-body {
  padding: 14px;
}

.bof-card-brand {
  font-size: .55rem;
  letter-spacing: .15em;
  text-transform: uppercase;
  color: var(--warm);
  margin-bottom: 4px;
}

.bof-card-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: .95rem;
  color: var(--dark);
  margin-bottom: 6px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bof-card-price {
  font-size: .8rem;
  font-weight: 600;
  color: var(--dark);
}

.bof-card-select {
  width: 100%;
  background: var(--dark);
  color: #fff;
  border: none;
  padding: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: .65rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 3px;
  transition: all .2s;
}

.bof-card-select:hover {
  background: var(--sage);
}

.bof-card-select.active {
  background: var(--sage);
}

/* ── RECOMMENDED SECTION ── */
.bof-recommended {
  text-align: center;
}

.bof-recommended-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--dark);
  margin-bottom: 32px;
}

.bof-recommended-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

/* ── EMPTY STATE ── */
.bof-empty {
  text-align: center;
  padding: 40px 20px;
  color: var(--warm);
}

.bof-empty-icon {
  font-size: 2.5rem;
  opacity: .4;
  margin-bottom: 12px;
}

.bof-empty p {
  font-size: .8rem;
}

/* ── COMPLETE OUTFIT BAR ── */
.bof-complete-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--dark);
  color: #fff;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: translateY(100%);
  transition: transform .3s;
  z-index: 1000;
}

.bof-complete-bar.visible {
  transform: translateY(0);
}

.bof-complete-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.bof-complete-count {
  background: var(--sage);
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .8rem;
  font-weight: 600;
}

.bof-complete-text {
  font-size: .85rem;
}

.bof-complete-btn {
  background: #fff;
  color: var(--dark);
  border: none;
  padding: 10px 24px;
  font-family: 'DM Sans', sans-serif;
  font-size: .75rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 4px;
  transition: all .2s;
}

.bof-complete-btn:hover {
  background: var(--sage);
  color: #fff;
}
`;

// ─── ICONS ───
const FemaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M12 12v8"/>
    <path d="M9 15l6 0"/>
  </svg>
);

const MaleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="8" r="4"/>
    <path d="M14 12l6-6"/>
    <path d="M20 6l-6 0"/>
    <path d="M12 12v8"/>
    <path d="M9 15l6 0"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.0 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const MannequinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="4" r="2.5"/>
    <path d="M12 6.5v5"/>
    <path d="M8 9h8"/>
    <path d="M12 11.5v6"/>
    <path d="M9 14h6"/>
    <path d="M12 17.5v3"/>
    <path d="M9 20h6"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ─── MAIN PAGE ───
export default function BuildOutfitPage({ wishlist = [], toggleWish, cartCount = 0, addToCart, toast }) {
  const addRef = useScrollReveal();

  const [gender, setGender] = useState("female");
  const [bodyData, setBodyData] = useState({
    height: "",
    weight: "",
    chest: "",
    waist: "",
    hips: "",
    inseam: "",
    shoulderWidth: "",
    armLength: "",
  });
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isTryingOn, setIsTryingOn] = useState(false);
  const [mannequinZoom, setMannequinZoom] = useState(1);
  const [draggedItem, setDraggedItem] = useState(null);

  const tops = PRODUCTS.filter(p => 
    p.type === "tops" || p.category === "tops" || p.name.includes("Sweater") || p.name.includes("Hoodie") || p.name.includes("T-Shirt") || p.name.includes("Zip")
  ).slice(0, 6);

  const bottoms = PRODUCTS.filter(p => 
    p.type === "bottoms" || p.category === "trousers" || p.category === "pants" || p.name.includes("Jeans") || p.name.includes("Pant") || p.name.includes("Trouser")
  ).slice(0, 6);

  const recommended = PRODUCTS.filter(p => p.tab === "best").slice(0, 4);

  const handleBodyChange = (field, value) => {
    setBodyData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateModel = () => {
    setIsTryingOn(true);
    setTimeout(() => {
      setIsTryingOn(false);
      toast && toast("3D Model updated with your measurements!");
    }, 1500);
  };

  const handleSelectTop = (product) => {
    setIsTryingOn(true);
    setSelectedTop(product);
    if (!favorites.find(f => f.id === product.id)) {
      setFavorites(prev => [...prev, product]);
    }
    setTimeout(() => {
      setIsTryingOn(false);
      toast && toast("Top selected! Try it on the 3D model.");
    }, 800);
  };

  const handleSelectBottom = (product) => {
    setIsTryingOn(true);
    setSelectedBottom(product);
    if (!favorites.find(f => f.id === product.id)) {
      setFavorites(prev => [...prev, product]);
    }
    setTimeout(() => {
      setIsTryingOn(false);
      toast && toast("Bottom selected! Try it on the 3D model.");
    }, 800);
  };

  const handleDragStart = (e, item, type) => {
    setDraggedItem({ ...item, dragType: type });
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e, dropType) => {
    e.preventDefault();
    if (draggedItem) {
      if (dropType === "top" && draggedItem.dragType === "top") {
        handleSelectTop(draggedItem);
      } else if (dropType === "bottom" && draggedItem.dragType === "bottom") {
        handleSelectBottom(draggedItem);
      }
      setDraggedItem(null);
    }
  };

  const handleZoomIn = () => setMannequinZoom(prev => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setMannequinZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setMannequinZoom(1);

  const removeFromFavorites = (id) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
    if (selectedTop?.id === id) setSelectedTop(null);
    if (selectedBottom?.id === id) setSelectedBottom(null);
  };

  const toggleWishlist = (id) => {
    toggleWish && toggleWish(id);
  };

  const ProductCard = ({ product, onSelect, selected, type }) => (
    <div className={`bof-product-card ${selected?.id === product.id ? 'selected' : ''}`} ref={addRef}>
      <div className="bof-card-img-wrap">
        <img
          src={product.img}
          alt={product.name}
          className="bof-card-img"
          draggable
          onDragStart={(e) => handleDragStart(e, product, type)}
          onError={(e) => { e.target.src = "/placeholder.jpg"; }}
        />
        <div className="bof-drag-hint">👆 Drag to try on</div>
        <button
          className={`bof-card-heart ${wishlist.includes(product.id) ? 'active' : ''}`}
          onClick={() => toggleWishlist(product.id)}
        >
          <HeartIcon filled={wishlist.includes(product.id)} />
        </button>
      </div>
      <div className="bof-card-body">
        <div className="bof-card-brand">{product.brand}</div>
        <div className="bof-card-name">{product.name}</div>
        <div className="bof-card-price">{product.price}</div>
        <button
          className={`bof-card-select ${selected?.id === product.id ? 'active' : ''}`}
          onClick={() => onSelect(product)}
        >
          {selected?.id === product.id ? '✓ Selected' : 'Select'}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{PAGE_CSS}</style>

      {/* Header */}
      <div className="bof-header">
        <h1>Build Your Perfect Outfit</h1>
        <p>Create your perfect look from local brands</p>
      </div>

      {/* Main Content */}
      <div className="bof-main">
        {/* Left Panel - Mannequin & Favorites */}
        <div className="bof-left-panel">
          {/* Mannequin Panel */}
          <div className="bof-mannequin-panel">
            <div 
              className={`bof-mannequin-wrap ${draggedItem ? 'drag-over' : ''}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'full')}
              style={{ padding: 0, background: 'transparent' }}
            >
              {/* 3D Virtual Try-On Model */}
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <VirtualTryOn3D
                  gender={gender}
                  bodyData={bodyData}
                  selectedTop={selectedTop}
                  selectedBottom={selectedBottom}
                  autoRotate={false}
                  onModelReady={() => {
                    if (isTryingOn) {
                      setTimeout(() => setIsTryingOn(false), 500);
                    }
                  }}
                />

                {/* Trying On Overlay */}
                {isTryingOn && (
                  <div className="bof-trying-on-overlay">
                    <div className="bof-trying-on-spinner"></div>
                    <span className="bof-trying-on-text">TRYING ON...</span>
                  </div>
                )}
              </div>

              {/* Zoom Controls */}
              <div className="bof-zoom-controls">
                <button className="bof-zoom-btn" onClick={handleZoomOut} title="Zoom out">−</button>
                <button className="bof-zoom-btn" onClick={handleResetZoom} title="Reset zoom">⟲</button>
                <button className="bof-zoom-btn" onClick={handleZoomIn} title="Zoom in">+</button>
              </div>

              {/* Drop Zones (invisible but functional) */}
              <div 
                className={`bof-drop-zone-top ${draggedItem?.dragType === 'top' ? 'active' : ''}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'top')}
                style={{ pointerEvents: isTryingOn ? 'none' : 'auto' }}
              />
              <div 
                className={`bof-drop-zone-bottom ${draggedItem?.dragType === 'bottom' ? 'active' : ''}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'bottom')}
                style={{ pointerEvents: isTryingOn ? 'none' : 'auto' }}
              />

              {/* Placeholder (shown when loading) */}
              {!selectedTop && !selectedBottom && !isTryingOn && (
                <div className="bof-mannequin-placeholder">
                  <MannequinIcon />
                  <span>Drag items here or select from below</span>
                </div>
              )}
            </div>

            {/* Gender Toggle */}
            <div className="bof-gender-toggle">
              <button
                className={`bof-gender-btn ${gender === 'female' ? 'active' : ''}`}
                onClick={() => setGender('female')}
              >
                <FemaleIcon /> Female
              </button>
              <button
                className={`bof-gender-btn ${gender === 'male' ? 'active' : ''}`}
                onClick={() => setGender('male')}
              >
                <MaleIcon /> Male
              </button>
            </div>

            {/* Body Data Form */}
            <span className="bof-form-label">Enter Your Body Data</span>
            <div className="bof-form-grid">
              <div className="bof-input-wrap">
                <input
                  type="text"
                  className="bof-input"
                  placeholder="165"
                  value={bodyData.height}
                  onChange={(e) => handleBodyChange('height', e.target.value)}
                />
                <span className="bof-input-label">cm</span>
              </div>
              <div className="bof-input-wrap">
                <input
                  type="text"
                  className="bof-input"
                  placeholder="55"
                  value={bodyData.weight}
                  onChange={(e) => handleBodyChange('weight', e.target.value)}
                />
                <span className="bof-input-label">kg</span>
              </div>
              <div className="bof-input-wrap">
                <input
                  type="text"
                  className="bof-input"
                  placeholder="85"
                  value={bodyData.chest}
                  onChange={(e) => handleBodyChange('chest', e.target.value)}
                />
                <span className="bof-input-label">cm</span>
              </div>
              <div className="bof-input-wrap">
                <input
                  type="text"
                  className="bof-input"
                  placeholder="70"
                  value={bodyData.waist}
                  onChange={(e) => handleBodyChange('waist', e.target.value)}
                />
                <span className="bof-input-label">cm</span>
              </div>
              <div className="bof-input-wrap">
                <input
                  type="text"
                  className="bof-input"
                  placeholder="90"
                  value={bodyData.hips}
                  onChange={(e) => handleBodyChange('hips', e.target.value)}
                />
                <span className="bof-input-label">cm</span>
              </div>
              <div className="bof-input-wrap">
                <input
                  type="text"
                  className="bof-input"
                  placeholder="78"
                  value={bodyData.inseam}
                  onChange={(e) => handleBodyChange('inseam', e.target.value)}
                />
                <span className="bof-input-label">cm</span>
              </div>
              <div className="bof-input-wrap">
                <input
                  type="text"
                  className="bof-input"
                  placeholder="40"
                  value={bodyData.shoulderWidth}
                  onChange={(e) => handleBodyChange('shoulderWidth', e.target.value)}
                />
                <span className="bof-input-label">cm</span>
              </div>
              <div className="bof-input-wrap">
                <input
                  type="text"
                  className="bof-input"
                  placeholder="58"
                  value={bodyData.armLength}
                  onChange={(e) => handleBodyChange('armLength', e.target.value)}
                />
                <span className="bof-input-label">cm</span>
              </div>
            </div>

            <button className="bof-generate-model-btn" onClick={handleGenerateModel}>
              Update 3D Model
            </button>

            {/* Favorites List */}
            {favorites.length > 0 && (
              <div className="bof-favorites">
                <div className="bof-favorites-title">
                  <HeartIcon filled={true} /> Your Favorites
                </div>
                <div className="bof-favorites-list">
                  {favorites.map(item => (
                    <div key={item.id} className="bof-fav-item">
                      <img src={item.img} alt={item.name} className="bof-fav-img" />
                      <div className="bof-fav-info">
                        <div className="bof-fav-name">{item.name}</div>
                        <div className="bof-fav-price">{item.price}</div>
                      </div>
                      <button
                        className="bof-fav-remove"
                        onClick={() => removeFromFavorites(item.id)}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Outfit Builder */}
        <div className="bof-builder">
          {/* Choose Top */}
          <div className="bof-section" ref={addRef}>
            <div className="bof-section-header">
              <div className="bof-section-num">1. Choose Your Items</div>
              <h2 className="bof-section-title">Choose Top</h2>
            </div>
            <div className="bof-products-grid">
              {tops.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={handleSelectTop}
                  selected={selectedTop}
                  type="top"
                />
              ))}
            </div>
          </div>

          {/* Choose Bottom */}
          <div className="bof-section" ref={addRef}>
            <div className="bof-section-header">
              <div className="bof-section-num">2. Choose Bottom</div>
              <h2 className="bof-section-title">Choose Bottom</h2>
            </div>
            <div className="bof-products-grid">
              {bottoms.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={handleSelectBottom}
                  selected={selectedBottom}
                  type="bottom"
                />
              ))}
            </div>
          </div>

          {/* Recommended For You */}
          <div className="bof-section bof-recommended" ref={addRef}>
            <h2 className="bof-recommended-title">Recommended For You</h2>
            <div className="bof-recommended-grid">
              {recommended.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={() => {
                    if (!favorites.find(f => f.id === product.id)) {
                      setFavorites(prev => [...prev, product]);
                    }
                    toast && toast("Added to favorites!");
                  }}
                  selected={null}
                  type="recommendation"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Complete Outfit Bar */}
      {(selectedTop && selectedBottom) && (
        <div className="bof-complete-bar visible">
          <div className="bof-complete-info">
            <div className="bof-complete-count">{favorites.length}</div>
            <span className="bof-complete-text">Outfit complete! Add to cart or save for later.</span>
          </div>
          <button
            className="bof-complete-btn"
            onClick={() => {
              addToCart && addToCart();
              toast && toast("Outfit added to cart!");
            }}
          >
            Add to Cart
          </button>
        </div>
      )}
    </>
  );
}
