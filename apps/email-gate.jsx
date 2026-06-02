import { useState } from "react";

/**
 * EmailGate — styled hard gate for the free apps.
 * On submit, subscribes the email to the configured Klaviyo list (single
 * opt-in honors the list's setting) with a per-app source tag, persists
 * capture in localStorage, then calls onCaptured() so the app mounts.
 *
 * Klaviyo public company_id comes from VITE_KLAVIYO_PUBLIC_KEY (build-time).
 * If unset, the gate silently grants access (no subscription) so the app is
 * never blocked by a config gap.
 */

const B = {
  bg: "#FAF6F2", tx: "#3A2018", txm: "#6B5B52", txl: "#A69890",
  wh: "#FFFFFF", pri: "#A84A30",
};
const F = "'Outfit', sans-serif";
const H = "'Cormorant Garamond', serif";
const KLAVIYO_PUBLIC_KEY = import.meta.env.VITE_KLAVIYO_PUBLIC_KEY;

const STORAGE_KEY = (source) => `larice_email_${source}`;

export function hasEmail(source) {
  try { return !!localStorage.getItem(STORAGE_KEY(source)); } catch { return false; }
}

async function subscribe({ email, listId, source }) {
  if (!KLAVIYO_PUBLIC_KEY) {
    console.warn("[EmailGate] VITE_KLAVIYO_PUBLIC_KEY not set — granting access without subscribing.");
    return { ok: true, configured: false };
  }
  const url = `https://a.klaviyo.com/client/subscriptions/?company_id=${encodeURIComponent(KLAVIYO_PUBLIC_KEY)}`;
  const body = {
    data: {
      type: "subscription",
      attributes: {
        profile: { data: { type: "profile", attributes: { email, properties: { source_app: source } } } },
        custom_source: source,
      },
      relationships: { list: { data: { type: "list", id: listId } } },
    },
  };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "revision": "2024-10-15" },
      body: JSON.stringify(body),
    });
    // Klaviyo returns 202 Accepted on success; any 2xx counts.
    return { ok: res.ok || res.status === 202, configured: true, status: res.status };
  } catch {
    return { ok: false, configured: true, status: 0 };
  }
}

export default function EmailGate({ listId, source, accent = "#3A2018", title, subtitle, onCaptured }) {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const e = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) { setErr("Please enter a valid email address."); return; }
    setLoading(true); setErr("");
    const result = await subscribe({ email: e, listId, source });
    if (result.ok) {
      try { localStorage.setItem(STORAGE_KEY(source), e); } catch {}
      onCaptured(e);
      return;
    }
    setLoading(false);
    setErr("Something went wrong. Please try again.");
  };

  return (
    <div style={{fontFamily:F,background:B.bg,color:B.tx,minHeight:"100vh",WebkitFontSmoothing:"antialiased"}}>
      <div style={{maxWidth:500,margin:"0 auto",padding:"72px 24px 56px"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <h1 style={{fontFamily:H,fontSize:"clamp(34px,9vw,46px)",fontWeight:600,lineHeight:1,letterSpacing:-.5,marginBottom:14}}>{title}</h1>
          <p style={{fontSize:14,color:B.txm,lineHeight:1.7,maxWidth:360,margin:"0 auto"}}>{subtitle}</p>
        </div>
        <div style={{background:B.wh,padding:"28px 24px",borderRadius:12,border:`1px solid ${accent}20`}}>
          <input type="email" value={email}
            onChange={ev => { setEmail(ev.target.value); setErr(""); }}
            onKeyDown={ev => ev.key === "Enter" && submit()}
            placeholder="you@email.com"
            style={{width:"100%",padding:"14px 0 12px",fontSize:16,fontFamily:F,border:"none",borderBottom:`2px solid ${err?B.pri:B.txl+"50"}`,background:"transparent",color:B.tx,outline:"none",boxSizing:"border-box"}}
            onFocus={ev => { if (!err) ev.target.style.borderBottomColor = accent; }}
            onBlur={ev => { if (!err) ev.target.style.borderBottomColor = B.txl + "50"; }}
          />
          {err && <p style={{fontSize:12,color:B.pri,marginTop:8,fontWeight:500,lineHeight:1.5}}>{err}</p>}
          <button onClick={submit} disabled={loading}
            style={{width:"100%",marginTop:22,padding:"15px 0",fontSize:14,fontWeight:600,fontFamily:F,color:B.wh,background:loading?B.txl:accent,border:"none",borderRadius:8,cursor:loading?"default":"pointer",letterSpacing:1,textTransform:"uppercase",transition:"background .2s"}}>
            {loading ? "Subscribing…" : "Continue"}
          </button>
          <p style={{fontSize:11,color:B.txl,marginTop:14,textAlign:"center",lineHeight:1.5}}>
            Unsubscribe anytime. We never share your email.
          </p>
        </div>
      </div>
    </div>
  );
}
