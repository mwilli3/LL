import React from "react";
import { createRoot } from "react-dom/client";
import { requirePurchase } from "../lib/gate.js";
import App from "../../apps/regulation-mastery.jsx";

const APP = "regulation-mastery";
requirePurchase(APP).then((ok) => {
  if (ok) createRoot(document.getElementById("root")).render(React.createElement(App));
});
