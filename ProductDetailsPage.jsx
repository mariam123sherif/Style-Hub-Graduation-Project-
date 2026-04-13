import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/men.css'
import '../styles/product-details.css'

/* ══════════════════════════════════════════
   ALL PRODUCTS — same ids as MenPage & BlackClosetPage
══════════════════════════════════════════ */
export const ALL_PRODUCTS = [
  /* NEW ARRIVALS */
  {
    id: 'na-1', name: 'Black Zip Abaya',     price: 1200,           brand: 'Black Closet',
    img: '/images/new_arr_1.png',
    sizes: ['XS','S','M','L','XL'], colors: ['#1a1a1a','#4a4a4a'],
    material: 'Crepe', rating: 4.8, reviews: 124,
    desc: 'A sleek black zip abaya crafted from premium crepe fabric. Features a full-length front zip, wide sleeves, and a flowy silhouette perfect for everyday modest wear.',
  },
  {
    id: 'na-2', name: 'Crimson Satin Dress', price: 2100,           brand: 'Tajamml',
    img: '/images/new_arr_2.png',
    sizes: ['XS','S','M','L'],      colors: ['#8b1a2e','#1a1a1a'],
    material: 'Satin', rating: 4.9, reviews: 89,
    desc: 'A stunning crimson satin gown with dramatic butterfly sleeves. Perfect for special occasions and formal events.',
  },
  {
    id: 'na-3', name: 'Olive Forest Abaya',  price: 1800,           brand: 'Antika',
    img: '/images/new_arr_3.png',
    sizes: ['S','M','L','XL'],      colors: ['#4a5c38','#2a3a20'],
    material: 'Linen Blend', rating: 4.7, reviews: 56,
    desc: 'Earthy olive tones meet minimal design in this forest-inspired open abaya. Lightweight linen blend fabric.',
  },
  {
    id: 'na-4', name: 'Teal Ruffle Abaya',   price: 2500, old: 3200, brand: 'Richness', tag: 'Sale',
    img: '/images/new_arr_4.webp',
    sizes: ['XS','S','M','L','XL'], colors: ['#2a7d8c'],
    material: 'Chiffon', rating: 4.9, reviews: 203,
    desc: 'Bold ruffled sleeves cascade dramatically on this teal chiffon abaya. A statement piece combining modest elegance with fashion-forward design.',
  },
  {
    id: 'na-5', name: 'Beige Poncho Set',    price: 1600,           brand: 'Sotra',
    img: '/images/new_arr_6.jpeg',
    sizes: ['One Size','S/M','L/XL'], colors: ['#c8b89a','#a89878'],
    material: 'Knit', rating: 4.6, reviews: 167,
    desc: 'A cozy matching poncho and skirt set in warm beige tones. Ultra-soft knit fabric perfect for layering.',
  },
  /* TRENDING */
  {
    id: 'tr-1', name: 'Twenty Seven Puff Hoodie',   price: 1200,           brand: 'Twenty Seven',
    img: '/images/87f3863a35134ab6fed9cf27d4fa1a0214789e87.png',
    sizes: ['S','M','L','XL','XXL'], colors: ['#888','#1a1a1a'],
    material: 'Fleece', rating: 4.7, reviews: 88,
    desc: 'Oversized puff hoodie from Twenty Seven. Premium heavyweight fleece with embossed logo detail. A streetwear essential.',
  },
  {
    id: 'tr-2', name: 'Moon Walk Puff Print Pants', price: 2100, tag: 'New', brand: 'Moon Walk',
    img: '/images/8672b4984420818e2bfea5702f1af4840aa0ad21.png',
    sizes: ['XS','S','M','L','XL'], colors: ['#2a5a8c','#1a1a1a'],
    material: 'Cotton', rating: 4.8, reviews: 62,
    desc: 'Wide-leg pants with Moon Walk graffiti print. Bold street style with elastic waistband for comfort.',
  },
  {
    id: 'tr-3', name: 'Wide Leg Jeans',             price: 1800,           brand: 'Salty',
    img: '/images/29c068db4a2c11a9e604985ece90c94ae6e3b472.png',
    sizes: ['XS','S','M','L'],      colors: ['#4a6890'],
    material: 'Denim', rating: 4.6, reviews: 45,
    desc: 'Classic wide leg jeans with a relaxed fit. High-waisted cut, clean minimal design.',
  },
  {
    id: 'tr-4', name: 'Teal Ruffle Abaya',          price: 2500, old: 3200, tag: 'Sale', brand: 'Richness',
    img: '/images/27939c1f8b958ffe72794882dc7504e80c74f676.png',
    sizes: ['XS','S','M','L','XL'], colors: ['#2a7d8c'],
    material: 'Chiffon', rating: 4.9, reviews: 74,
    desc: 'Elegant teal chiffon abaya with cascading ruffle details on sleeves and hem.',
  },
  {
    id: 'tr-5', name: 'Beige Poncho Set',           price: 1600,           brand: 'Sotra',
    img: '/images/28052072a156938200eaac190138469eb060dbe9.png',
    sizes: ['One Size','S/M','L/XL'], colors: ['#c8b89a'],
    material: 'Knit', rating: 4.5, reviews: 39,
    desc: 'Matching poncho and skirt in warm beige knit. Effortlessly stylish everyday set.',
  },
  {
    id: 'tr-6', name: 'Grey Wool Abaya',            price: 1400,           brand: 'Black Closet',
    img: '/images/093b2d43a9c4d3aff1e3f64cf82c73fed5c2ec0d.png',
    sizes: ['S','M','L','XL'],      colors: ['#555','#333'],
    material: 'Wool Blend', rating: 4.6, reviews: 54,
    desc: 'Classic grey wool-blend open abaya with waterfall collar. Perfect for autumn and winter layering.',
  },
  /* TOP PICKS */
  {
    id: 'pk-1', name: 'Knitted Winter Polo',      price: 900,  brand: 'Marble',
    img: '/images/c7bd36ff385aa5015a18fe1973a7820c9fd65fe0.png',
    sizes: ['S','M','L','XL'],      colors: ['#1a1a1a','#fff'],
    material: 'Knit Cotton', rating: 4.8, reviews: 155,
    desc: 'Slim-fit knitted polo shirt in premium cotton. Marble signature minimal design, perfect for smart-casual looks.',
  },
  {
    id: 'pk-2', name: 'Basic Hoodie',             price: 700,  brand: 'Twenty Seven',
    img: '/images/e37eaa7bbbf402f1033ace13c719755237a3ee82.png',
    sizes: ['S','M','L','XL','XXL'], colors: ['#c8a88a','#1a1a1a','#888'],
    material: 'Fleece', rating: 4.7, reviews: 203,
    desc: 'Essential oversized hoodie from Twenty Seven. Drop-shoulder fit, kangaroo pocket, tonal embroidery.',
  },
  {
    id: 'pk-3', name: 'Pleated Trouser',          price: 1500, brand: 'Salty',
    img: '/images/f05ec6cea80ca6c85a36997bcef1fb878681373b.png',
    sizes: ['XS','S','M','L'],      colors: ['#f5f0e0','#1a1a1a'],
    material: 'Linen', rating: 4.6, reviews: 91,
    desc: 'Wide-leg pleated trousers in crisp linen. Elastic waistband, clean minimal aesthetic.',
  },
  {
    id: 'pk-4', name: 'Twenty Seven Puff Hoodie', price: 900,  brand: 'Twenty Seven',
    img: '/images/c7bd36ff385aa5015a18fe1973a7820c9fd65fe0.png',
    sizes: ['S','M','L','XL','XXL'], colors: ['#1a1a1a','#888'],
    material: 'Fleece', rating: 4.9, reviews: 312,
    desc: 'The iconic puff hoodie from Twenty Seven. Heavyweight fleece, boxy fit, signature embossed chest logo.',
  },
  /* BLACK CLOSET */
  {
    id: 'bc-1', name: 'Black Zip Abaya',          price: 1200, old: 1600, brand: 'Black Closet',
    img: '/images/brand2.avif',
    sizes: ['XS','S','M','L','XL'], colors: ['#1a1a1a'],
    material: 'Crepe', rating: 5, reviews: 124,
    desc: 'The signature Black Closet zip abaya. Minimal design, premium crepe fabric, full-length front zip.',
  },
  {
    id: 'bc-2', name: 'Crimson Satin Dress',       price: 2100, old: 2800, brand: 'Black Closet',
    img: '/images/prod-red-dress.png',
    sizes: ['XS','S','M','L'],      colors: ['#8b1a2e'],
    material: 'Satin', rating: 5, reviews: 89,
    desc: 'Dramatic crimson satin with puffed sleeves. A statement formal piece from Black Closet.',
  },
  {
    id: 'bc-3', name: 'Olive Garden Abaya',        price: 1800,           brand: 'Black Closet',
    img: '/images/prod-green-abaya.png',
    sizes: ['S','M','L','XL'],      colors: ['#4a5c38','#6a7c58'],
    material: 'Chiffon', rating: 4, reviews: 56,
    desc: 'Earthy gradient open abaya with botanical print buttons. Summer-ready modest fashion.',
  },
  {
    id: 'bc-4', name: 'Teal Ruffle Abaya',         price: 2500, old: 3200, brand: 'Black Closet',
    img: '/images/prod-teal-abaya.png',
    sizes: ['XS','S','M','L','XL'], colors: ['#2a7d8c'],
    material: 'Chiffon', rating: 5, reviews: 203,
    desc: 'Teal chiffon with cascading ruffle trim. A bestselling statement abaya from the collection.',
  },
  {
    id: 'bc-5', name: 'Beige Poncho Set',          price: 1600,           brand: 'Black Closet',
    img: '/images/Sotra.webp',
    sizes: ['One Size','S/M','L/XL'], colors: ['#c8b89a'],
    material: 'Knit', rating: 4, reviews: 167,
    desc: 'Matching poncho top and maxi skirt in warm beige. Cozy, modest, effortlessly elegant.',
  },
  {
    id: 'bc-6', name: 'Grey Wool Abaya',           price: 1400, old: 1900, brand: 'Black Closet',
    img: '/images/prod-grey-abaya.png',
    sizes: ['S','M','L','XL'],      colors: ['#555','#888'],
    material: 'Wool Blend', rating: 4, reviews: 54,
    desc: 'Oversized open abaya in structured grey wool blend. Waterfall collar, front pockets.',
  },
  {
    id: 'bc-7', name: 'Royal Blue Gown',           price: 3100, old: 3800, brand: 'Black Closet',
    img: '/images/brand5.png',
    sizes: ['XS','S','M','L'],      colors: ['#1a3a8c'],
    material: 'Tulle', rating: 5, reviews: 38,
    desc: 'Sequin bodice with flowing blue tulle skirt. A showstopping gown for the most special occasions.',
  },
]

/* ══════════════════════════════════════════
   STARS COMPONENT
══════════════════════════════════════════ */
function Stars({ n }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <i key={i}
           className={`bi bi-star${i <= Math.round(n) ? '-fill' : ''}`}
           style={{ color: i <= Math.round(n) ? '#d4a843' : '#ddd', fontSize: '.75rem' }} />
      ))}
    </span>
  )
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function ProductDetailsPage() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const location   = useLocation()

  /* ── FIND PRODUCT — state first, then lookup by id ── */
  const stateProduct = location.state?.product
  const product = stateProduct
    ? ALL_PRODUCTS.find(p => p.id === stateProduct.id) || stateProduct
    : ALL_PRODUCTS.find(p => p.id === id)

  /* ── STATE ── */
  const [selSize,    setSelSize]    = useState(null)
  const [selColor,   setSelColor]   = useState(0)
  const [qty,        setQty]        = useState(1)
  const [wishlisted, setWish]       = useState(false)
  const [added,      setAdded]      = useState(false)
  const [sizeErr,    setSizeErr]    = useState(false)

  /* scroll to top on mount */
  useEffect(() => { window.scrollTo(0, 0) }, [id])

  /* ── NOT FOUND ── */
  if (!product) {
    return (
      <div>
        <Navbar />
        <div style={{
          minHeight: '60vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '1rem'
        }}>
          <i className="bi bi-bag-x" style={{ fontSize: '3rem', color: '#ccc' }} />
          <h2 style={{ fontFamily: 'var(--fd)', color: 'var(--c-dark)' }}>Product not found</h2>
          <p style={{ color: 'var(--c-gray)', fontSize: '.88rem' }}>
            We couldn't find the product you're looking for.
          </p>
          <button className="btn-dk" onClick={() => navigate('/men')}>
            ← Back to Men's Page
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  /* ── RELATED PRODUCTS ── */
  const related = ALL_PRODUCTS
    .filter(p => p.id !== product.id && p.brand === product.brand)
    .slice(0, 4)

  /* ── ADD TO CART ── */
  const handleAddToCart = () => {
    if (!selSize) { setSizeErr(true); return }
    setSizeErr(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      <Navbar />

      {/* BREADCRUMB */}
      <div className="pd-breadcrumb">
        <div className="container">
          <span className="pd-bc-link" onClick={() => navigate('/men')}>Men</span>
          <span className="pd-bc-sep"> / </span>
          <span className="pd-bc-link" onClick={() => navigate(-1)}>{product.brand}</span>
          <span className="pd-bc-sep"> / </span>
          <span className="pd-bc-current">{product.name}</span>
        </div>
      </div>

      {/* MAIN SECTION */}
      <section className="pd-section">
        <div className="container">
          <div className="row g-5">

            {/* LEFT — Image */}
            <div className="col-12 col-md-6">
              <div className="pd-img-wrap">
                <img src={product.img} alt={product.name} className="pd-main-img" />
                {product.tag && (
                  <span className={`pd-tag ${product.tag === 'Sale' ? 'sale' : 'new'}`}>
                    {product.tag}
                  </span>
                )}
                <button
                  className={`pd-wish-btn ${wishlisted ? 'on' : ''}`}
                  onClick={() => setWish(!wishlisted)}
                >
                  <i className={`bi ${wishlisted ? 'bi-heart-fill' : 'bi-heart'}`} />
                </button>
              </div>
            </div>

            {/* RIGHT — Details */}
            <div className="col-12 col-md-6">
              <div className="pd-details">

                <div className="pd-brand">{product.brand}</div>
                <h1 className="pd-name">{product.name}</h1>

                {/* Rating */}
                <div className="pd-rating-row">
                  <Stars n={product.rating} />
                  <span className="pd-rating-txt">
                    {product.rating} · {product.reviews} reviews
                  </span>
                </div>

                {/* Price */}
                <div className="pd-price-row">
                  {product.old && (
                    <span className="pd-old-price">LE {product.old.toLocaleString()}</span>
                  )}
                  <span className="pd-price">LE {product.price.toLocaleString()}</span>
                  {product.old && (
                    <span className="pd-discount-badge">
                      {Math.round((1 - product.price / product.old) * 100)}% OFF
                    </span>
                  )}
                </div>

                <div className="pd-divider" />

                {/* Material */}
                <div className="pd-row">
                  <span className="pd-label">Material</span>
                  <span className="pd-value">{product.material}</span>
                </div>

                {/* Color */}
                {product.colors?.length > 0 && (
                  <div className="pd-row">
                    <span className="pd-label">Color</span>
                    <div className="pd-colors">
                      {product.colors.map((c, i) => (
                        <button
                          key={i}
                          className={`pd-color-btn ${selColor === i ? 'on' : ''}`}
                          style={{ background: c, border: c === '#fff' ? '1.5px solid #ddd' : undefined }}
                          onClick={() => setSelColor(i)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size */}
                <div className="pd-row align-items-start">
                  <span className="pd-label">Size</span>
                  <div>
                    <div className="pd-sizes">
                      {product.sizes?.map(s => (
                        <button
                          key={s}
                          className={`pd-size-btn ${selSize === s ? 'on' : ''}`}
                          onClick={() => { setSelSize(s); setSizeErr(false) }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {sizeErr && (
                      <p style={{ color: 'var(--c-red)', fontSize: '.78rem', marginTop: '.4rem' }}>
                        ⚠ Please select a size first
                      </p>
                    )}
                  </div>
                </div>

                {/* Quantity */}
                <div className="pd-row">
                  <span className="pd-label">Qty</span>
                  <div className="pd-qty">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                    <span className="pd-qty-val">{qty}</span>
                    <button onClick={() => setQty(q => q + 1)}>+</button>
                  </div>
                </div>

                <div className="pd-divider" />

                {/* Description */}
                <p className="pd-desc">{product.desc}</p>

                {/* CTA Buttons */}
                <div className="pd-cta-row">
                  <button className="pd-add-btn" onClick={handleAddToCart}>
                    {added
                      ? <><i className="bi bi-check-lg me-2" />Added to Cart!</>
                      : <><i className="bi bi-bag me-2" />Add to Cart</>
                    }
                  </button>
                  <button
                    className={`pd-wish-text-btn ${wishlisted ? 'on' : ''}`}
                    onClick={() => setWish(!wishlisted)}
                  >
                    <i className={`bi ${wishlisted ? 'bi-heart-fill' : 'bi-heart'} me-2`} />
                    {wishlisted ? 'Wishlisted' : 'Wishlist'}
                  </button>
                </div>

                {/* Trust strip */}
                <div className="pd-trust">
                  {[
                    { icon: 'bi-truck',        text: 'Free shipping over LE 1000' },
                    { icon: 'bi-arrow-repeat', text: 'Easy 7-day returns'         },
                    { icon: 'bi-shield-check', text: 'Secure payment'             },
                  ].map(t => (
                    <div key={t.text} className="pd-trust-item">
                      <i className={`bi ${t.icon}`} />
                      <span>{t.text}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="pd-related sp">
          <div className="container">
            <h2 className="sec-title">More from {product.brand}</h2>
            <div className="sec-line" />
            <div className="row g-3">
              {related.map(p => (
                <div className="col-6 col-md-3" key={p.id}>
                  <div
                    className="prod-card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/product/${p.id}`, { state: { product: p } })}
                  >
                    <div className="ib">
                      <img src={p.img} alt={p.name} loading="lazy" />
                    </div>
                    <div className="prod-info">
                      <div className="prod-name">{p.name}</div>
                      <div className="prod-price">LE {p.price.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
