import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import PasswordGate, { isUnlocked } from "../../apps/password-gate.jsx";
import App from "../../apps/larice-review-journal.jsx";

const SLOT   = "journal";
const ACCENT = "#A47C63"; // Larice clay

function Wrapper() {
  const [open, setOpen] = useState(() => isUnlocked(SLOT));
  if (!open) {
    return React.createElement(PasswordGate, {
      slot: SLOT,
      accent: ACCENT,
      title: "Larice Command Center",
      subtitle: "Private founder review journal. Enter the access phrase to continue.",
      onUnlock: () => setOpen(true),
    });
  }
  return React.createElement(App);
}

createRoot(document.getElementById("root")).render(React.createElement(Wrapper));
