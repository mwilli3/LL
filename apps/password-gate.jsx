import { useState } from "react";

/**
 * PasswordGate — single shared-password gate for private internal tools.
 * Compares against VITE_JOURNAL_PASSWORD (build-time env). If the env var
 * is unset, the gate denies access — private tools should fail closed.
 *
 * On success, persists a flag in localStorage so the gate doesn't reappear
 * on the same device until the user clears storage.
 */

const STORAGE_KEY = (slot) => `larice_unlocked_${slot}`;
const EXPECTED = import.meta.env.VITE_JOURNAL_PASSWORD;

export function isUnlocked(slot) {
  try { return !!localStorage.getItem(STORAGE_KEY(slot)); } catch { return false; }
}

export default function PasswordGate({ slot, accent = "#A47C63", title, subtitle, onUnlock }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  function submit(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    if (!EXPECTED) {
      setErr("Access not configured. Set VITE_JOURNAL_PASSWORD in Netlify.");
      setBusy(false);
      return;
    }
    if (pw === EXPECTED) {
      try { localStorage.setItem(STORAGE_KEY(slot), "1"); } catch {}
      onUnlock?.();
      return;
    }
    setErr("Incorrect.");
    setBusy(false);
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#F7F5F2", color: "#2B2B2B",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <form onSubmit={submit} style={{
        width: "100%", maxWidth: 420, background: "#FFFFFF",
        border: "1px solid #EAE3DC", borderRadius: 14, padding: "32px 28px",
        boxShadow: "0 1px 2px rgba(0,0,0,.04)",
      }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, lineHeight: 1.15, marginBottom: 6 }}>
          {title || "Larice Command Center"}
        </div>
        <div style={{ color: "#6B5B52", fontSize: 14, marginBottom: 22 }}>
          {subtitle || "Private. Enter the access phrase to continue."}
        </div>
        <input
          type="password"
          autoFocus
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Access phrase"
          style={{
            width: "100%", padding: "12px 14px", fontSize: 15,
            border: "1px solid #CBB8A9", borderRadius: 10, outline: "none",
            background: "#FAF6F2", color: "#2B2B2B", boxSizing: "border-box",
          }}
        />
        {err && <div style={{ color: "#a85a4a", fontSize: 13, marginTop: 10 }}>{err}</div>}
        <button
          type="submit"
          disabled={busy || !pw}
          style={{
            marginTop: 18, width: "100%", padding: "12px 16px", fontSize: 15,
            background: accent, color: "#FFFFFF", border: 0, borderRadius: 10,
            fontWeight: 500, letterSpacing: ".01em", cursor: busy ? "default" : "pointer",
            opacity: busy || !pw ? 0.6 : 1,
          }}
        >
          {busy ? "…" : "Unlock"}
        </button>
      </form>
    </div>
  );
}
