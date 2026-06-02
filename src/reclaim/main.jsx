import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import EmailGate, { hasEmail } from "../../apps/email-gate.jsx";
import App from "../../apps/boundary-journal.jsx";

const LIST_ID = "RdVj9G"; // Reclaimer archetype list
const SOURCE  = "reclaim";
const ACCENT  = "#8B3A4A"; // Reclaimer rose

function Wrapper() {
  const [open, setOpen] = useState(() => hasEmail(SOURCE));
  if (!open) return React.createElement(EmailGate, {
    listId: LIST_ID, source: SOURCE, accent: ACCENT,
    title: "Three questions. Five minutes.",
    subtitle: "Daily evidence that you are someone who holds boundaries. Enter your email to begin.",
    onCaptured: () => setOpen(true),
  });
  return React.createElement(App);
}

createRoot(document.getElementById("root")).render(React.createElement(Wrapper));
