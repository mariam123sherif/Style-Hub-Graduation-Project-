import { useNavigate } from "react-router-dom";
import { PRODUCTS, SHNav, SHFooter, SHARED_CSS } from "./shared";

export default function Cart({ cart, setCart, wish, setWish }) {
  const navigate = useNavigate();

  // cart is array of { id, size, color, qty }
  const items = (cart || []).map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    return p ? { ...item, product: p } : null;
  }).filter(Boolean);

  const total = items.reduce((sum, item) => {
    const price = parseInt(item.product.price.replace(/\D/g, ""));
    return sum + price * item.qty;
  }, 0);

  const updateQty = (id, size, delta) => {
    setCart(prev => prev.map(item =>
      item.id === id && item.size === size
        ? { ...item, qty: Math.max(1, item.qty + delta) }
        : item
    ));
  };

  const removeItem = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  return (
    <div style={{minHeight:"100vh",background:"var(--cream)"}}>
      <style>{SHARED_CSS}</style>
      <SHNav cart={cart} wish={wish}/>

      <div style={{maxWidth:1000,margin:"0 auto",padding:"3rem 2rem"}}>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2.2rem",fontWeight:400,marginBottom:".3rem"}}>Your Cart</h1>
        <div style={{width:36,height:2,background:"var(--sage)",marginBottom:"2.5rem"}}/>

        {items.length === 0 ? (
          <div style={{textAlign:"center",padding:"6rem 0"}}>
            <div style={{fontSize:"3rem",marginBottom:"1rem"}}>🛍</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",marginBottom:".8rem"}}>Your Cart is empty</div>
            <p style={{color:"var(--warm)",fontSize:".85rem",marginBottom:"2rem"}}>Add items to get started</p>
            <button onClick={()=>navigate("/")} style={{background:"var(--dark)",color:"#fff",border:"none",padding:".8rem 2.5rem",fontSize:".72rem",letterSpacing:".12em",textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:"3rem",alignItems:"flex-start"}}>

            {/* ITEMS */}
            <div>
              {items.map((item,i) => (
                <div key={`${item.id}-${item.size}`} style={{display:"flex",gap:"1.2rem",padding:"1.5rem 0",borderBottom:"1px solid var(--border)"}}>
                  {/* Image */}
                  <div onClick={()=>navigate(`/product/${item.product.id}`)} style={{width:110,height:140,flexShrink:0,background:"#f0ece6",cursor:"pointer",overflow:"hidden"}}>
                    {item.product.img
                      ? <img src={item.product.img} alt={item.product.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                      : <div style={{width:"100%",height:"100%",background:`linear-gradient(${item.product.gradient})`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",color:"rgba(255,255,255,.2)"}}>{item.product.brand[0]}</span>
                        </div>
                    }
                  </div>

                  {/* Info */}
                  <div style={{flex:1}}>
                    <div style={{fontSize:".58rem",letterSpacing:".15em",textTransform:"uppercase",color:"var(--warm)",marginBottom:".3rem"}}>{item.product.brand}</div>
                    <div onClick={()=>navigate(`/product/${item.product.id}`)} style={{fontSize:".95rem",fontWeight:500,marginBottom:".5rem",cursor:"pointer"}}>{item.product.name}</div>
                    <div style={{fontSize:".75rem",color:"var(--warm)",marginBottom:".8rem"}}>Size: <strong style={{color:"var(--dark)"}}>{item.size}</strong></div>
                    <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
                      {/* Qty */}
                      <div style={{display:"flex",alignItems:"center",border:"1px solid var(--border)"}}>
                        <button onClick={()=>updateQty(item.id,item.size,-1)} style={{width:32,height:32,border:"none",background:"none",cursor:"pointer",fontSize:"1rem"}}>−</button>
                        <span style={{width:32,textAlign:"center",fontSize:".85rem"}}>{item.qty}</span>
                        <button onClick={()=>updateQty(item.id,item.size,+1)} style={{width:32,height:32,border:"none",background:"none",cursor:"pointer",fontSize:"1rem"}}>+</button>
                      </div>
                      <button onClick={()=>removeItem(item.id,item.size)} style={{fontSize:".68rem",letterSpacing:".08em",color:"var(--warm)",background:"none",border:"none",cursor:"pointer",textDecoration:"underline",fontFamily:"'DM Sans',sans-serif"}}>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{textAlign:"right",flexShrink:0}}>
                    {item.product.oldPrice && <div style={{fontSize:".75rem",color:"var(--warm)",textDecoration:"line-through",marginBottom:".2rem"}}>{item.product.oldPrice}</div>}
                    <div style={{fontSize:"1rem",fontWeight:600}}>{item.product.price}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div style={{background:"#fff",padding:"2rem",border:"1px solid var(--border)",position:"sticky",top:"80px"}}>
              <div style={{fontSize:".65rem",letterSpacing:".2em",textTransform:"uppercase",fontWeight:600,marginBottom:"1.5rem"}}>Order Summary</div>

              <div style={{display:"flex",justifyContent:"space-between",fontSize:".82rem",marginBottom:".8rem"}}>
                <span style={{color:"var(--warm)"}}>Subtotal ({items.length} item{items.length!==1?"s":""})</span>
                <span>LE {total.toLocaleString()}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:".82rem",marginBottom:".8rem"}}>
                <span style={{color:"var(--warm)"}}>Shipping</span>
                <span style={{color:"var(--sage)",fontWeight:600}}>80</span>
              </div>

              <div style={{borderTop:"1px solid var(--border)",margin:"1.2rem 0"}}/>

              <div style={{display:"flex",justifyContent:"space-between",fontSize:"1rem",fontWeight:600,marginBottom:"1.5rem"}}>
                <span>Total</span>
                <span>LE {total.toLocaleString()}</span>
              </div>

              <button style={{width:"100%",background:"var(--dark)",color:"#fff",border:"none",padding:".9rem",fontSize:".72rem",letterSpacing:".12em",textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",marginBottom:".8rem",transition:"background .2s"}}
                onMouseEnter={e=>e.target.style.background="var(--deep)"}
                onMouseLeave={e=>e.target.style.background="var(--dark)"}
                onClick={()=>navigate("/checkout")}>
                Checkout
              </button>
              <button onClick={()=>navigate("/")} style={{width:"100%",background:"transparent",color:"var(--dark)",border:"1.5px solid var(--dark)",padding:".9rem",fontSize:".72rem",letterSpacing:".12em",textTransform:"uppercase",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                Continue Shopping
              </button>

              {/* Payment methods */}
              <div style={{display:"flex",gap:".4rem",justifyContent:"center",marginTop:"1.2rem"}}>
                {["VISA","FAWRY","CASH"].map(m=>(
                  <span key={m} style={{background:"rgba(0,0,0,.06)",borderRadius:3,padding:".2rem .5rem",fontSize:".55rem",color:"var(--warm)",fontWeight:600}}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <SHFooter/>
    </div>
  );
}