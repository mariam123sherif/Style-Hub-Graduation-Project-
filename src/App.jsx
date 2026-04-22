import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import MenPage          from "./MenPage.jsx";
import BlackClosetBrand from "./blackcloset.jsx";
import AntikaBrand      from "./antika.jsx";
import SignInPage        from "./SignInPage.jsx";
import ProductDetails    from "./ProductDetail.jsx";
import SellerAuthPage    from "./SellerAuthPage.jsx";
import SellerDashboard   from "./SellerDashboard.jsx";
import WomenPage         from "./women.jsx";
import Kids              from "./kids.jsx";
import SaltyBrand        from "./salty.jsx";
import Wishlist          from "./wishlist.jsx";

export default function App() {
  const [cart, setCart]   = useState([]);
  const [wish, setWish]   = useState([]);
  const [toast, setToast] = useState("");
  const [sellerLoggedIn, setSellerLoggedIn] = useState(false);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2200); };
  const cartCount = cart.reduce((s, x) => s + (x.qty || 1), 0);

  const addToCart = () => {
    setCart((prev) => {
      const g = prev.find((x) => x.id === "__generic__");
      if (g) return prev.map((x) => x.id === "__generic__" ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { id: "__generic__", size: "M", qty: 1 }];
    });
    showToast("\u2713  Added to cart");
  };

  const toggleWish = (id) => {
    setWish((prev) => {
      const isIn = prev.includes(id);
      showToast(isIn ? "Removed from wishlist" : "\u2665  Added to wishlist");
      return isIn ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/brand/black-closet" replace />} />

        <Route path="/women" element={<WomenPage />} />
        <Route path="/men"   element={<MenPage cart={cart} setCart={setCart} wish={wish} setWish={setWish} />} />
        <Route path="/kids"  element={<Kids cart={cart} setCart={setCart} wish={wish} setWish={setWish} />} />

        <Route path="/brand/black-closet" element={<BlackClosetBrand cart={cart} wish={wish} setWish={setWish} />} />
        <Route path="/brand/antika"       element={<AntikaBrand      cart={cart} wish={wish} setWish={setWish} />} />
        <Route path="/brand/salty"        element={<SaltyBrand       cart={cart} wish={wish} setWish={setWish} />} />

        <Route path="/signin"   element={<SignInPage />} />
        <Route path="/wishlist" element={<Wishlist cart={cart} setCart={setCart} wish={wish} setWish={setWish} />} />
        <Route path="/product/:id" element={<ProductDetails wishlist={wish} toggleWish={toggleWish} cartCount={cartCount} addToCart={addToCart} toast={toast} />} />

        <Route path="/seller" element={sellerLoggedIn ? <Navigate to="/seller/dashboard" replace /> : <SellerAuthPage onSellerLoggedIn={() => setSellerLoggedIn(true)} />} />
        <Route path="/seller/dashboard" element={sellerLoggedIn ? <SellerDashboard onLogout={() => setSellerLoggedIn(false)} /> : <Navigate to="/seller" replace />} />
      </Routes>
    </BrowserRouter>
  );
}