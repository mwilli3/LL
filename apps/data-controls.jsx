import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * DataControls — "Manage my data" footer + wipe modal.
 *
 * Client-side only. Wipes the listed localStorage keys, keeps the listed
 * keys (purchase access / journal unlock / identity), reloads the page.
 *
 * Props
 *   appLabel:      string — display name shown in the modal title
 *   accent:        string — color used for buttons and the section header
 *   surface:       string — page background, used inside the modal
 *   ink:           string — main body text color
 *   muted:         string — secondary text color
 *   sand:          string — soft border / chip background
 *   keepKeys:      string[] — localStorage keys to preserve (purchase, auth)
 *   wipeKeys:      string[] — localStorage keys to remove (user data)
 *   wipeCategories: { label: string, key: string }[] — human-readable list of
 *                  what gets wiped; "key" is matched against wipeKeys to render
 *                  a small "{n} entries" badge when the data is non-empty
 *   requireTypeToConfirm: boolean — if true, user must type DELETE to enable
 *                  the wipe button. Use for high-value content like the journal.
 *   serif:         string — optional serif font family for the modal title
 *   sans:          string — optional sans font family for the body
 */
export default function DataControls({
  appLabel,
  accent,
  surface = "#FAF6F2",
  ink = "#3A2018",
  muted = "#6B5B52",
  sand = "#EAE3DC",
  keepKeys = [],
  wipeKeys = [],
  wipeCategories = [],
  requireTypeToConfirm = false,
  serif = "'Cormorant Garamond', Georgia, serif",
  sans = "'Outfit', system-ui, sans-serif",
}) {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [wiping, setWiping] = useState(false);
  const canConfirm = requireTypeToConfirm ? confirmText.trim() === "DELETE" : true;

  useEffect(() => {
    if (!open) { setConfirmText(""); return; }
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const sizeOf = (key) => {
    if (typeof window === "undefined") return 0;
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return 0;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.length;
      if (parsed && typeof parsed === "object") return Object.keys(parsed).length;
      return 1;
    } catch { return 0; }
  };

  const wipe = () => {
    if (!canConfirm) return;
    setWiping(true);
    try {
      for (const k of wipeKeys) {
        try { window.localStorage.removeItem(k); } catch {}
      }
    } finally {
      // Reload regardless — user lands on a clean app, keep-keys still in place.
      setTimeout(() => window.location.reload(), 150);
    }
  };

  const linkStyle = {
    background: "none",
    border: "none",
    color: muted,
    fontFamily: sans,
    fontSize: 11.5,
    letterSpacing: ".12em",
    textTransform: "uppercase",
    cursor: "pointer",
    padding: "12px 8px",
    textDecoration: "underline",
    textDecorationThickness: 1,
    textUnderlineOffset: 4,
    opacity: 0.75,
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40, marginBottom: 32 }}>
        <button onClick={() => setOpen(true)} style={linkStyle}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.75"; }}
        >
          Manage my data
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            onClick={() => !wiping && setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`Manage data for ${appLabel}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 200,
              background: "rgba(43,32,24,.55)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 20, fontFamily: sans,
            }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
              style={{
                width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto",
                background: surface, borderRadius: 16,
                padding: "28px 28px 24px",
                boxShadow: "0 4px 20px -8px rgba(74,58,50,.25)",
                color: ink,
              }}
            >
              <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: ".22em",
                textTransform: "uppercase", color: accent, marginBottom: 6 }}>
                {appLabel}
              </div>
              <div style={{ fontFamily: serif, fontSize: 24, fontWeight: 600, lineHeight: 1.2, marginBottom: 12 }}>
                Your data on this device
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.65, color: muted, marginBottom: 18 }}>
                Everything you've tracked in {appLabel.toLowerCase()} lives only in this
                browser. Nothing is sent to our servers except for the AI analysis you
                explicitly request. Wiping is permanent.
              </p>

              {wipeCategories.length > 0 && (
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: ".18em",
                    textTransform: "uppercase", color: muted, marginBottom: 8 }}>
                    What will be deleted
                  </div>
                  <div style={{ display: "grid", gap: 6 }}>
                    {wipeCategories.map((c) => {
                      const n = sizeOf(c.key);
                      return (
                        <div key={c.label} style={{
                          display: "flex", justifyContent: "space-between", alignItems: "baseline",
                          padding: "8px 12px", background: sand, borderRadius: 6, fontSize: 13,
                        }}>
                          <span style={{ color: ink }}>{c.label}</span>
                          <span style={{ color: muted, fontSize: 12 }}>
                            {n > 0 ? `${n} ${n === 1 ? "entry" : "entries"}` : "empty"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {keepKeys.length > 0 && (
                <div style={{ marginBottom: 22, padding: "10px 12px",
                  background: "rgba(255,255,255,.5)", borderRadius: 6,
                  fontSize: 12.5, color: muted, lineHeight: 1.55 }}>
                  <strong style={{ color: ink, fontWeight: 600 }}>Your access stays.</strong>{" "}
                  Purchase verification, email, and unlock state are preserved so you
                  don't have to re-enter anything. To unsubscribe from marketing emails,
                  use the link at the bottom of any email we've sent.
                </div>
              )}

              {requireTypeToConfirm && (
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em",
                    textTransform: "uppercase", color: muted, display: "block", marginBottom: 8 }}>
                    Type <span style={{ color: accent }}>DELETE</span> to confirm
                  </label>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="DELETE"
                    autoFocus
                    style={{
                      width: "100%", padding: "10px 12px", fontSize: 14,
                      fontFamily: sans, color: ink, background: "#fff",
                      border: `1px solid ${sand}`, borderRadius: 6,
                      letterSpacing: ".05em",
                    }}
                  />
                </div>
              )}

              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                <button
                  onClick={() => setOpen(false)}
                  disabled={wiping}
                  style={{
                    padding: "10px 18px", fontSize: 13, fontWeight: 500, fontFamily: sans,
                    color: muted, background: "transparent", border: "none",
                    borderRadius: 6, cursor: wiping ? "default" : "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={wipe}
                  disabled={!canConfirm || wiping}
                  style={{
                    padding: "10px 22px", fontSize: 13, fontWeight: 600, fontFamily: sans,
                    color: "#fff", background: canConfirm ? accent : "#bcb4ad",
                    border: "none", borderRadius: 6,
                    cursor: canConfirm && !wiping ? "pointer" : "default",
                    letterSpacing: ".04em",
                  }}
                >
                  {wiping ? "Wiping…" : "Wipe my data"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
