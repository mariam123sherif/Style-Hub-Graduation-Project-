import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import MenPage from "./Pages/MenPage.jsx";
import BlackClosetPage from "./Pages/BlackClosetPage.jsx";
import SignInPage from "./Pages/SignInPage.jsx";
import ProductDetailsPage from "./Pages/ProductDetailsPage.jsx";
import BuildOutfitPage from "./Pages/BuildOutfitPage.jsx";
import SellerAuthPage from "./Pages/SellerAuthPage.jsx";
import SellerDashboard from "./Pages/SellerDashboard.jsx";
import VirtualTryOn3D from "./components/VirtualTryOn3D.jsx";

export default function App() {
  const [wishlist, setWishlist] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState("");
  const [sellerLoggedIn, setSellerLoggedIn] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const toggleWish = (id) => {
    setWishlist((prev) => {
      const isIn = prev.includes(id);
      showToast(isIn ? "Removed from wishlist" : "♥  Added to wishlist");
      return isIn ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  const addToCart = () => {
    setCartCount((c) => c + 1);
    showToast("✓  Added to cart");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/brand/black-closet" replace />} />
        <Route
          path="/men"
          element={<MenPage wishlist={wishlist} toggleWish={toggleWish} cartCount={cartCount} addToCart={addToCart} toast={toast} />}
        />
        <Route
          path="/brand/black-closet"
          element={<BlackClosetPage wishlist={wishlist} toggleWish={toggleWish} cartCount={cartCount} addToCart={addToCart} toast={toast} />}
        />
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="/product/:id"
          element={<ProductDetailsPage wishlist={wishlist} toggleWish={toggleWish} cartCount={cartCount} addToCart={addToCart} toast={toast} />}
        />
        <Route
          path="/build-outfit"
          element={<BuildOutfitPage wishlist={wishlist} toggleWish={toggleWish} cartCount={cartCount} addToCart={addToCart} toast={toast} />}
        />

        {/* ── Seller Routes ── */}
        <Route
          path="/seller"
          element={
            sellerLoggedIn
              ? <Navigate to="/seller/dashboard" replace />
              : <SellerAuthPage onSellerLoggedIn={() => setSellerLoggedIn(true)} />
          }
        />
        <Route
          path="/seller/dashboard"
          element={
            sellerLoggedIn
              ? <SellerDashboard onLogout={() => setSellerLoggedIn(false)} />
              : <Navigate to="/seller" replace />
          }
        />

        {/* ── Virtual Try-On Route ── */}
        <Route
          path="/try-on"
          element={
            <div style={{
              width: "100vw",
              height: "100vh",
              background: "linear-gradient(135deg, #f0ece5 0%, #e8e4dc 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px"
            }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2rem",
                color: "#1a1a18",
                letterSpacing: "0.1em",
                marginBottom: "8px"
              }}>
                Virtual Try-On
              </h2>
              <p style={{ color: "#8b7355", fontSize: "0.9rem", marginBottom: "16px" }}>
                Drag to rotate the model
              </p>
              <div style={{ width: "340px", height: "520px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
                <VirtualTryOn3D
                  gender="female"
                  autoRotate={false}
                  onModelReady={() => console.log("3D Model Ready")}
                />
              </div>
              <a href="/" style={{
                marginTop: "16px",
                color: "#728060",
                fontSize: "0.85rem",
                textDecoration: "none",
                letterSpacing: "0.05em"
              }}>
                ← Back to Shop
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}