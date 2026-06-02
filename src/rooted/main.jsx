import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import EmailGate, { hasEmail } from "../../apps/email-gate.jsx";
import App from "../../apps/foundation-tracker.jsx";

const LIST_ID = "WZKZmK"; // Rooted archetype list
const SOURCE  = "rooted";
const ACCENT  = "#5A7F3C"; // Rooted green

function Wrapper() {
  const [open, setOpen] = useState(() => hasEmail(SOURCE));
  if (!open) return React.createElement(EmailGate, {
    listId: LIST_ID, source: SOURCE, accent: ACCENT,
    title: "Four foundations. Seven days.",
    subtitle: "The proof of concept that consistency is possible. Enter your email to begin.",
    onCaptured: () => setOpen(true),
  });
  return React.createElement(App);
}

createRoot(document.getElementById("root")).render(React.createElement(Wrapper));
