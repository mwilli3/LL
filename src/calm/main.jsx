import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import EmailGate, { hasEmail } from "../../apps/email-gate.jsx";
import App from "../../apps/ns-reset-guide.jsx";

const LIST_ID = "XnHKSj"; // CALM Keyword list
const SOURCE  = "calm";
const ACCENT  = "#2C6E6A"; // Regulator teal

function Wrapper() {
  const [open, setOpen] = useState(() => hasEmail(SOURCE));
  if (!open) return React.createElement(EmailGate, {
    listId: LIST_ID, source: SOURCE, accent: ACCENT,
    title: "Reset at the nervous system.",
    subtitle: "Three practices for your autonomic nervous system. Enter your email to begin.",
    onCaptured: () => setOpen(true),
  });
  return React.createElement(App);
}

createRoot(document.getElementById("root")).render(React.createElement(Wrapper));
