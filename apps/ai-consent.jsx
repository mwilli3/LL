import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * useAiConsent — first-click consent gate for AI analysis features.
 *
 * Usage in a host app:
 *
 *   const { request, Modal } = useAiConsent({
 *     consentKey: "larice_ai_consent_regulation",
 *     appLabel: "Regulation Mastery",
 *     accent: B.accent, surface: B.bg, ink: B.tx, muted: B.txm, sand: B.accentL,
 *     heading: "Before we analyze your regulation patterns",
 *     paragraphs: [ "Your structured tracking data...", "Anthropic does not..." ],
 *     privacyUrl: "https://lovelarice.com/policies/privacy-policy",
 *   });
 *
 *   <button onClick={() => request(analyzePatterns)}>Analyze</button>
 *   {Modal}
 *
 * If the consentKey is already set in localStorage, request(fn) runs fn()
 * immediately. Otherwise it opens the modal; on Continue, the consent
 * timestamp is persisted and fn() runs.
 */

export function useAiConsent({
  consentKey,
  appLabel,
  accent,
  surface = "#FAF6F2",
  ink = "#3A2018",
  muted = "#6B5B52",
  sand = "#EAE3DC",
  serif = "'Cormorant Garamond', Georgia, serif",
  sans = "'Outfit', system-ui, sans-serif",
  heading,
  paragraphs = [],
  privacyUrl = "/privacy",
}) {
  const [open, setOpen] = useState(false);
  const [pendingFn, setPendingFn] = useState(null);

  const hasConsent = () => {
    if (typeof window === "undefined") return false;
    try { return !!window.localStorage.getItem(consentKey); } catch { return false; }
  };

  const request = useCallback((fn) => {
    if (typeof fn !== "function") return;
    if (hasConsent()) { fn(); return; }
    setPendingFn(() => fn);
    setOpen(true);
  }, [consentKey]);

  const handleContinue = () => {
    try { window.localStorage.setItem(consentKey, new Date().toISOString()); } catch {}
    const fn = pendingFn;
    setPendingFn(null);
    setOpen(false);
    if (fn) fn();
  };

  const handleCancel = () => {
    setPendingFn(null);
    setOpen(false);
  };

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") handleCancel(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const Modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={handleCancel}
          role="dialog"
          aria-modal="true"
          aria-label={`AI processing consent for ${appLabel}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 220,
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
              Privacy
            </div>
            <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 600,
              lineHeight: 1.25, marginBottom: 14 }}>
              {heading}
            </div>
            {paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: 13.5, lineHeight: 1.7, color: muted,
                marginBottom: 12 }}>{p}</p>
            ))}

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: 10, marginTop: 22, flexWrap: "wrap" }}>
              <a
                href={privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12.5, color: muted, textDecoration: "underline",
                  textUnderlineOffset: 3, opacity: 0.9,
                }}
              >
                Read full privacy policy ↗
              </a>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={handleCancel}
                  style={{
                    padding: "10px 18px", fontSize: 13, fontWeight: 500, fontFamily: sans,
                    color: muted, background: "transparent", border: "none",
                    borderRadius: 6, cursor: "pointer",
                  }}
                >
                  Not now
                </button>
                <button
                  onClick={handleContinue}
                  style={{
                    padding: "10px 22px", fontSize: 13, fontWeight: 600, fontFamily: sans,
                    color: "#fff", background: accent, border: "none",
                    borderRadius: 6, cursor: "pointer", letterSpacing: ".04em",
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return { request, Modal };
}
