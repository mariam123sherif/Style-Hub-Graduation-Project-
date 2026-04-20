import { useState, useEffect, useRef } from "react";
import { SHFooter, SHARED_CSS } from "./shared";

/* ─────────────────────────────────────────
   GLOBAL STYLES  (injected once into <head>)
───────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --green:       #7b8b5b;
  --green-dark:  #5e6d41;
  --green-light: #e3e8d9;
  --green-mid:   #d4dcbe;
  --footer-bg:   #92a079;
  --white:       #ffffff;
  --gray-text:   #888;
  --border:      #e0e0e0;
  --shadow:      0 20px 50px rgba(0,0,0,0.09);
  --radius-card: 22px;
  --font:        'Jost', sans-serif;
}

body { font-family: var(--font); background: #f5f7f0; }

/* ── NAVBAR ── */
.sh-nav {
  position: fixed; top:0; left:0; right:0; z-index:1000;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  height: 68px;
  display: flex; align-items: center;
  padding: 0 2.5rem;
  gap: 1rem;
  justify-content: space-between;
}
.sh-nav-logo {
  display:flex; align-items:center; gap:10px; text-decoration:none;
  font-weight:800; font-size:1.3rem; color: var(--green-dark); letter-spacing:.5px;
}
.sh-nav-logo .logo-dot { color: var(--green); }
.sh-nav-links { display:flex; align-items:center; gap:2px; }
.sh-nav-links a {
  font-size:.8rem; font-weight:500; color:#444;
  padding:.45rem .7rem; border-radius:6px;
  text-decoration:none; white-space:nowrap;
  transition: color .2s, background .2s;
}
.sh-nav-links a:hover { color: var(--green); background: var(--green-light); }
.badge-sale { background:#e74c3c; color:#fff; font-size:.55rem; font-weight:700; padding:1px 5px; border-radius:3px; margin-left:3px; vertical-align:middle; }
.badge-hot  { background:#f39c12; color:#fff; font-size:.55rem; font-weight:700; padding:1px 5px; border-radius:3px; margin-left:3px; vertical-align:middle; }
.sh-nav-right { display:flex; align-items:center; gap:1rem; }
.sh-nav-search {
  border:1.5px solid var(--border); border-radius:22px;
  padding:.38rem 1rem; font-size:.8rem; font-family:var(--font);
  outline:none; width:190px; transition:border-color .2s;
}
.sh-nav-search:focus { border-color: var(--green); }
.sh-nav-icons { display:flex; gap:1.1rem; }
.sh-nav-icons a { color:#444; font-size:1rem; text-decoration:none; transition:color .2s; }
.sh-nav-icons a:hover { color: var(--green); }

/* ── PAGE WRAPPER ── */
.sh-page { min-height:100vh; padding-top:68px; display:flex; flex-direction:column; }

/* ── AUTH SECTION ── */
.auth-section {
  flex:1; display:flex; align-items:center; justify-content:center;
  gap:72px; padding:3rem 5rem;
}

/* ── CARD ── */
.auth-card {
  width:460px; flex-shrink:0;
  background:#fff; border-radius:var(--radius-card);
  padding:2.8rem 2.6rem;
  box-shadow: var(--shadow);
  position:relative; overflow:hidden;
}
.auth-card::before {
  content:''; position:absolute; top:-60px; right:-60px;
  width:180px; height:180px; border-radius:50%;
  background: var(--green-light); opacity:.5; pointer-events:none;
}

/* Tab toggle */
.card-tabs {
  display:flex; background: var(--green-light);
  border-radius:12px; padding:4px; margin-bottom:1.8rem;
}
.card-tab {
  flex:1; border:none; background:transparent; cursor:pointer;
  font-family:var(--font); font-size:.82rem; font-weight:600;
  letter-spacing:.5px; padding:.55rem; border-radius:9px;
  color: var(--green-dark); transition:all .22s;
}
.card-tab.active {
  background:#fff; color: var(--green-dark);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card-title {
  font-size:1.75rem; font-weight:800; color:#222; margin-bottom:1.5rem;
  line-height:1.2;
}
.card-title span { color: var(--green); }

/* Inputs */
.sh-label {
  display:block; font-size:.78rem; font-weight:700;
  color:#555; margin-bottom:.45rem; letter-spacing:.3px;
}
.sh-input {
  width:100%; padding:11px 16px;
  background: var(--green-light); border:2px solid transparent;
  border-radius:11px; font-family:var(--font); font-size:.9rem;
  color:#333; outline:none; transition:all .2s;
  margin-bottom:1rem;
}
.sh-input:focus { border-color: var(--green); background: var(--green-mid); }
.sh-input.error  { border-color:#e74c3c; background:#fdf0ee; }
.sh-input-wrap   { position:relative; }
.sh-input-wrap .sh-input { margin-bottom:0; }
.sh-eye {
  position:absolute; right:14px; top:50%; transform:translateY(-50%);
  background:none; border:none; cursor:pointer; color:#888; font-size:.9rem; padding:4px;
}
.sh-mb { margin-bottom:1rem; }

.sh-name-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

/* Forgot / helper links */
.forgot-link {
  text-align:right; font-size:.76rem; color: var(--green);
  cursor:pointer; font-weight:600; background:none; border:none;
  font-family:var(--font); width:100%; margin-top:-.4rem; margin-bottom:.7rem;
  transition:color .2s;
}
.forgot-link:hover { color: var(--green-dark); text-decoration:underline; }

/* Submit */
.sh-btn {
  width:100%; padding:13px;
  background: var(--green); color:#fff; border:none; border-radius:25px;
  font-family:var(--font); font-size:.86rem; font-weight:700; letter-spacing:1px;
  cursor:pointer; transition:all .25s; margin-top:.5rem;
  display:flex; align-items:center; justify-content:center; gap:8px;
}
.sh-btn:hover:not(:disabled) { background: var(--green-dark); transform:translateY(-1px); box-shadow:0 6px 18px rgba(91,109,65,.25); }
.sh-btn:active:not(:disabled){ transform:translateY(0); }
.sh-btn:disabled { opacity:.55; cursor:not-allowed; }

/* Divider */
.sh-divider { display:flex; align-items:center; gap:12px; margin:1.3rem 0; }
.sh-divider hr { flex:1; border:none; border-top:1.5px solid var(--border); }
.sh-divider span { font-size:.76rem; color: var(--gray-text); white-space:nowrap; }

/* Social */
.sh-social { display:flex; gap:10px; }
.sh-social-btn {
  flex:1; padding:10px; border:1.5px solid var(--border); background:#fff;
  border-radius:11px; font-family:var(--font); font-size:.8rem; font-weight:600;
  cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
  transition:all .2s; color:#333;
}
.sh-social-btn:hover { border-color: var(--green); background: var(--green-light); }

/* Switch text */
.sh-switch { text-align:center; margin-top:1.4rem; font-size:.83rem; color: var(--gray-text); }
.sh-switch button {
  color: var(--green); font-weight:700; cursor:pointer;
  background:none; border:none; font-family:var(--font); font-size:.83rem;
  text-decoration:underline; margin-left:4px;
}
.sh-switch button:hover { color: var(--green-dark); }

/* Alerts */
.sh-alert {
  border-radius:10px; padding:10px 14px; font-size:.83rem;
  margin-bottom:1rem; font-weight:500;
}
.sh-alert-success { background:#edf7ee; color:#2d7a35; border:1px solid #b8e6bc; }
.sh-alert-error   { background:#fdf0ee; color:#c0392b; border:1px solid #f5c6c2; }

/* Error text */
.sh-err { font-size:.73rem; color:#c0392b; margin-top:-.6rem; margin-bottom:.8rem; }

/* Password strength */
.str-bar { height:4px; border-radius:2px; background:var(--border); margin-top:.45rem; overflow:hidden; }
.str-fill { height:100%; border-radius:2px; transition:width .3s, background .3s; }
.str-lbl  { font-size:.7rem; margin-top:4px; font-weight:600; letter-spacing:.4px; }

/* ── Forgot wizard ── */
.back-btn {
  display:flex; align-items:center; gap:7px; background:none; border:none;
  cursor:pointer; font-family:var(--font); font-size:.8rem; color: var(--gray-text);
  padding:0; margin-bottom:1.5rem; transition:color .2s;
}
.back-btn:hover { color: var(--green); }
.back-btn i { transition:transform .2s; font-size:.8rem; }
.back-btn:hover i { transform:translateX(-3px); }

.wizard-steps { display:flex; gap:6px; margin-bottom:1.6rem; }
.wizard-step  { height:4px; border-radius:2px; flex:1; transition:all .4s; }

.otp-row { display:flex; gap:10px; justify-content:center; margin:1.3rem 0; }
.otp-cell {
  width:52px; height:58px; text-align:center;
  font-family:var(--font); font-size:1.5rem; font-weight:700; color:#333;
  background: var(--green-light); border:2px solid transparent;
  border-radius:11px; outline:none; transition:all .15s;
  caret-color: var(--green);
}
.otp-cell:focus  { border-color: var(--green); background: var(--green-mid); }
.otp-cell.filled { border-color: var(--green); background: var(--green-mid); }

.resend-row { display:flex; justify-content:space-between; align-items:center; margin-top:.5rem; }
.resend-row span { font-size:.76rem; color: var(--gray-text); }
.resend-btn {
  background:none; border:none; cursor:pointer; font-family:var(--font);
  font-size:.76rem; color: var(--green); font-weight:600; padding:0; transition:color .2s;
}
.resend-btn:disabled { color: var(--gray-text); cursor:not-allowed; }
.resend-btn:not(:disabled):hover { color: var(--green-dark); text-decoration:underline; }

.notice-card {
  background: var(--green-light); border-radius:14px;
  padding:1.4rem; text-align:center; margin-bottom:1.4rem;
}
.notice-icon {
  width:50px; height:50px; border-radius:50%;
  background:#fff; border:2px solid var(--green-mid);
  display:flex; align-items:center; justify-content:center;
  margin:0 auto 1rem; font-size:1.3rem; color: var(--green);
}
.notice-card h3 { font-size:1.1rem; font-weight:700; color:#333; margin-bottom:.4rem; }
.notice-card p  { font-size:.81rem; color: var(--gray-text); line-height:1.6; }
.notice-card p strong { color: var(--green-dark); font-weight:600; }

.done-card {
  background:#edf7ee; border:1.5px solid #b8e6bc; border-radius:14px;
  padding:1.6rem; text-align:center; margin-bottom:1.4rem;
}
.done-icon {
  width:52px; height:52px; border-radius:50%;
  background:#d0eedc; border:2px solid #7bc89a;
  display:flex; align-items:center; justify-content:center;
  margin:0 auto 1rem; font-size:1.3rem; color:#2d7a35;
}
.done-card h3 { font-size:1.1rem; font-weight:700; color:#2d7a35; margin-bottom:.4rem; }
.done-card p  { font-size:.81rem; color:#4a8c57; line-height:1.6; }

/* ── RIGHT ILLUSTRATION ── */
.auth-image { display:flex; align-items:center; justify-content:center; }
.image-box {
  width:460px; height:520px; background:#fff; border-radius:36px;
  overflow:hidden; display:flex; align-items:center; justify-content:center;
  box-shadow: var(--shadow);
}

/* ── FOOTER ── */
.sh-footer { background: var(--footer-bg); color:rgba(255,255,255,.85); padding:3rem 0 0; margin-top:auto; }
.sh-f-inner { max-width:1200px; margin:0 auto; padding:0 2.5rem; }
.sh-f-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr 1.3fr; gap:3rem; }
.sh-f-logo { display:flex; align-items:center; gap:10px; font-weight:800; font-size:1.2rem; color:#fff; margin-bottom:1rem; }
.sh-f-logo .logo-dot { opacity:.7; }
.sh-f-desc { font-size:.83rem; color:rgba(255,255,255,.7); line-height:1.7; margin-bottom:1.3rem; }
.sh-f-soc { display:flex; gap:1.2rem; }
.sh-f-soc a { color:rgba(255,255,255,.75); font-size:1.1rem; text-decoration:none; transition:color .2s; }
.sh-f-soc a:hover { color:#fff; }
.sh-f-head { font-size:.72rem; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:#fff; margin-bottom:.9rem; }
.sh-f-list { list-style:none; }
.sh-f-list li { margin-bottom:.45rem; }
.sh-f-list a { font-size:.81rem; color:rgba(255,255,255,.65); text-decoration:none; transition:color .2s; }
.sh-f-list a:hover { color:#fff; }
.sh-f-contact { list-style:none; }
.sh-f-contact li { font-size:.81rem; color:rgba(255,255,255,.65); margin-bottom:.5rem; display:flex; align-items:center; gap:8px; }
.sh-f-contact i { opacity:.7; width:14px; }
.sh-f-bar {
  border-top:1px solid rgba(255,255,255,.15); margin-top:2.5rem;
  padding:1.2rem 0; text-align:center;
  font-size:.73rem; color:rgba(255,255,255,.45);
}

/* ── ANIMATIONS ── */
.fade-up { animation: fadeUp .32s ease; }
@keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }

@media(max-width:1024px) {
  .auth-section { gap:40px; padding:2.5rem 2rem; }
  .auth-image { display:none; }
  .sh-nav-links { display:none; }
  .sh-f-grid { grid-template-columns:1fr 1fr; }
}
@media(max-width:600px) {
  .auth-card { padding:2rem 1.5rem; }
  .sh-nav-search { display:none; }
}
`;

/* ═══════════════════════════════
   SVG ILLUSTRATION (right side)
═══════════════════════════════ */
function Illustration({ mode }) {
  return (
    <svg
      viewBox="0 0 400 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "90%", height: "90%" }}
    >
      {/* background blobs */}
      <circle cx="200" cy="200" r="180" fill="#e3e8d9" />
      <circle cx="320" cy="80" r="60" fill="#d4dcbe" />
      <circle cx="60" cy="360" r="80" fill="#d4dcbe" opacity=".6" />

      {/* clothing rack */}
      <rect x="60" y="130" width="280" height="5" rx="2.5" fill="#7b8b5b" />
      <rect x="195" y="70" width="10" height="65" rx="5" fill="#7b8b5b" />
      <path
        d="M195 70 Q200 55 210 65"
        stroke="#7b8b5b"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* hanger 1 — dress */}
      <rect x="100" y="130" width="5" height="30" rx="2" fill="#92a079" />
      <path
        d="M88 160 Q102.5 145 117 160 L120 230 Q102.5 245 85 230 Z"
        fill="#7b8b5b"
      />
      <path d="M88 195 L120 195" stroke="#fff" strokeWidth="2" opacity=".5" />

      {/* hanger 2 — shirt */}
      <rect x="185" y="130" width="5" height="28" rx="2" fill="#92a079" />
      <path
        d="M170 158 L187.5 145 L205 158 L210 240 L170 240 Z"
        fill="#5e6d41"
      />
      <rect
        x="175"
        y="175"
        width="25"
        height="3"
        rx="1.5"
        fill="#fff"
        opacity=".3"
      />
      <rect
        x="175"
        y="185"
        width="25"
        height="3"
        rx="1.5"
        fill="#fff"
        opacity=".3"
      />

      {/* hanger 3 — pants */}
      <rect x="268" y="130" width="5" height="28" rx="2" fill="#92a079" />
      <path
        d="M255 158 L270.5 145 L286 158 L290 200 L280 200 L275 240 L266 240 L261 200 L251 200 Z"
        fill="#92a079"
      />

      {/* Shopping bag */}
      <rect x="155" y="310" width="90" height="80" rx="10" fill="#7b8b5b" />
      <path
        d="M175 310 Q175 290 200 290 Q225 290 225 310"
        stroke="#5e6d41"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <rect
        x="172"
        y="338"
        width="56"
        height="3"
        rx="1.5"
        fill="#fff"
        opacity=".4"
      />
      <text
        x="200"
        y="370"
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill="#fff"
        opacity=".8"
        fontFamily="Jost,sans-serif"
      >
        {mode === "signup" ? "JOIN US" : "STYLE HUB"}
      </text>

      {/* Stars */}
      {[
        [50, 100],
        [340, 150],
        [70, 280],
        [350, 320],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#7b8b5b" opacity=".4" />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════
   HELPERS
═══════════════════════════════ */
function pwStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const STR_META = [
  { lbl: "", clr: "transparent", pct: 0 },
  { lbl: "Weak", clr: "#e74c3c", pct: 25 },
  { lbl: "Fair", clr: "#e09030", pct: 55 },
  { lbl: "Good", clr: "#7b8b5b", pct: 78 },
  { lbl: "Strong", clr: "#2d7a35", pct: 100 },
];

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/* ═══════════════════════════════
   SIGN IN FORM
═══════════════════════════════ */
function SignInForm({ onForgot, onSwitchSignUp }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setErr("");
    if (!email) {
      setErr("Please enter your email.");
      return;
    }
    if (!isEmail(email)) {
      setErr("Please enter a valid email.");
      return;
    }
    if (!pw) {
      setErr("Please enter your password.");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setOk(true);
    }, 1300);
  };

  return (
    <form onSubmit={submit} className="fade-up">
      {ok && (
        <div className="sh-alert sh-alert-success">
          <i className="fas fa-check-circle me-2" />
          Signed in successfully!
        </div>
      )}
      {err && (
        <div className="sh-alert sh-alert-error">
          <i className="fas fa-exclamation-circle me-2" />
          {err}
        </div>
      )}

      <label className="sh-label">Email address</label>
      <input
        className={`sh-input${err && !email ? " error" : ""}`}
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErr("");
        }}
      />

      <label className="sh-label">Password</label>
      <div className="sh-input-wrap sh-mb">
        <input
          className="sh-input"
          type={show ? "text" : "password"}
          style={{ paddingRight: 46 }}
          placeholder="••••••••"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setErr("");
          }}
        />
        <button type="button" className="sh-eye" onClick={() => setShow(!show)}>
          <i className={`far ${show ? "fa-eye-slash" : "fa-eye"}`} />
        </button>
      </div>

      <button
        type="button"
        className="forgot-link"
        onClick={onForgot}
        style={{ textAlign: "right" }}
      >
        Forgot password?
      </button>

      <button className="sh-btn" type="submit" disabled={busy}>
        {busy ? (
          <>
            <i className="fas fa-circle-notch fa-spin" />
            Signing in…
          </>
        ) : (
          "SIGN IN"
        )}
      </button>

      <div className="sh-divider">
        <hr />
        <span>or continue with</span>
        <hr />
      </div>

      <div className="sh-social">
        <button type="button" className="sh-social-btn">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>
        <button type="button" className="sh-social-btn">
          <i className="fab fa-facebook-f" style={{ color: "#1877f2" }} />
          Facebook
        </button>
      </div>

      <p className="sh-switch">
        I don't have an account?
        <button type="button" onClick={onSwitchSignUp}>
          Sign up
        </button>
      </p>
    </form>
  );
}

/* ═══════════════════════════════
   SIGN UP FORM
═══════════════════════════════ */
function SignUpForm({ onSwitchSignIn }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const str = pwStrength(pw);
  const meta = STR_META[str];

  const submit = (e) => {
    e.preventDefault();
    setErr("");
    if (!first) {
      setErr("Please enter your first name.");
      return;
    }
    if (!last) {
      setErr("Please enter your last name.");
      return;
    }
    if (!isEmail(email)) {
      setErr("Please enter a valid email.");
      return;
    }
    if (pw.length < 8) {
      setErr("Password must be at least 8 characters.");
      return;
    }
    if (pw !== cpw) {
      setErr("Passwords don't match.");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setOk(true);
    }, 1400);
  };

  return (
    <form onSubmit={submit} className="fade-up">
      {ok && (
        <div className="sh-alert sh-alert-success">
          <i className="fas fa-check-circle me-2" />
          Account created! Welcome to StyleHub 🎉
        </div>
      )}
      {err && (
        <div className="sh-alert sh-alert-error">
          <i className="fas fa-exclamation-circle me-2" />
          {err}
        </div>
      )}

      <div className="sh-name-row">
        <div>
          <label className="sh-label">First name</label>
          <input
            className="sh-input"
            type="text"
            placeholder="Jane"
            value={first}
            onChange={(e) => setFirst(e.target.value)}
          />
        </div>
        <div>
          <label className="sh-label">Last name</label>
          <input
            className="sh-input"
            type="text"
            placeholder="Doe"
            value={last}
            onChange={(e) => setLast(e.target.value)}
          />
        </div>
      </div>

      <label className="sh-label">Email address</label>
      <input
        className="sh-input"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="sh-label">Password</label>
      <div className="sh-input-wrap sh-mb">
        <input
          className="sh-input"
          type={show ? "text" : "password"}
          style={{ paddingRight: 46 }}
          placeholder="Min 8 characters"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setErr("");
          }}
        />
        <button type="button" className="sh-eye" onClick={() => setShow(!show)}>
          <i className={`far ${show ? "fa-eye-slash" : "fa-eye"}`} />
        </button>
      </div>
      {pw && (
        <div style={{ marginTop: "-.6rem", marginBottom: "1rem" }}>
          <div className="str-bar">
            <div
              className="str-fill"
              style={{ width: meta.pct + "%", background: meta.clr }}
            />
          </div>
          <p className="str-lbl" style={{ color: meta.clr }}>
            {meta.lbl}
          </p>
        </div>
      )}

      <label className="sh-label">Confirm password</label>
      <input
        className={`sh-input${cpw && cpw !== pw ? " error" : ""}`}
        type="password"
        placeholder="Re-enter password"
        value={cpw}
        onChange={(e) => {
          setCpw(e.target.value);
          setErr("");
        }}
      />

      <button className="sh-btn" type="submit" disabled={busy}>
        {busy ? (
          <>
            <i className="fas fa-circle-notch fa-spin" />
            Creating account…
          </>
        ) : (
          "CREATE ACCOUNT"
        )}
      </button>

      <div className="sh-divider">
        <hr />
        <span>or continue with</span>
        <hr />
      </div>

      <div className="sh-social">
        <button type="button" className="sh-social-btn">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>
        <button type="button" className="sh-social-btn">
          <i className="fab fa-facebook-f" style={{ color: "#1877f2" }} />
          Facebook
        </button>
      </div>

      <p className="sh-switch">
        Already have an account?
        <button type="button" onClick={onSwitchSignIn}>
          Sign in
        </button>
      </p>
      <p
        style={{
          textAlign: "center",
          fontSize: ".72rem",
          color: "#aaa",
          marginTop: ".8rem",
        }}
      >
        By signing up you agree to our{" "}
        <span style={{ color: "var(--green)", cursor: "pointer" }}>Terms</span>{" "}
        &amp;{" "}
        <span style={{ color: "var(--green)", cursor: "pointer" }}>
          Privacy Policy
        </span>
        .
      </p>
    </form>
  );
}

/* ═══════════════════════════════
   FORGOT — STEP 1: Email
═══════════════════════════════ */
function ForgotEmail({ onNext }) {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = () => {
    if (!isEmail(email)) {
      setErr("Please enter a valid email.");
      return;
    }
    setErr("");
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      onNext(email);
    }, 1300);
  };

  return (
    <div className="fade-up">
      <label className="sh-label">Your email address</label>
      <input
        className={`sh-input${err ? " error" : ""}`}
        type="email"
        value={email}
        placeholder="you@example.com"
        onChange={(e) => {
          setEmail(e.target.value);
          setErr("");
        }}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      {err && <p className="sh-err">{err}</p>}
      <p
        style={{
          fontSize: ".77rem",
          color: "var(--gray-text)",
          marginBottom: "1.2rem",
          lineHeight: 1.55,
        }}
      >
        We'll send a{" "}
        <strong style={{ color: "var(--green)" }}>6-digit code</strong> to this
        address. It expires in 10 minutes.
      </p>
      <button className="sh-btn" onClick={submit} disabled={busy} type="button">
        {busy ? (
          <>
            <i className="fas fa-circle-notch fa-spin" />
            Sending code…
          </>
        ) : (
          "SEND RESET CODE"
        )}
      </button>
    </div>
  );
}

/* ═══════════════════════════════
   FORGOT — STEP 2: OTP
═══════════════════════════════ */
function ForgotOTP({ email, onNext }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [cd, setCd] = useState(59);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCd((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const set = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const n = [...digits];
    n[i] = v;
    setDigits(n);
    setErr("");
    if (v && i < 5) document.getElementById(`sh-otp-${i + 1}`)?.focus();
  };
  const bk = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0)
      document.getElementById(`sh-otp-${i - 1}`)?.focus();
  };
  const paste = (e) => {
    const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (t.length === 6) {
      setDigits(t.split(""));
      document.getElementById("sh-otp-5")?.focus();
    }
    e.preventDefault();
  };

  const verify = () => {
    if (digits.join("").length < 6) {
      setErr("Enter the full 6-digit code.");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      onNext();
    }, 1100);
  };

  const resend = () => {
    setCd(59);
    setResent(true);
    setDigits(["", "", "", "", "", ""]);
    setTimeout(() => setResent(false), 2500);
  };

  return (
    <div className="fade-up">
      <div className="notice-card">
        <div className="notice-icon">
          <i className="fas fa-envelope" />
        </div>
        <h3>Check your inbox</h3>
        <p>
          A 6-digit code was sent to <strong>{email}</strong>
        </p>
      </div>

      <p className="sh-label" style={{ marginBottom: ".5rem" }}>
        Enter verification code
      </p>
      <div className="otp-row" onPaste={paste}>
        {digits.map((d, i) => (
          <input
            key={i}
            id={`sh-otp-${i}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            className={`otp-cell${d ? " filled" : ""}`}
            onChange={(e) => set(i, e.target.value)}
            onKeyDown={(e) => bk(i, e)}
          />
        ))}
      </div>
      {err && (
        <p className="sh-err" style={{ textAlign: "center" }}>
          {err}
        </p>
      )}

      <div className="resend-row">
        <span>
          {cd > 0 ? `Resend in 0:${String(cd).padStart(2, "0")}` : "\u00a0"}
        </span>
        <button
          className="resend-btn"
          disabled={cd > 0}
          type="button"
          onClick={resend}
        >
          {resent ? "Code sent ✓" : "Resend code"}
        </button>
      </div>

      <button
        className="sh-btn"
        type="button"
        onClick={verify}
        disabled={busy || digits.join("").length < 6}
        style={{ marginTop: "1rem" }}
      >
        {busy ? (
          <>
            <i className="fas fa-circle-notch fa-spin" />
            Verifying…
          </>
        ) : (
          "VERIFY CODE"
        )}
      </button>
    </div>
  );
}

/* ═══════════════════════════════
   FORGOT — STEP 3: New password
═══════════════════════════════ */
function ForgotNewPw({ onDone }) {
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const str = pwStrength(pw);
  const meta = STR_META[str];

  const submit = () => {
    if (pw.length < 8) {
      setErr("Password must be at least 8 characters.");
      return;
    }
    if (pw !== cpw) {
      setErr("Passwords don't match.");
      return;
    }
    setErr("");
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      onDone();
    }, 1200);
  };

  return (
    <div className="fade-up">
      <label className="sh-label">New password</label>
      <div className="sh-input-wrap sh-mb">
        <input
          className="sh-input"
          type={show ? "text" : "password"}
          style={{ paddingRight: 46 }}
          placeholder="Min 8 characters"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setErr("");
          }}
        />
        <button type="button" className="sh-eye" onClick={() => setShow(!show)}>
          <i className={`far ${show ? "fa-eye-slash" : "fa-eye"}`} />
        </button>
      </div>
      {pw && (
        <div style={{ marginTop: "-.6rem", marginBottom: "1rem" }}>
          <div className="str-bar">
            <div
              className="str-fill"
              style={{ width: meta.pct + "%", background: meta.clr }}
            />
          </div>
          <p className="str-lbl" style={{ color: meta.clr }}>
            {meta.lbl}
          </p>
        </div>
      )}

      <label className="sh-label">Confirm new password</label>
      <input
        className={`sh-input${cpw && cpw !== pw ? " error" : ""}`}
        type="password"
        placeholder="Re-enter password"
        value={cpw}
        onChange={(e) => {
          setCpw(e.target.value);
          setErr("");
        }}
      />
      {err && <p className="sh-err">{err}</p>}

      <button
        className="sh-btn"
        type="button"
        onClick={submit}
        disabled={busy || !pw || !cpw}
      >
        {busy ? (
          <>
            <i className="fas fa-circle-notch fa-spin" />
            Updating…
          </>
        ) : (
          "SET NEW PASSWORD"
        )}
      </button>
    </div>
  );
}

/* ═══════════════════════════════
   FORGOT — STEP 4: Done
═══════════════════════════════ */
function ForgotDone({ onLogin }) {
  return (
    <div className="fade-up" style={{ textAlign: "center" }}>
      <div className="done-card">
        <div className="done-icon">
          <i className="fas fa-check" />
        </div>
        <h3>Password updated!</h3>
        <p>
          Your password has been reset successfully. You can now sign in with
          your new credentials.
        </p>
      </div>
      <button className="sh-btn" type="button" onClick={onLogin}>
        BACK TO SIGN IN
      </button>
    </div>
  );
}

/* ═══════════════════════════════
   FORGOT WIZARD SHELL
═══════════════════════════════ */
const WIZARD_HEADERS = [
  {
    eyebrow: "Step 1 of 3",
    title: "Forgot Password",
    sub: "Enter your registered email address.",
  },
  { eyebrow: "Step 2 of 3", title: "Verify Identity", sub: null },
  {
    eyebrow: "Step 3 of 3",
    title: "New Password",
    sub: "Choose a strong new password.",
  },
  { eyebrow: "", title: "All Done! 🎉", sub: null },
];

function ForgotWizard({ onBack }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const h = WIZARD_HEADERS[step - 1];

  return (
    <div className="fade-up">
      {/* back */}
      <button
        type="button"
        className="back-btn"
        onClick={
          step === 1 || step === 4 ? onBack : () => setStep((s) => s - 1)
        }
      >
        <i className="fas fa-arrow-left" />
        {step === 1 || step === 4 ? "Back to Sign In" : "Go Back"}
      </button>

      {/* header */}
      <p
        style={{
          fontSize: ".72rem",
          fontWeight: 700,
          color: "var(--green)",
          letterSpacing: ".8px",
          textTransform: "uppercase",
          marginBottom: ".4rem",
        }}
      >
        {h.eyebrow}
      </p>
      <h2
        className="card-title"
        key={step}
        style={{ marginBottom: h.sub ? ".4rem" : "1.4rem" }}
      >
        {h.title.includes("🎉") ? (
          <>
            {h.title.replace(" 🎉", "")}&nbsp;<span>🎉</span>
          </>
        ) : (
          <>
            {h.title.split(" ").map((w, i) =>
              i === h.title.split(" ").length - 1 ? (
                <span key={i} style={{ color: "var(--green)" }}>
                  {w}
                </span>
              ) : (
                <span key={i}>{w} </span>
              ),
            )}
          </>
        )}
      </h2>
      {h.sub && (
        <p
          style={{
            fontSize: ".83rem",
            color: "var(--gray-text)",
            marginBottom: "1.4rem",
            lineHeight: 1.55,
          }}
        >
          {h.sub}
        </p>
      )}

      {/* progress dots */}
      {step < 4 && (
        <div className="wizard-steps">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="wizard-step"
              style={{
                flex: s <= step ? 2 : 1,
                background:
                  s < step
                    ? "#2d7a35"
                    : s === step
                      ? "var(--green)"
                      : "var(--green-light)",
              }}
            />
          ))}
        </div>
      )}

      {step === 1 && (
        <ForgotEmail
          onNext={(e) => {
            setEmail(e);
            setStep(2);
          }}
        />
      )}
      {step === 2 && <ForgotOTP email={email} onNext={() => setStep(3)} />}
      {step === 3 && <ForgotNewPw onDone={() => setStep(4)} />}
      {step === 4 && <ForgotDone onLogin={onBack} />}
    </div>
  );
}

/* ═══════════════════════════════
   NAVBAR
═══════════════════════════════ */
const NAV = [
  { label: "Home" },
  { label: "Women" },
  { label: "Men", badge: { text: "SALE", cls: "badge-sale" } },
  { label: "Kids", badge: { text: "HOT", cls: "badge-hot" } },
  { label: "Customize" },
  { label: "Build Your Outfit" },
  { label: "Brands" },
  { label: "Top deals" },
];

function Navbar() {
  return (
    <nav className="sh-nav">
      <a className="sh-nav-logo" href="#">
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="#7b8b5b" />
          <text
            x="16"
            y="21"
            textAnchor="middle"
            fontSize="14"
            fontWeight="800"
            fill="#fff"
            fontFamily="Jost,sans-serif"
          >
            S
          </text>
        </svg>
        Style<span className="logo-dot">Hub</span>
      </a>
      <div className="sh-nav-links">
        {NAV.map((l) => (
          <a href="#" key={l.label}>
            {l.label}
            {l.badge && <span className={l.badge.cls}>{l.badge.text}</span>}
          </a>
        ))}
      </div>
      <div className="sh-nav-right">
        <input
          className="sh-nav-search"
          type="search"
          placeholder="Search products…"
        />
        <div className="sh-nav-icons">
          <a href="#">
            <i className="fas fa-user" />
          </a>
          <a href="#">
            <i className="far fa-heart" />
          </a>
          <a href="#">
            <i className="fas fa-shopping-bag" />
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════
   ROOT
═══════════════════════════════ */
export default function StyleHubAuth() {
  const [mode, setMode] = useState("signin"); // "signin"|"signup"|"forgot"
  const [key, setKey] = useState(0);
  const go = (m) => {
    setMode(m);
    setKey((k) => k + 1);
  };

  const cardTitle = {
    signin: "Sign In",
    signup: "Create Account",
    forgot: "", // handled inside wizard
  }[mode];

  return (
    <>
      <style>{CSS}</style>
      <style>{SHARED_CSS}</style>
      <div className="sh-page">
        <Navbar />

        <section className="auth-section">
          {/* ── CARD ── */}
          <div className="auth-card">
            {mode !== "forgot" && (
              <>
                {/* tab toggle */}
                <div className="card-tabs">
                  <button
                    className={`card-tab${mode === "signin" ? " active" : ""}`}
                    onClick={() => go("signin")}
                  >
                    Sign In
                  </button>
                  <button
                    className={`card-tab${mode === "signup" ? " active" : ""}`}
                    onClick={() => go("signup")}
                  >
                    Sign Up
                  </button>
                </div>
                <h1 className="card-title" key={mode}>
                  {mode === "signin" ? (
                    <>
                      Sign <span>In</span>
                    </>
                  ) : (
                    <>
                      Create <span>Account</span>
                    </>
                  )}
                </h1>
              </>
            )}

            <div key={key}>
              {mode === "signin" && (
                <SignInForm
                  onForgot={() => go("forgot")}
                  onSwitchSignUp={() => go("signup")}
                />
              )}
              {mode === "signup" && (
                <SignUpForm onSwitchSignIn={() => go("signin")} />
              )}
              {mode === "forgot" && (
                <ForgotWizard onBack={() => go("signin")} />
              )}
            </div>
          </div>

          {/* ── ILLUSTRATION ── */}
          <div className="auth-image">
            <div className="image-box">
              <Illustration mode={mode} />
            </div>
          </div>
        </section>

        <SHFooter />
      </div>
    </>
  );
}